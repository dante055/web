const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

// ------------- Class to create emails of any kind ------------------
module.exports = class Email {
  constructor(user, url, recivers) {
    // for sending email to single user
    if (user) {
      this.to = user.email;
      this.firstName = user.name.split()[0];
    }

    // send email multiple user
    if (recivers) {
      this.to = recivers.toString();
    }

    this.from = `${process.env.EMAIL_SENDERS_NAME} <${process.env.EMAIL_FROM}>`;
    this.url = url;
  }

  // --------- Create a transproter ------------------
  transporter() {
    if (process.env.NODE_ENV === 'production') {
      // sendGrid
      // for testing in production create a diposible email
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // Development : Mailtrap
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // ---------  Send the actual email ---------------
  async send(template, subject) {
    // 1. Create the email template from the pug template
    const templateOptions = {
      url: this.url,
      subject,
    };
    if (this.firstName) templateOptions.firstName = this.firstName;

    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      templateOptions
    );

    // 2. Define the mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    const info = await this.transporter().sendMail(mailOptions);
    console.log(`Message sent : ${info.messageId}`);
  }

  // --------- Diffrent email templates --------------------

  // --------- Welcome ----------------
  async sendWelcome() {
    await this.send('welcome', 'Welcome to Natours Family!');
  }

  // --------- Reset Password --------------
  async sendResetPassword() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)!'
    );
  }
};
