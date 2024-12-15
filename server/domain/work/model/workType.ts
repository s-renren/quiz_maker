import type { WorkDto } from 'common/types/work';
import type { EntityId } from 'service/brandedId';

export type workEntity = Omit<WorkDto, 'id' | 'quiz' | 'answer'> & {
  id: EntityId['work'];
  quiz: string;
  answer: string;
};
