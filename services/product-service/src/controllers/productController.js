const Product = require('../models/Product');

// Create product
exports.createProduct = async (req, res) => {
  try {
    console.log('Creating product:', req.body);
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    console.log('Fetching all products');
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get one product
exports.getProduct = async (req, res) => {
  try {
    console.log('Fetching product with ID:', req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.warn('Product not found:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    console.log('Updating product ID:', req.params.id);
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      console.warn('Product not found for update:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    console.log('Deleting product ID:', req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.warn('Product not found for deletion:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Filter products by price range and categories
exports.filterProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, categories } = req.body;
    const query = {};

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (categories) {
      query.category = { $in: categories.split(',') };
    }

    console.log('Filtering with:', query);
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error('Error filtering products:', err.message);
    res.status(500).json({ error: err.message });
  }
};