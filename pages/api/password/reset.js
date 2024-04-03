import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import jwt from 'jsonwebtoken';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  const JWT_SECRET = process.env.JWT_SECRET_PASSWORD_RESET;
  const user = req.body;

  if (user.password && user.password.trim().length < 5) {
    res.status(400).json({
      message: 'Validation error - password must be at least 5 characters',
    });
    return;
  }

  await db.connect();
  const toUpdateUser = await User.findById(user.id);
  if (toUpdateUser.email !== user.email) {
    const secret = JWT_SECRET + toUpdateUser.password;
    try {
      if (jwt.verify(user.token, secret)) {
        if (user.password) {
          toUpdateUser.password = bcryptjs.hashSync(user.password);
        }
        await toUpdateUser.save();
        // await db.disconnect();
        res.send({
          message: 'Password updated successfully',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Invalid Token',
      });
    }
  } else {
    res.status(400).json({
      message: 'Validation error',
    });
  }
}

export default handler;
