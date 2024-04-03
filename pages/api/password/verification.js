import nodemailer from 'nodemailer';
import User from '../../../models/User';
import db from '../../../utils/db';
// import bcryptjs from 'bcryptjs';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  const data = req.body;
  // const { name, email, subject, message } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  // const JWT_SECRET = 'erenjeager';

  const mailTransport = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: 'SSLv3',
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: 'noreply@enableupcycling.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await db.connect();
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    res.status(401).json({ message: 'User already exists' });
  } else {
    const mailOptions = {
      from: 'noreply@enableupcycling.com',
      to: data.email,
      subject: 'Verification code for Enable Upcycling',
      text: `${otp}`,
    };

    mailTransport
      .sendMail(mailOptions)
      .then(() => {
        // console.log('Email sent successfully');
        res.status(200).json({
          message: 'Verification code sent',
          otp: `${otp}`,
        });
        return;
      })
      .catch((err) => {
        // console.log('Failed to send email');
        console.error(err);
        res.status(400).send({
          message: 'Email Sending Failed',
          error: err,
        });
      });
  }

  // console.log(name, email, subject, message);

  // await db.disconnect();
}

export default handler;
