import {todo} from '../../models/todos';

describe('model create', () => {	
	const CREATE_DATA = {
		title: "test title",
		body: "test body",
	}
	
	// describe('failure', () => {
	// 	test('', async () => {
	// 	});
	// });

	describe('success', () => {
		test('have id', async () => {
			const createTodo = await todo.create(CREATE_DATA);
			expect(createTodo.id).toBeDefined();
		});
		test('have title', async () => {
			const createTodo = await todo.create(CREATE_DATA);
			expect(createTodo.title).toBe(CREATE_DATA.title);
		});
	});
});