import {todo} from '../models/todos';
import * as express from 'express';

export module controller {
	export async function getTodos(req:express.Request, res:express.Response) {
		const storedTodos = await todo.findAll();
		res.status(200).json(storedTodos);
	}	
	export async function postTodo(req:express.Request, res:express.Response) {
		try {
			const {title, body} = req.body;
			const createdTodo = await todo.create({title, body});

			res.status(200).json(createdTodo);
		} catch (e) {
			res.status(400).json({message: e.message});
		}
	}
	export async function putTodo(req:express.Request, res:express.Response) {
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
	}
	export async function deleteTodo(req: express.Request, res: express.Response) {
		const id = req.params.id;
		const parsedId = parseInt(id, 10);

		try {
			const deletedTodo = await todo.remove(parsedId);

			res.status(200).json(deletedTodo);
		} catch (e) {
			res.status(400).json({message: e.message});
		}
	}
}