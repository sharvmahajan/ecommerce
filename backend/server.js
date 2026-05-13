const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/antigravity')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Schemas
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String
});

const orderSchema = new mongoose.Schema({
    items: Array,
    totalAmount: Number,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// Pre-seed Products
const seedProducts = [
    {
        name: "Gravity Boots",
        price: 299,
        image: "/images/boots.png",
        description: "Walk on any surface as if gravity didn't exist. Perfect for lunar strolls."
    },
    {
        name: "Space Foam Pillow",
        price: 89,
        image: "/images/pillow.png",
        description: "Engineered with zero-G foam for the deepest sleep in the galaxy."
    },
    {
        name: "Zero-G Water Bottle",
        price: 45,
        image: "/images/bottle.png",
        description: "Magnetic seal prevents leaks in weightless environments."
    },
    {
        name: "Lunar Backpack",
        price: 150,
        image: "/images/backpack.png",
        description: "Ultra-lightweight storage for your cosmic adventures."
    },
    {
        name: "Orbit Coffee Mug",
        price: 35,
        image: "/images/mug.png",
        description: "Keeps your caffeine warm while circling the Earth."
    },
    {
        name: "Astro Sleeping Bag",
        price: 210,
        image: "/images/sleepingbag.png",
        description: "Insulated with stardust and recycled asteroid fibers."
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({}); // Clear existing to update with new images
        await Product.insertMany(seedProducts);
        console.log('Database Seeded with Products');
    } catch (err) {
        console.error('Error seeding database:', err);
    }
};
seedDB();

// API Routes
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/orders', async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const newOrder = new Order({ items, totalAmount });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
