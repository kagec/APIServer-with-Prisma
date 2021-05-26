import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import type {CreateTodo, UpdateTodo} from '../src/@types/global'

export const todo = {
	 async findAll() {
		const allTodo = await prisma.todo.findMany();
		return allTodo;
	},
	 async create(data:CreateTodo) {
		if (!data.title) 
			throw new Error('titleは必須です');
		if (!data.body)
			throw new Error('bodyは必須です');

		const todo = await prisma.todo.create({
			data:{
				...data,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		})

		return todo;
	},
	 async update(data:UpdateTodo) {
		if (!data.id || data.id < 1){
			throw new Error('idは必須です（1以上の数値）');			
		}
		if (!data.title){
			throw new Error('titleは必須です');
		}
		if (!data.body){
			throw new Error('bodyは必須です');
		}
		const targetIndex = await prisma.todo.findUnique({
			where: {
				id: data.id,
			}
		});
		
		if (!targetIndex)
			throw new Error('idに該当するtodoが存在しません');
			
		const todo = await prisma.todo.update({
			data: {
				title:data.title,
				body:data.body,
				updatedAt: new Date(),
			},
			where: {
				id:data.id,
			}
		});
		return todo;
		
	},
	 async remove(id:number) {
		if (!id || id < 1)
			throw new Error('idは必須です（1以上の数値）');

		const targetIndex = await prisma.todo.findUnique({
			where: {
				id: id,
			}
		});

		if (!targetIndex)
			throw new Error('idに該当するtodoが存在しません');

		const removedTodo = await prisma.todo.delete({
			where: {
				id: id,
			}
		});

		return removedTodo;	
	},
}