import request from 'supertest';
import app from '../../app';

// afterAll(async (done) => {
// 	await prisma.$disconnect();
// 	done();
// });



describe('test DELETE /api/todos/:id', () => {
	const INVALID_ID = 100000;
	const POST_DATA = {
		title: "dummy title",
		body: "dummy body",
	}

	describe('delete failure', () => {
		test('invalid id', async () => {
			const res = await request(app)
				.delete(`/api/todos/${INVALID_ID}`)
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(400);
	
			expect(res.body).toEqual({
				message: "idに該当するtodoが存在しません"
			})
		});
	});	

	describe('delete success', () => {
		test('delete success', async () => {
			const postRes = await request(app)
				.post("/api/todos")
				.send(POST_DATA)
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(200);
		
			const VALID_ID = postRes.body.id;
	
			const res = await request(app)
				.delete(`/api/todos/${VALID_ID}`)
				.set("Accept", "application/json")
				.expect('Content-Type', /application\/json/)
				.expect(200);
	
			expect(res.body.id).toBeDefined;
			expect(res.body.title).toBe(POST_DATA.title);
			expect(res.body.body).toBe(POST_DATA.body);
		});
	});
});