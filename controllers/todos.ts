import {todo} from '../models/todos';
import type {Request,Response} from 'express';


export const controller = {
	 async getTodos(req:Request, res:Response) {
		 try {
			const storedTodos = await todo.findAll();
			res.status(200).json(storedTodos);
		 } catch (e) {
			res.status(400).json({message: e.message});
		 }
	}	,
	 async postTodo(req:Request, res:Response) {
		try {
			const {title, body} = req.body;
			const createdTodo = await todo.create({title, body});

			res.status(200).json(createdTodo);
		} catch (e) {
			res.status(400).json({message: e.message});
		}
	},
	 async putTodo(req:Request, res:Response) {
		const id = req.params.id;
		const {title, body} = req.body;
		const parsedId = parseInt(id, 10);

		try {
			const updatedTodo = await todo.update({
				id: parsedId,
				title,
				body,
			});

			res.status(200).json(updatedTodo);
		} catch (e) {
			res.status(400).json({message: e.message});
		}
	},
	 async deleteTodo(req: Request, res: Response) {
		const id = req.params.id;
		const parsedId = parseInt(id, 10);

		try {
			const deletedTodo = await todo.remove(parsedId);

			res.status(200).json(deletedTodo);
		} catch (e) {
			res.status(400).json({message: e.message});
		}
	},
}