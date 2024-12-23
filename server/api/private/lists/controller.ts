import { listQuery } from 'domain/list/repository/listQuery';
import { toListDto } from 'domain/list/service/toListDto';
import { listUseCase } from 'domain/list/useCase/listUseCase';
import { brandedId } from 'service/brandedId';
import { prismaClient } from 'service/prismaClient';
import { z } from 'zod';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({
    status: 200,
    body: await listQuery.listAll(prismaClient, user.id).then((lists) => lists.map(toListDto)),
  }),
  post: ({ user, body }) =>
    listUseCase.create(user, body).then((list) => ({ status: 200, body: list })),
  delete: {
    validators: { body: z.object({ listId: brandedId.list.maybe }) },
    handler: async ({ user, body }) => {
      const list = await listUseCase.delete(user, body.listId);

      return { status: 200, body: list };
    },
  },
}));
