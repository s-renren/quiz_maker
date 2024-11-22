import type { DtoId } from './brandedId';

type WorkBase = Choices & {
  id: DtoId['work'];
  quiz: string;
  answer: string;
  isCorrected: boolean;
};

type Choices = {
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
};

export type WorkEntity = WorkBase;
