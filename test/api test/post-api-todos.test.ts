import prisma from '../client';
import request from 'supertest';
import app from '../../app';

// afterAll(async (done) => {
// 	await prisma.$disconnect();
// 	done();
// });

describe('test POST /api/todos/', () => {
	const POST_DATA = {
		title: "test title",
		body: "test body",
	}

	test('post', async () => {
		const res = await request(app)
			.post("/api/todos")
			.send(POST_DATA)
			.set("Accept", "application/json")
			.expect('Content-Type', /application\/json/)
			.expect(200);
	
		expect(res.body.id).toBeDefined;
		expect(res.body.title).toBe("test title");
		expect(res.body.body).toBe("test body");
	});
});