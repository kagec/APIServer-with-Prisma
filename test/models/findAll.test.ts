import {todo} from '../../models/todos';
import { prismaMock } from '../singleton';



describe('findAll', () => {
	// describe('failure', () => {
	// 	test('fail', async () => {
	// 		prismaMock.todo.findMany.mockReturnValue
	// 	});
	// });

	// describe('success', () => {

	// });

	test('success', async () => {
		await expect(todo.findAll()).resolves.toBeDefined;
	});
});