import request from 'supertest';
import app from '../app';

describe('Vacation API', () => {
  it('should get all vacations', async () => {
    const res = await request(app).get('/api/vacations');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
