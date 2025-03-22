// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Explicitly set the path to your .env file if needed.
dotenv.config({ path: './backend/.env' });

const sampleProducts = [
  {
    name: 'GTA V',
    description: 'This is a description for Sample Product 1',
    price: 19.99,
    countInStock: 10,
    image: '/images/gta v.jpg'  // Use the correct filename
  },
  {
    name: 'Prince of Persia: The Two Thrones',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/prince of persia.jpg'
  },
  {
    name: 'Red Dead Redemption 2',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/rdr2.jpeg'
  },
  {
    name: 'Sekiro Shadow Die Twice',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/sekiro.jpg'
  },
  {
    name: 'Ghost of Tsushima',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/got.jpg'
  },
  {
    name: 'God of War 2018',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/god of war.jpg'
  },
  {
    name: 'Uncharted 4: A Thief\'s End',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/uncharted.jpg'
  },
  {
    name: 'Manor Lords',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/manor lords.jpg'
  },
  {
    name: 'Tomb Raider 2013',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/tomb raider.jpg'
  },
  {
    name: 'Assassin\'s Creed',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/assassin creed.jpg'
  },
  {
    name: 'Watch Dogs 1',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/watch dogs.jpg'
  },
  {
    name: 'Heavy Rain',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/heavy rain.jpg'
  },
  {
    name: 'Marvel\'s Spiderman',
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/marvel spiderman.jpg'
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding.');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully.');
    process.exit();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });

