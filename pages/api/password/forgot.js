import nodemailer from 'nodemailer';
import User from '../../../models/User';
import db from '../../../utils/db';
import jwt from 'jsonwebtoken';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  const data = req.body;
  // const { name, email, subject, message } = req.body;

  const JWT_SECRET = process.env.JWT_SECRET_PASSWORD_RESET;
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
      pass: '28july2021',
    },
  });

  await db.connect();
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    const newSecret = JWT_SECRET + existingUser.password;
    const payload = {
      userId: existingUser._id,
      email: existingUser.email,
    };
    const token = jwt.sign(payload, newSecret, { expiresIn: '15m' });

    const url = `${process.env.NEXTAUTH_URL}resetPassword/${existingUser._id}/${token}`;
    // console.log(url);

    const mailOptions = {
      from: 'noreply@enableupcycling.com',
      to: data.email,
      subject: 'Password Reset Link',
      text: `Please click on the link to reset your password: ${url}`,
    };

    mailTransport
      .sendMail(mailOptions)
      .then(() => {
        // console.log('Email sent successfully');
        res.status(200).json({ message: 'Rest Link sent' });
        return;
      })
      .catch((err) => {
        // console.log('Failed to send email');
        console.error(err);
        res.status(400).send({
          message: 'Password Sending Failed',
          error: err,
        });
      });
  } else {
    res.status(400).json({ message: 'User does not exist!' });
    return;
  }

  // console.log(name, email, subject, message);

  // await db.disconnect();
}

export default handler;
