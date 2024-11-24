import type { DefineMethods } from 'aspida';
import type { CreateQuiz, WorkEntity } from 'common/types/work';

export type Methods = DefineMethods<{
  get: {
    resBody: WorkEntity[];
  };
  post: {
    reqBody: { quiz: string; answer: string };
    resBody: CreateQuiz;
  };
}>;
