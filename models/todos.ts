import { PrismaClient } from '@prisma/client'
import { TodoInput, UpdateData } from '../src/@types/global';
const prisma = new PrismaClient()

export module todo {
	export async function findAll() {
		const allTodo = await prisma.todo.findMany();
		return allTodo;
	}
	export async function create(data:TodoInput) {
		if (!data.title) 
			throw new Error('titleは必須です');
		if (!data.body)
			throw new Error('bodyは必須です');

		const todo = await prisma.todo.create({
			data:{
				title:data.title,
				body: data.body,
				updatedAt: new Date(),
			},
		})

		return todo;
	}
	export async function update(data:{id:number, title:string, body:string}) {
		if (!data.id || data.id < 1)
			throw new Error('idは必須です（1以上の数値）');			
		if (!data.title)
			throw new Error('titleは必須です');
		if (!data.body)
			throw new Error('bodyは必須です');
		
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
			},
			where: {
				id:data.id,
			}
		});
		return todo;
		
	}
	export async function remove(id:number) {
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
	}
}