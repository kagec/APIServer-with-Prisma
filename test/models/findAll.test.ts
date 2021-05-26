import {todo} from '../../models/todos';



describe('findAll', () => {
	test('success', async () => {
		await expect(todo.findAll()).resolves.toBeDefined;
	});
});