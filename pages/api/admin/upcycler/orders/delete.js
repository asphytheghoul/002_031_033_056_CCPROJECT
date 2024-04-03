// import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';
// import Order from '../../../../models/Order';
import Orders_Upcycler from '../../../../../models/Orders_Upcycler';

import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  if (req.method !== 'PUT') {
    return res.status(405).send('method not allowed');
  }
  try {
    const data = req.body;
    console.log(data.orderId);
    if (req.body.delete) {
      await db.connect();
      const product = await Orders_Upcycler.findById(data.orderId);
      if (product) {
        await product.remove();
        res.send({ message: 'Order deleted successfully' });
      } else {
        res.status(404).send({ message: 'Order not found' });
      }
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error deleting order' });
  }

  // await db.disconnect();
};

export default handler;
