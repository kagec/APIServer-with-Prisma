import {todo} from '../../models/todos';

describe('model update', () => {
	const INVALID_ID = 1000000;
	const inputData = {
		id: INVALID_ID,
		title: "test update title",
		body: "test update body",
	}

	describe('failure', () => {
		test('no exist todo', async () => {
			await expect(todo.update(inputData))
				.rejects
				.toThrowError(new Error('idに該当するtodoが存在しません'));
		});
	});

	describe('success', () => {
		test('have id', async () => {
			const todoCreate = await todo.create({
				title:"dummy title",
				body: "dummy body",
			})

			const VALID_ID = todoCreate.id;
			inputData.id = VALID_ID;
			const updateTodo = await todo.update(inputData);

			expect(updateTodo.id).toBeDefined();
		});

		test('change data', async () => {
			const todoCreate = await todo.create({
				title:"dummy title",
				body: "dummy body",
			})

			const VALID_ID = todoCreate.id;
			inputData.id = VALID_ID;
			const updateTodo = await todo.update(inputData);

			expect(updateTodo.title).toBe(inputData.title);
			expect(updateTodo.body).toBe(inputData.body);			
		});
	});
});