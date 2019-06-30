import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt'

import User from '../models/User'
import Appointment from '../models/Appointment'
import File from '../models/File'

import Notification from '../schemas/Notification'

import Mail from '../../lib/Mail'

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      atributes: ['id', 'date'],
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    })

    return res.json(appointments)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number()
        .required()
        .notOneOf([req.userId]),
      date: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ message: 'Validation failed, there are missing parameters.' })
    }

    const { provider_id, date } = req.body

    /**
     * Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    })

    if (!isProvider) {
      return res
        .status(401)
        .json({ message: 'You can only create appointments with providers' })
    }

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ message: 'Past dates are not permitted.' })
    }

    /**
     * Check date availability
     */

    const checkAvalability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    })

    if (checkAvalability) {
      return res
        .status(400)
        .json({ message: 'Appointment date is not available.' })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    })

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(req.userId)
    const formatedDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    })

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formatedDate}.`,
      user: provider_id,
    })

    return res.json(appointment)
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    })

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        message: "You don't have permission to cancel this appointment.",
      })
    }

    const dateWithSub = subHours(appointment.date, 2)

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        message: 'You can only cancel appointments 2 hours in advance',
      })
    }

    appointment.canceled_at = new Date()

    await appointment.save()

    const { provider, user, date } = appointment

    await Mail.sendMail({
      to: `${provider.name} <${provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: provider.name,
        user: user.name,
        date: format(date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()
