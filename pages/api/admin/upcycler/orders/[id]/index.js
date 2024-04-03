import { getSession } from 'next-auth/react';
// import Product from '../../../../../models/Product';
import Orders_Upcycler from '../../../../../../models/Orders_Upcycler';
// import User from '../../../../../../models/User';
import db from '../../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const orderDetails = await Orders_Upcycler.findById(req.query.id);
  // await db.disconnect();
  res.send(orderDetails);
};

const putHandler = async (req, res) => {
  await db.connect();
  const orderDetails = await Orders_Upcycler.findById(req.query.id);
  if (orderDetails) {
    orderDetails.upCycler = req.body.upcycler;
    orderDetails.details = req.body.details;
    orderDetails.totalCloths = req.body.totalCloths;
    orderDetails.totalPrice = req.body.totalPrice;
    orderDetails.dueAt = req.body.dueAt;
    orderDetails.isStatus = req.body.status;
    orderDetails.isCompleted = req.body.completed;
    orderDetails.isPicked = req.body.picked;

    await orderDetails.save();
    await db.disconnect();
    res.send({ message: 'Product updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};

export default handler;
