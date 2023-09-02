import nodemailer from "nodemailer";
// TODO: finish this service
export default class MailerService {
  static async sendConfirmationEmail(to: string, bookingId: number) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Booking Confirmation",
      text: `Your booking has been confirmed. Booking ID: ${bookingId}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
