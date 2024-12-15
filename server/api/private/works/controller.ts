import { workQuery } from 'domain/work/repository/workQuery';
import { toWorkDto } from 'domain/work/service/toWorkDto';
import { workUseCase } from 'domain/work/workUseCase/workUseCase';
import { prismaClient } from 'service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await workQuery.quizListAll(prismaClient).then((works) => works.map(toWorkDto)),
  }),
  post: ({ body }) =>
    workUseCase.create(body.quiz, body.answer).then((work) => ({ status: 200, body: work })),
}));
