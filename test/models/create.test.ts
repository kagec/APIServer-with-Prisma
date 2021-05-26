import {todo} from '../../models/todos';
import type {CreateTodo} from '../../src/@types/global';



describe('model create', () => {	
	const CREATE_DATA = {
		title: "test create title",
		body: "test create body",
	}
	const dataWithoutTitle = { body: CREATE_DATA.body } as CreateTodo;
	const dataWithoutBody = { title: CREATE_DATA.title } as CreateTodo;

	describe('failure', () => {
		test('no title', async () => {
			await expect(todo.create(dataWithoutTitle))
				.rejects
				.toThrowError(new Error('titleは必須です'));
		});

		test('no body', async () => {			
			await expect(todo.create(dataWithoutBody))
				.rejects
				.toThrowError(new Error('bodyは必須です'));
		});
	});

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