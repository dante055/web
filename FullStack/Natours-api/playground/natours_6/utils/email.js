const nodemailer = require('nodemailer');

const sendEmail = async option => {
  // 1. create transporter
  const transporter = nodemailer.createTransport({
    // with service u dont ned host and port
    // service : 'Gmail
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Demail email options
  const mailOptions = {
    from: 'dante@devil.com',
    to: option.to,
    subject: option.subject,
    text: option.message, // plain text body
    // html: '<b>Hello world?</b>', // html body
  };

  // 3. Actually send the email
  const info = await transporter.sendMail(mailOptions);
  console.log(`Message sent : ${info.messageId}`);
};

module.exports = sendEmail;
