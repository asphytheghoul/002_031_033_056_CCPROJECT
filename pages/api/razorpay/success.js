import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('User is not signed in');
  }
  if (req.body.orderId === undefined) {
    return res.status(402).send('Invalid Order Id');
  } else {
    const { user } = session;

    await db.connect();
    const order = await Order.findById(req.body.orderId);
    console.log(req.body);
    console.log(order);
    if (user._id.toString() === order.user.toString()) {
      // console.log(order.isPaid);
      // update order to paid in database
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save();
      console.log(updatedOrder);

      res.status(200).json({ message: 'Payment Success' });
    } else {
      res.status(501).json({ message: 'Unauthorized' });
    }
    // await db.disconnect();
  }
}
