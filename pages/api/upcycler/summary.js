import { getSession } from 'next-auth/react';
// import Order from '../../../models/Order';
import Orders_Upcycler from '../../../models/Orders_Upcycler';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  // console.log(session);
  if (!session || (session && !session.user.isUpcycler)) {
    return res.status(401).send('signin required');
  }

  await db.connect();

  // const ordersCount = await Order.countDocuments();
  // const productsCount = await Product.countDocuments();
  // const usersCount = await User.countDocuments();

  const ordersCount = await Orders_Upcycler.countDocuments({
    upCycler: session.user._id,
  });

  const ordersCompletedCount = await Orders_Upcycler.countDocuments({
    upCycler: session.user._id,
    isCompleted: true,
  });

  // const ordersPriceGroup = await Orders_Upcycler.aggregate([
  //   {
  //     $group: {
  //       _id: session.user._id,
  //       sales: { $sum: '$totalPrice' },
  //       // isCompleted: true,
  //     },
  //   },
  // ]);

  const ordersPriceGroup = await Orders_Upcycler.find({
    upCycler: session.user._id,
    isCompleted: true,
  }).select('totalPrice');

  const ordersPrice = ordersPriceGroup.length > 0 ? 0 : 0;

  // await db.disconnect();
  // console.log(ordersCount, ordersPrice, ordersCompletedCount);
  res.send({ ordersCount, ordersPrice, ordersCompletedCount });
};

export default handler;
