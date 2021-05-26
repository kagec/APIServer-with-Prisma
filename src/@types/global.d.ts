import type { Prisma } from '@prisma/client';

// Omitは対象の型から不要な型を除外できる
export type CreateTodo = Omit<Prisma.TodoCreateInput, 'createdAt' | 'updatedAt'>;
export type UpdateTodo = Omit<Prisma.TodoUpdateInput, 'createdAt' | 'updatedAt'> &
  Prisma.TodoWhereUniqueInput;