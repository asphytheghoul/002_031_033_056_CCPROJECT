// import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';
// import Order from '../../../../models/Order';
import Orders_Upcycler from '../../../../models/Orders_Upcycler';

import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isUpcycler)) {
    return res.status(401).send('signin required');
  }
  if (req.method !== 'PUT') {
    return res.status(405).send('method not allowed');
  }
  const data = req.body;
  console.log(data.orderId);
  console.log(data.statusOrder);
  await db.connect();
  const order = await Orders_Upcycler.findById(data.orderId);
  order.isStatus = data.statusOrder;
  await order.save();
  // await db.disconnect();

  res.status(200).send(data.statusOrder);
};

export default handler;
