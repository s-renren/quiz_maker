import type { CreateQuiz } from 'common/types/work';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';

export const workMethod = {
  create: (val: { quiz: string; answer: string }): CreateQuiz => {
    const id = brandedId.work.dto.parse(ulid());
    return {
      id,
      quiz: val.quiz,
      answer: val.quiz,
      choiceA: null,
      choiceB: null,
      choiceC: null,
      choiceD: null,
    };
  },
};
