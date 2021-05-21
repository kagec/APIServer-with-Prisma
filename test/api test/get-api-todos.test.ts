import prisma from '../client';
import request from 'supertest';
import app from '../../app';


// afterAll(async (done) => {
// 	await prisma.$disconnect();
// 	done();
// });

describe('test GET /api/todos', () => {
	test('get', async () => {
		const res = await request(app)
			.get('/api/todos')
			.set('Accept', 'application/json')
			.expect('Content-Type', /application\/json/)
			.expect(200);

		expect(res.body.id).toBeDefined;
	});
});
