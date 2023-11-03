import sgMail from '@sendgrid/mail'

const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY as string)

class MailerService {
  async sendEmail(to: string, subject: string, text: string) {
    const msg = {
      to: to,
      from: 'lvbookingsystem@gmail.com',
      subject: subject,
      text: text,
    }

    try {
      await sgMail.send(msg)
      console.log('Email sent successfully!')
    } catch (error) {
      console.error('Failed to send email:', error)
    }
  }

  async sendConfirmationEmail(to: string, name: string, date: string) {
    const msg = {
      to: to,
      from: 'lvbookingsystem@gmail.com',
      subject: 'Booking Confirmation',
      text: `Hello ${name}, your booking on ${date} has been confirmed.`,
    }

    try {
      await sgMail.send(msg)
      console.log('Email sent successfully!')
    } catch (error) {
      console.error('Failed to send email:', error)
    }
  }
}

const mailerServiceInstance = new MailerService()

export { mailerServiceInstance as MailerService }

// remove test code before deployment
async function testMailerService() {
  try {
    await mailerServiceInstance.sendEmail(
      'lajosvadnai@gmail.com',
      'Test Subject',
      'Hello, this is a test email.'
    )
    console.log('Email sent successfully!')
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

testMailerService()
