import { getSession } from 'next-auth/react';
// import Order from '../../../../models/Order';
import Orders_Upcycler from '../../../../../models/Orders_Upcycler';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  if (req.method === 'GET') {
    await db.connect();
    const orders = await Orders_Upcycler.find({});
    // await db.disconnect();
    res.send(orders);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;
