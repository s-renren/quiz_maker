import assert from 'assert';
import type { UserDto } from 'common/types/user';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';
import type { WorkCreateSaveVal, WorkDeleteVal, workEntity, WorkSaveVal } from './workType';

export const workMethod = {
  create: (user: UserDto, val: WorkCreateSaveVal): WorkSaveVal => {
    const work: workEntity = {
      id: brandedId.work.entity.parse(ulid()),
      quiz: val.quiz,
      answer: val.answer,
      choiceA: null,
      choiceB: null,
      choiceC: null,
      choiceD: null,
      author: { id: brandedId.user.entity.parse(user.id), signInName: user.signInName },
    };

    return { work };
  },
  delete: (user: UserDto, work: workEntity): WorkDeleteVal => {
    assert(user.id === String(work.author.id));

    return { deletable: true, work };
  },
};
