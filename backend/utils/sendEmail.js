const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, x
    },
  
    tls: {
        rejectUnauthorized: false 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM, 
    to: options.email, 
    subject: options.subject, 
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
     console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;