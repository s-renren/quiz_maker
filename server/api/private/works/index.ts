import type { DefineMethods } from 'aspida';
import type { CreateQuiz, WorkDto } from 'common/types/work';

export type Methods = DefineMethods<{
  get: {
    query?: {
      limit?: number;
    }
    resBody: WorkDto[];
  };
  post: {
    reqBody: { quiz: string; answer: string };
    resBody: CreateQuiz;
  };
}>;
