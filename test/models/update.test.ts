import {todo} from '../../models/todos';
import { UpdateTodo } from '../../src/@types/global';

describe('model update', () => {
	const INVALID_ID = 1000000;
	let VALID_ID;
	const inputData = {
		id: INVALID_ID,
		title: "test update title",
		body: "test update body",
	}

	const dataWithoutId = {
		title: inputData.title,
		body: inputData.body,
	} as UpdateTodo;
	const dataWithoutTitle = {
		id: VALID_ID,
		body: inputData.body,
	} as UpdateTodo;
	const dataWithoutBody = {
		id: VALID_ID,
		title: inputData.title,
	} as UpdateTodo;

	describe('failure', () => {
		test('no id', async () => {
			await expect(todo.update(dataWithoutId))
				.rejects
				.toThrowError(new Error('idは必須です（1以上の数値）'));
		});

		test('no title', async () => {
			const todoCreate = await todo.create({
				title:"dummy title",
				body: "dummy body",
			})

			const VALID_ID = todoCreate.id;
			dataWithoutTitle.id = VALID_ID;

			await expect(todo.update(dataWithoutTitle))
				.rejects
				.toThrowError(new Error('titleは必須です'));
		});
	
		test('no body', async () => {
			const todoCreate = await todo.create({
				title:"dummy title",
				body: "dummy body",
			})

			const VALID_ID = todoCreate.id;
			dataWithoutBody.id = VALID_ID;

			await expect(todo.update(dataWithoutBody))
			.rejects
			.toThrowError(new Error('bodyは必須です'));
		});

		test('no exist todo', async () => {
			inputData.id = INVALID_ID;

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