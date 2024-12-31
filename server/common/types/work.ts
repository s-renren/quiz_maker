import type { DtoId } from './brandedId';

type WorkBase = {
  id: DtoId['work'];
  quiz: string;
  answer: string;
  author: { id: DtoId['user']; signInName: string };
  list: string;
};

export type WorkCreateVal = { quiz: string; answer: string; list: string };

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

export type WorkDto = CreateQuiz | SetQuiz;
