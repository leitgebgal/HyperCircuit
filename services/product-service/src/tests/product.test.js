const request = require('supertest');
const mongoose = require('mongoose');

// Create a proper mock object structure
jest.mock('../models/Product', () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
});

// Import app and Product AFTER mocking
const app = require('../app');
const Product = require('../models/Product');

describe('Product API', () => {
  let createdProductId;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should create a new product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      stock: 10,
      category: 'Test',
    };

    // Create a mock product with an ID
    const mockProduct = {
      ...productData,
      _id: new mongoose.Types.ObjectId().toString(),
    };

    // Mock the create method to return the mock product
    Product.create.mockResolvedValue(mockProduct);

    const res = await request(app)
      .post('/api/products')
      .send(productData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe(productData.name);
    expect(res.body.price).toBe(productData.price);

    createdProductId = res.body._id;
  });

  it('should fetch all products', async () => {
    const products = [
      { name: 'Product 1', price: 100 },
      { name: 'Product 2', price: 120 },
    ];

    // Mock the find method to return a list of products
    Product.find.mockResolvedValue(products);

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch a single product', async () => {
    const mockId = new mongoose.Types.ObjectId().toString();
    const product = { 
      _id: mockId,
      name: 'Single Product Test', 
      price: 75 
    };

    // Mock the findById method to return a single product
    Product.findById.mockResolvedValue(product);

    const res = await request(app).get(`/api/products/${mockId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Single Product Test');
  });

  it('should update a product', async () => {
    const mockId = new mongoose.Types.ObjectId().toString();
    const updatedProduct = { 
      _id: mockId,
      name: 'Updated Product', 
      price: 150, 
      stock: 15, 
      category: 'TestUpdated' 
    };

    // Mock the findByIdAndUpdate method to return the updated product
    Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    const res = await request(app)
      .put(`/api/products/${mockId}`)
      .send({ price: 150 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.price).toBe(150);
  });

  it('should delete a product', async () => {
    const mockId = new mongoose.Types.ObjectId().toString();
    const product = { 
      _id: mockId, 
      name: 'Test Product' 
    };

    // Mock the findByIdAndDelete method to return the deleted product
    Product.findByIdAndDelete.mockResolvedValue(product);

    const res = await request(app).delete(`/api/products/${mockId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Product deleted');
  });

  it('should filter products by price and category', async () => {
    const filteredProducts = [
      { name: 'Item B', price: 90, category: 'Mouse' }
    ];

    // Mock the find method for filtering
    Product.find.mockResolvedValue(filteredProducts);

    const res = await request(app)
      .post('/api/products/filter')
      .send({
        minPrice: 50,
        maxPrice: 140,
        categories: 'Mouse,Keyboard'
      });

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Item B');
  });
});