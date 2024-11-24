import type { DtoId } from './brandedId';

type WorkBase = {
  id: DtoId['work'];
  quiz: string;
  answer: string;
};

export type SetQuiz = WorkBase & {
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
};

export type CreateQuiz = WorkBase & {
  choiceA: null;
  choiceB: null;
  choiceC: null;
  choiceD: null;
};

export type WorkEntity = CreateQuiz | SetQuiz;
