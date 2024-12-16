import assert from 'assert';
import type { UserDto } from 'common/types/user';
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
  delete: (user: UserDto, work: workEntity): WorkDeleteVal => {
    assert(user.id === String(work.id));

    return { deletable: true, work };
  },
};
