const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        stock: 10,
        category: 'Test'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Test Product');
    createdProductId = res.body._id;
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch a single product', async () => {
    const res = await request(app).get(`/api/products/${createdProductId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toBe(createdProductId);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${createdProductId}`)
      .send({ price: 150 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.price).toBe(150);
  });

  it('should delete a product', async () => {
    const res = await request(app).delete(`/api/products/${createdProductId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Product deleted');
  });

  it('should filter products by price and category', async () => {
    await Product.insertMany([
      { name: 'Item A', price: 50, stock: 10, category: 'Keyboard' },
      { name: 'Item B', price: 90, stock: 5, category: 'Mouse' },
      { name: 'Item C', price: 110, stock: 20, category: 'Headset' }
    ]);

    const res = await request(app)
      .get('/api/products/filter?minPrice=60&maxPrice=100&categories=Mouse,Keyboard');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Item B');
  });
});
