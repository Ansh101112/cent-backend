import request from 'supertest';
import app from '../src/app';

describe('Tasks API validation', () => {
  it('returns 400 for non-numeric task id on GET', async () => {
    const res = await request(app).get('/api/tasks/abc');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 for non-numeric task id on PUT', async () => {
    const res = await request(app)
      .put('/api/tasks/abc')
      .send({ title: 'X' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for non-numeric task id on PATCH toggle', async () => {
    const res = await request(app).patch('/api/tasks/abc/toggle');
    expect(res.status).toBe(400);
  });

  it('returns 400 for non-numeric task id on DELETE', async () => {
    const res = await request(app).delete('/api/tasks/abc');
    expect(res.status).toBe(400);
  });
});
