import type { Prisma, Work } from '@prisma/client';
import type { MaybeId } from 'common/types/brandedId';
import { brandedId } from 'service/brandedId';
import type { workEntity } from '../model/workType';

const toQuizEntity = async (prismaWork: Work): Promise<workEntity> => {
  const id = brandedId.work.entity.parse(prismaWork.id);
  return {
    id,
    quiz: prismaWork.quiz,
    answer: prismaWork.answer,
    choiceA: null,
    choiceB: null,
    choiceC: null,
    choiceD: null,
  };
};

export const workQuery = {
  quizListAll: (tx: Prisma.TransactionClient): Promise<workEntity[]> =>
    tx.work.findMany().then((works) => Promise.all(works.map(toQuizEntity))),
  findById: async (tx: Prisma.TransactionClient, workId: MaybeId['work']): Promise<workEntity> =>
    tx.work.findUniqueOrThrow({ where: { id: workId } }).then(toQuizEntity),
};
