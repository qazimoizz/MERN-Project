const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const categories = [
  { name: 'T-shirts', slug: 't-shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
  { name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Jeans', slug: 'jeans', image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hoodie', slug: 'hoodie', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Shorts', slug: 'shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Jackets', slug: 'jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' }
];

const mockReviews = [
  {
    name: 'Samantha D.',
    rating: 5,
    comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As an apparel enthusiast, I value quality and this exceeded my expectations.",
    verified: true
  },
  {
    name: 'Alex M.',
    rating: 4,
    comment: "The t-shirt exceeded my expectations! The colors are vibrant and the fit is just right. Highly recommend to anyone looking for stylish streetwear.",
    verified: true
  },
  {
    name: 'Ethan R.',
    rating: 5,
    comment: "This shirt is a must-have for anyone who appreciates quality. The attention to detail is noticeable. It has quickly become my favorite piece.",
    verified: true
  },
  {
    name: 'Olivia P.',
    rating: 4,
    comment: "Comfortable and looks clean with denim or shorts. Fabric feels premium and hasn't shrunk after washing.",
    verified: true
  }
];

const products = [
  {
    title: 'T-shirt with Tape Details',
    description: 'A classic modern streetwear t-shirt tailored with premium combed cotton and subtle tape detailing across the shoulders for an elevated casual aesthetic.',
    price: 120,
    discountPercentage: 0,
    rating: 4.5,
    ratingCount: 24,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'T-shirts',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Olive Green', hex: '#4F5D2F' },
      { name: 'Deep Navy', hex: '#1C2833' },
      { name: 'Pitch Black', hex: '#111111' }
    ],
    stock: 35,
    isNewArrival: true,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Skinny Fit Jeans',
    description: 'Contemporary skinny-cut denim crafted with dynamic elastane blend for effortless flexibility, clean washed finish, and durable rivet construction.',
    price: 260,
    discountPercentage: 20,
    rating: 3.5,
    ratingCount: 18,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Jeans',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Classic Blue', hex: '#2E5B88' },
      { name: 'Black', hex: '#1B1B1B' }
    ],
    stock: 25,
    isNewArrival: true,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Checkered Shirt',
    description: 'Timeless checkered woven shirt crafted from breathable cotton twill with dual breast pockets and buttoned barrel cuffs.',
    price: 180,
    discountPercentage: 0,
    rating: 4.5,
    ratingCount: 32,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Shirts',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Red Check', hex: '#C0392B' },
      { name: 'Navy Check', hex: '#2C3E50' }
    ],
    stock: 40,
    isNewArrival: true,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Sleeve Striped T-shirt',
    description: 'Sporty short-sleeve crewneck featuring contrasting double sleeve varsity stripes and a tailored silhouette that flatters any casual build.',
    price: 160,
    discountPercentage: 30,
    rating: 4.5,
    ratingCount: 40,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'T-shirts',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Orange', hex: '#E67E22' },
      { name: 'Black', hex: '#1A1A1A' }
    ],
    stock: 30,
    isNewArrival: true,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Vertical Striped Shirt',
    description: 'Sophisticated lightweight resort shirt with crisp vertical slimming stripes, spread camp collar, and smooth hand-feel texture.',
    price: 232,
    discountPercentage: 20,
    rating: 5.0,
    ratingCount: 65,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Shirts',
    dressStyle: 'Formal',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Emerald', hex: '#27AE60' },
      { name: 'Sky Blue', hex: '#2980B9' }
    ],
    stock: 20,
    isNewArrival: false,
    isTopSelling: true,
    reviews: mockReviews
  },
  {
    title: 'Courage Graphic T-shirt',
    description: 'Statement streetwear drop-shoulder tee displaying bold inspirational typography on heavy 240GSM combed cotton jersey.',
    price: 145,
    discountPercentage: 0,
    rating: 4.0,
    ratingCount: 48,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'T-shirts',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Burnt Orange', hex: '#D35400' },
      { name: 'Charcoal', hex: '#34495E' }
    ],
    stock: 45,
    isNewArrival: false,
    isTopSelling: true,
    reviews: mockReviews
  },
  {
    title: 'Loose Fit Bermuda Shorts',
    description: 'Relaxed utilitarian shorts featuring roomy slant front pockets, elasticized drawstring waistband, and lightweight summer-weight twill.',
    price: 80,
    discountPercentage: 0,
    rating: 3.0,
    ratingCount: 15,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Shorts',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Khaki', hex: '#C2B280' },
      { name: 'Navy', hex: '#1B2631' }
    ],
    stock: 50,
    isNewArrival: false,
    isTopSelling: true,
    reviews: mockReviews
  },
  {
    title: 'Faded Skinny Jeans',
    description: 'Authentic stone-washed skinny denim featuring subtle fading along thighs and knees, five-pocket styling, and signature metallic hardware.',
    price: 210,
    discountPercentage: 0,
    rating: 4.5,
    ratingCount: 52,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Jeans',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Faded Blue', hex: '#5DADE2' },
      { name: 'Washed Grey', hex: '#7F8C8D' }
    ],
    stock: 28,
    isNewArrival: false,
    isTopSelling: true,
    reviews: mockReviews
  },
  {
    title: 'Minimalist Black Blazer',
    description: 'Tailored slim-fit single-breasted blazer in structured wrinkle-resistant wool blend with peak lapels and sleek satin lining.',
    price: 280,
    discountPercentage: 15,
    rating: 4.8,
    ratingCount: 39,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Jackets',
    dressStyle: 'Formal',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Jet Black', hex: '#0B0B0B' },
      { name: 'Midnight Navy', hex: '#151E3D' }
    ],
    stock: 18,
    isNewArrival: false,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Silk Evening Party Shirt',
    description: 'Lustrous satin-silk relaxed evening shirt designed for nightlife elegance, featuring a fluid drape, concealed button placket, and iridescent finish.',
    price: 160,
    discountPercentage: 25,
    rating: 4.7,
    ratingCount: 31,
    images: [
      'https://images.unsplash.com/photo-1620012253295-c15c429fcc71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Shirts',
    dressStyle: 'Party',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Deep Burgundy', hex: '#641E16' },
      { name: 'Champagne Gold', hex: '#D4AF37' }
    ],
    stock: 22,
    isNewArrival: false,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Performance Breathable Gym Tee',
    description: 'Technical athletic short-sleeve tee constructed with quick-dry 4-way stretch mesh, anti-odor silver ion technology, and flatlock anti-chafing seams.',
    price: 65,
    discountPercentage: 10,
    rating: 4.6,
    ratingCount: 44,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'T-shirts',
    dressStyle: 'Gym',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Slate Grey', hex: '#4A5568' },
      { name: 'Neon Lime', hex: '#32CD32' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    stock: 60,
    isNewArrival: false,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Flex Stretch Workout Shorts',
    description: 'Engineered training shorts featuring built-in compression liner, zippered phone pocket, and ventilated laser-cut perforations for high-intensity training.',
    price: 55,
    discountPercentage: 0,
    rating: 4.4,
    ratingCount: 29,
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Shorts',
    dressStyle: 'Gym',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Charcoal Black', hex: '#1C1C1C' },
      { name: 'Electric Blue', hex: '#0066FF' }
    ],
    stock: 45,
    isNewArrival: false,
    isTopSelling: false,
    reviews: mockReviews
  },
  {
    title: 'Urban Oversized Streetwear Hoodie',
    description: 'Heavyweight 450GSM French terry oversized hoodie with double-layer hood, kangaroo pocket, ribbed hems, and dropped shoulders.',
    price: 135,
    discountPercentage: 15,
    rating: 4.7,
    ratingCount: 56,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Hoodie',
    dressStyle: 'Casual',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7D2C8' },
      { name: 'Washed Black', hex: '#242424' }
    ],
    stock: 32,
    isNewArrival: false,
    isTopSelling: false,
    reviews: mockReviews
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    await Category.insertMany(categories);
    await Product.insertMany(products);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@shopco.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    await User.create({
      name: 'Shop.co Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    await User.create({
      name: 'Alex Johnson',
      email: 'user@shopco.com',
      password: 'user123',
      role: 'customer'
    });

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedData();

