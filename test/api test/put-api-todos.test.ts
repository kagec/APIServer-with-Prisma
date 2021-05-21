import prisma from '../client';
import request from 'supertest';
import app from '../../app';

// afterAll(async (done) => {
// 	await prisma.$disconnect();
// 	done();
// });

describe('test PUT /api/todos/:id', () => {
	const VALID_ID = 29;
	const INVALID_ID = 100000
	const putData = {
		title: "test new title",
		body:"test new body",
	};

	test('put error', async () => {
		const res = await request(app)
			.put(`/api/todos/${INVALID_ID}`)
			.send(putData)
			.set("Accept", "application/json")
			.expect('Content-Type', /application\/json/)
			.expect(400);
		
		expect(res.body).toEqual({
			message: "idに該当するtodoが存在しません"
		});
	});

	test('put success', async () => {
		const res = await request(app)
			.put(`/api/todos/${VALID_ID}`)
			.send(putData)
			.set("Accept", "application/json")
			.expect('Content-Type', /application\/json/)
			.expect(200);
		
		expect(res.body.id).toBeDefined;
		expect(res.body.title).toBe("test new title");
		expect(res.body.body).toBe("test new body");
	});
});