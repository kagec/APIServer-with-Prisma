import request from 'supertest';
import app from '../../app';

// afterAll(async (done) => {
// 	await prisma.$disconnect();
// 	done();
// });

describe('test PUT /api/todos/:id', () => {
	const INVALID_ID = 100000
	const PUT_DATA = {
		title: "test new title",
		body:"test new body",
	};
	const POST_DATA = {
		title: "dummy title",
		body: "dummy body",
	}

	describe('put failure', () => {
		test('no title', async () => {
			const res = await request(app)
				.put(`/api/todos/${INVALID_ID}`)
				.send({
					body: "dummy body",
				})
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(400);
			
			expect(res.body).toEqual({
				message: "titleは必須です"
			});
		});

		test('no body', async () => {
			const res = await request(app)
				.put(`/api/todos/${INVALID_ID}`)
				.send({
					title: "dummy title",
				})
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(400);
			
			expect(res.body).toEqual({
				message: "bodyは必須です"
			});
		});

		test('invalid id', async () => {
			const res = await request(app)
				.put(`/api/todos/${INVALID_ID}`)
				.send(PUT_DATA)
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(400);
			
			expect(res.body).toEqual({
				message: "idに該当するtodoが存在しません"
			});
		});
	});


	describe('put success', () => {
		test('put success', async () => {		
			const postRes = await request(app)
				.post("/api/todos")
				.send(POST_DATA)
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(200);
			
			const VALID_ID = postRes.body.id;
	
			const res = await request(app)
				.put(`/api/todos/${VALID_ID}`)
				.send(PUT_DATA)
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(200);
			
			expect(res.body.id).toBeDefined;
			expect(res.body.title).toBe(PUT_DATA.title);
			expect(res.body.body).toBe(PUT_DATA.body);
		});
	});
});