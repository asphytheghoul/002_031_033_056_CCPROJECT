import { getSession } from 'next-auth/react';
// import Product from '../../../../models/Product';
import db from '../../../../../utils/db';
import Orders_Upcycler from '../../../../../models/Orders_Upcycler';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const user = {
    _id: '63b927e1dc6c93c5b0e35fe9',
  };
  const newOrders_Upcycler = new Orders_Upcycler({
    upCycler: user._id,
    details: 'Details of the order',
    totalCloths: 0,
    totalPrice: 0,
    dueAt: '',
    isStatus: 'Collected',
    isCompleted: false,
    isPicked: false,
  });
  console.log(newOrders_Upcycler);
  await newOrders_Upcycler.save();
  res.send({ message: 'Product created successfully', newOrders_Upcycler });
};

export default handler;
