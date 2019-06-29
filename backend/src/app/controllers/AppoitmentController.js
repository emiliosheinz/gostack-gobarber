import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore } from 'date-fns'

import User from '../models/User'
import Appointment from '../models/Appointment'

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
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

    return res.json(appointment)
  }
}

export default new AppointmentController()