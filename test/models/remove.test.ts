import {todo} from '../../models/todos';

describe('model update', () => {
	const INVALID_ID = 1000000;

	describe('failure', () => {
		const noId = '' as unknown as number;

		test('id < 1', async () => {
			await expect(todo.remove(0))
				.rejects
				.toThrowError(new Error('idは必須です（1以上の数値）'));
		});

		test('no id', async () => {
			await expect(todo.remove(noId))
				.rejects
				.toThrowError(new Error('idは必須です（1以上の数値）'));
		});

		test('no exist todo', async () => {
			await expect(todo.remove(INVALID_ID))
				.rejects
				.toThrowError(new Error('idに該当するtodoが存在しません'));
		});
	});

	describe('success', () => {
		test('sucess', async () => {
			const todoCreate = await todo.create({
				title:"dummy title",
				body: "dummy body",
			})

			const VALID_ID = todoCreate.id;

			const updateTodo = await todo.remove(VALID_ID);

			expect(updateTodo.title).toBe(todoCreate.title);
		});
	});
});