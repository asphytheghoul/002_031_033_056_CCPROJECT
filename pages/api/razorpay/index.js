import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const Razorpay = require('razorpay');

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('User is not signed in');
  }
  if (req.body.orderId === undefined) {
    return res.status(402).send('Invalid Order Id');
  }
  const { user } = session;

  await db.connect();
  const order = await Order.findById(req.body.orderId);
  // await db.disconnect();

  if (user._id.toString() === order.user.toString()) {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = order.totalPrice;
    const currency = 'INR';
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: order._id.toString(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(501).json({ message: 'Unauthorized' });
  }
}
