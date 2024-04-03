import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = {
    id: 1,
    name: 'Sample Product',
    slug: 'Sample-Product' + Math.random(),
    category: 'Bag',
    image: '/mockups/bag1.png',
    images: [
      {
        src: '/mockups/bag1.png',
        alt: 'mockupBag1',
      },
      {
        src: '/mockups/bag1.png',
        alt: 'mockupBag2',
      },
      {
        src: '/mockups/bag1.png',
        alt: 'mockupBag3',
      },
      {
        src: '/mockups/bag1.png',
        alt: 'mockupBag4',
      },
    ],
    price: '0',
    brand: 'Enable',
    rating: 0,
    numReviews: 0,
    countInStock: 10,
    description: ' Description of the product',
    highlights: ['highlight1', 'highlight2', 'highlight3', 'highlight4'],
    details: 'details of the product',
    sizes: [
      { name: 'S', inStock: false },
      { name: 'M', inStock: false },
      { name: 'L', inStock: true },
    ],
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
  };
  const product = await Product.create(newProduct);
  // await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};
const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  // await db.disconnect();
  res.send(products);
};
export default handler;
