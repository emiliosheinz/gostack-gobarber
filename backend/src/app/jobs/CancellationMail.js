import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Mail from '../../lib/Mail'

class CancellationMail {
  get key() {
    return 'CancellationMail'
  }

  async handle({ data }) {
    const { appointment } = data
    const { provider, user, date } = appointment

    console.log('A fila executou')

    await Mail.sendMail({
      to: `${provider.name} <${provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: provider.name,
        user: user.name,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    })
  }
}

export default new CancellationMail()
