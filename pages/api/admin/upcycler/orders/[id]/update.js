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
  const data = req.body;
  const id = req.query.id;
  if (req.method === 'PUT') {
    await db.connect();
    const orderDetails = await Orders_Upcycler.findById(id);
    if (orderDetails) {
      orderDetails.upCycler = data.upcycler;

      await orderDetails.save();
      await db.disconnect();
      res.send({ message: 'Product updated successfully' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
export default handler;
