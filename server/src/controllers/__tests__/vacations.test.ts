import request from 'supertest';
import app from '../../app';

describe('Vacation API', () => {
  it('should get all vacations', async () => {
    const res = await request(app).get('/api/vacations');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new vacation', async () => {
    const newVacation = {
      destination: 'Test Destination',
      description: 'Test Description',
      image: 'test.jpg',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      price: 1000
    };
    const res = await request(app)
      .post('/api/vacations')
      .send(newVacation);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
