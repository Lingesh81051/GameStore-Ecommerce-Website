// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables (adjust path if needed)
dotenv.config({ path: './backend/.env' });

const sampleProducts = [
  {
    name: 'GTA V',
    description: 'This is a description for Sample Product 1',
    price: 19.99,
    countInStock: 10,
    image: '/images/gta v.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Top Sellers']
  },
  {
    name: 'Tom Clancy\'s Splinter Cell: Blacklist',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/splinter cell.jpg',
    categories: ['Action', 'Adventure', 'New Releases', 'Featured Discounts', 'Top Sellers', 'Most popular']
  },
  {
    name: 'The Last Of Us Part 1',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/tlou 1.jpg',
    categories: ['Action', 'Adventure', 'New Releases', 'Featured Discounts', 'Top Sellers', 'Most popular']
  },
  {
    name: 'Prince of Persia: The Two Thrones',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/prince of persia.jpg',
    categories: ['Action', 'Adventure', 'New Releases', 'Featured Discounts']
  },
  {
    name: 'Red Dead Redemption 2',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/rdr2.jpeg',
    categories: ['Action', 'Adventure', 'Most Played', 'Trending Games']
  },
  {
    name: 'Sekiro Shadow Die Twice',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/sekiro.jpg',
    categories: ['Action', 'Adventure', 'Most popular']
  },
  {
    name: 'Ghost of Tsushima',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/got.jpg',
    categories: ['Action', 'Adventure', 'Top Sellers', 'New Releases']
  },
  {
    name: 'God of War 2018',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/god of war.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts']
  },
  {
    name: "Uncharted 4: A Thief's End",
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/uncharted.jpg',
    categories: ['Action', 'Adventure', 'New Releases']
  },
  {
    name: 'Manor Lords',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/manor lords.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Most Played']
  },
  {
    name: 'Tomb Raider 2013',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/tomb raider.jpg',
    categories: ['Action', 'Adventure', 'Featured Discounts']
  },
  {
    name: "Assassin's Creed",
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/assassin creed.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Top Sellers']
  },
  {
    name: 'Watch Dogs 1',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/watch dogs.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Most popular']
  },
  {
    name: 'Heavy Rain',
    description: 'This is a description for Sample Product 2',
    price: 29.99,
    countInStock: 5,
    image: '/images/heavy rain.jpg',
    categories: ['Action', 'Adventure', 'New Releases']
  },
  {
    name: "Marvel's Spiderman",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/marvel spiderman.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts']
  },
  {
    name: "Prototype 1",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/prototype.jpg',
    categories: ['Action', 'Adventure', 'Most Played', 'Fighting', 'Stealth ', 'Survival']
  },
  {
    name: "The Callisto Protocol",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/the callisto protocol.jpg',
    categories: ['Action', 'Adventure', 'Most popular','Most Played', 'Fighting', 'Stealth ', 'Survival']
  },
  {
    name: "Prey 2017",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/prey.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'First-person shooter', 'Shooter', 'Most popular']
  },
  {
    name: "Death Stranding 1",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/death stranding 1.png',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'First-person shooter', 'Shooter', 'Most Played']
  },
  {
    name: "Black Myth: Wukong",
    description: 'This is a description for Sample Product 3',
    price: 39.99,
    countInStock: 15,
    image: '/images/black myth wukong.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'First-person shooter', 'Shooter', 'Most Played', 'Top Sellers']
  },
  {
    name: "Counter-Strike: Global Offensive",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/cs go.jpg',
    categories: ['Action', 'Trending Games', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Most Played', 'Top Sellers', 'Tactical role-playing']
  },
  {
    name: "Fall Guys",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/fall guys.jpg',
    categories: ['Adventure', 'Free Games', 'RPG', 'Most Played', 'Top Sellers', 'Real-time strategy', 'Massively multiplayer online role-playing']
  },
  {
    name: "Sifu",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/sifu.jpg',
    categories: ['Action', 'Adventure', 'Free Games', 'RPG', 'Fighting']
  },
  {
    name: "Rocket League",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/rocket league.jpg',
    categories: ['Action', 'Adventure', 'Trending Games', 'Featured Discounts', 'RPG', 'Sports', 'Shooter', 'Most Played']
  },
  {
    name: "World War Z",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/world war z.jpg',
    categories: ['Action', 'Adventure', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Most Played', 'Top Sellers', 'Tactical role-playing']
  },
  {
    name: "Marvel Rivals",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/marvel rivals.jpg',
    categories: ['Action', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Most Played']
  },
  {
    name: "Destiny 2",
    description: 'This is a description for Sample Product 3',
    price: 0,
    countInStock: 15,
    image: '/images/destiny 2.jpg',
    categories: ['Action', 'Adventure', 'Free Games', 'RPG', 'First-person shooter', 'Shooter', 'Massively multiplayer online role-playing']
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
