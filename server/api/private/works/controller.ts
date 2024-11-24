import { workUseCase } from 'domain/work/workUseCase/workUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: [] }),
  post: ({ body }) =>
    workUseCase.create(body.quiz, body.answer).then((work) => ({ status: 200, body: work })),
}));
