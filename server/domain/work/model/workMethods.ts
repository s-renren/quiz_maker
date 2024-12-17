import type { CreateQuiz } from 'common/types/work';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';
import type { WorkDeleteVal, workEntity } from './workType';

export const workMethod = {
  create: (val: { quiz: string; answer: string }): CreateQuiz => {
    const id = brandedId.work.dto.parse(ulid());
    return {
      id,
      quiz: val.quiz,
      answer: val.answer,
      choiceA: null,
      choiceB: null,
      choiceC: null,
      choiceD: null,
    };
  },
  delete: (work: workEntity): WorkDeleteVal => {
    return { deletable: true, work };
  },
};
