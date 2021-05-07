// const express = require('express')
import express from 'express';
import {controller} from '../controllers/todos';
const router = express.Router();

router
	.route('/')
	.get(controller.getTodos)
	.post(controller.postTodo);

router
	.route('/:id')
	.put(controller.putTodo)
	.delete(controller.deleteTodo);
	
export = router;