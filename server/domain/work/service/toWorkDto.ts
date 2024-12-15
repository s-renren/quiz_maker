import type { WorkDto } from 'common/types/work';
import { brandedId } from 'service/brandedId';
import type { workEntity } from '../model/workType';

export const toWorkDto = (work: workEntity): WorkDto => ({
  ...work,
  id: brandedId.work.dto.parse(work.id),
  quiz: work.quiz,
  answer: work.answer,
  choiceA: null,
  choiceB: null,
  choiceC: null,
  choiceD: null,
});
