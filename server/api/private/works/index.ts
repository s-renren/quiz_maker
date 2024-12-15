import type { DefineMethods } from 'aspida';
import type { CreateQuiz, WorkDto } from 'common/types/work';

export type Methods = DefineMethods<{
  get: {
    resBody: WorkDto[];
  };
  post: {
    reqBody: { quiz: string; answer: string };
    resBody: CreateQuiz;
  };
}>;
