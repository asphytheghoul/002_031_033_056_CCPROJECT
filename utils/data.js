import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      id: 1,
      name: 'Hand Made Bag',
      slug: 'Hand-Made-Bag',
      category: 'Bag',
      image: '/mockups/bag1.png',
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      price: '5',
      brand: 'Enable',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestiae ad suscipit architecto libero assumenda perspiciatis aperiam quibusdam accusantium. Ab error recusandae eaque maxime? Vel reiciendis repellendus expedita voluptatem voluptates.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
    },
    {
      id: 2,
      name: 'Designer Bag',
      slug: 'Designer-Bag',
      category: 'Bag',
      image: '/mockups/bag2.png',
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
          alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
          alt: 'Model wearing plain black basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
          alt: 'Model wearing plain gray basic tee.',
        },
        {
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
          alt: 'Model wearing plain white basic tee.',
        },
      ],
      price: '7',
      brand: 'Enable',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestiae ad suscipit architecto libero assumenda perspiciatis aperiam quibusdam accusantium. Ab error recusandae eaque maxime? Vel reiciendis repellendus expedita voluptatem voluptates.',
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
      ],
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
    },
  ],
};

export default data;
