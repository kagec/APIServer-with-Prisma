import prisma from '../client';
import request from 'supertest';
import app from '../../app';

// afterAll(async (done) => {
// 	await prisma.$disconnect();
// 	done();
// });

describe('test DELETE /api/todos/:id', () => {
	const VALID_ID = 26;
	const INVALID_ID = 100000

	test('delete error', async () => {
		const res = await request(app)
			.delete(`/api/todos/${INVALID_ID}`)
			.set("Accept", "application/json")
			.expect('Content-Type', /application\/json/)
			.expect(400);

		expect(res.body).toEqual({
			message: "idに該当するtodoが存在しません"
		})
	});
	
	test('delete success', async () => {
		const res = await request(app)
			.delete(`/api/todos/${VALID_ID}`)
			.set("Accept", "application/json")
			.expect('Content-Type', /application\/json/)
			.expect(200);

		expect(res.body.id).toBeDefined;
	});
});