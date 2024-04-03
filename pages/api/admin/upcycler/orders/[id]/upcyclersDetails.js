import { getSession } from 'next-auth/react';
// import Product from '../../../../../models/Product';
import User from '../../../../../../models/User';
import db from '../../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  if (req.method === 'GET') {
    //find users who have isUpcycler true and isVerified true
    await db.connect();
    const upcyclerDetails = [];
    const upcycler = await User.find({ isUpcycler: true });
    console.log(upcycler);
    upcycler.map((lmao) => {
      upcyclerDetails.push({ _id: lmao._id, name: lmao.name });
    });
    // console.log(upcyclerDetails);
    // orderDetails.append(upcyclerDetails);
    // await db.disconnect();
    res.send(upcyclerDetails);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;
