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

	describe('post failure', () => {
		test('no title', async () => {
			const res = await request(app)
				.post("/api/todos")
				.send({
					body: "test body",
				})
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(res.body).toEqual({
				message: 'titleは必須です',
			})
		});

		test('no body', async () => {
			const res = await request(app)
				.post("/api/todos")
				.send({
					title: "test title",
				})
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(400);

			expect(res.body).toEqual({
				message: 'bodyは必須です',
			})
		});
	});
	describe('post success', () => {
		test('post success', async () => {
			const res = await request(app)
				.post("/api/todos")
				.send(POST_DATA)
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(200);
	
			expect(res.body.id).toBeDefined;
			expect(res.body.title).toBe(POST_DATA.title);
			expect(res.body.body).toBe(POST_DATA.body);
		});
	});
});