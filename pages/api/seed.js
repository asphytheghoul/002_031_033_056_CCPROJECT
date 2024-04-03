// import User from '../../models/User';
// import Orders_Upcycler from '../../models/Orders_Upcycler';
// import Product from '../../models/Product';
// import data2 from '../../utils/data2';
// import db from '../../utils/db';

// const user = {
//   _id: '63b91addb0c470814cdd2bba',
// };

const handler = async (req, res) => {
  // await db.connect();
  // // await User.deleteMany();
  // // await User.insertMany(data2.users);
  // // await Orders_Upcycler.deleteMany();
  // // await Orders_Upcycler.insertMany(data2.orders);
  // const newOrders_Upcycler = new Orders_Upcycler({
  //   upCycler: user._id,
  //   details: 'You have received you first order with the following details:',
  //   totalCloths: 100,
  //   totalPrice: 10000,
  //   dueAt: '2021-012-01',
  //   status: 'Processing1',
  //   completed: false,
  //   isPicked: false,
  // });
  // console.log(newOrders_Upcycler);
  // await newOrders_Upcycler.save();
  // await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
