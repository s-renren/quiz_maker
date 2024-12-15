import type { WorkDto, WorkFetch } from 'common/types/work';
import type { EntityId } from 'service/brandedId';

export type workEntity = Omit<WorkDto, 'id' | 'quiz' | 'answer'> & {
  id: EntityId['work'];
  quiz: string;
  answer: string;
};

export type workFetchEntity = Omit<WorkFetch, 'id' | 'quiz' | 'answer'> & {
  id: EntityId['work'];
  quiz: string;
  answer: string;
}
