import { workQuery } from 'domain/work/repository/workQuery';
import { toWorkDto } from 'domain/work/service/toWorkDto';
import { workUseCase } from 'domain/work/workUseCase/workUseCase';
import { brandedId } from 'service/brandedId';
import { prismaClient } from 'service/prismaClient';
import { z } from 'zod';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await workQuery.quizListAll(prismaClient).then((works) => works.map(toWorkDto)),
  }),
  post: ({ body }) =>
    workUseCase.create(body.quiz, body.answer).then((work) => ({ status: 200, body: work })),
  delete: {
    validators: { body: z.object({ workId: brandedId.work.maybe }) },
    handler: async ({ body }) => {
      const work = await workUseCase.delete(body.workId);

      return { status: 200, body: work };
    },
  },
}));
