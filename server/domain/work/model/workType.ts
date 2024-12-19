import type { WorkDto } from 'common/types/work';
import type { EntityId } from 'service/brandedId';

export type workEntity = Omit<WorkDto, 'id' | 'quiz' | 'answer' | 'author'> & {
  id: EntityId['work'];
  quiz: string;
  answer: string;
  author: Omit<WorkDto['author'], 'id'> & { id: EntityId['user'] };
};

export type WorkCreateSaveVal = { quiz: string; answer: string };
export type WorkSaveVal = { work: workEntity };
export type WorkDeleteVal = { deletable: boolean; work: workEntity };
