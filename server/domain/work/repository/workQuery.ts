import type { Prisma, User, Work } from '@prisma/client';
import type { DtoId, MaybeId } from 'common/types/brandedId';
import { brandedId } from 'service/brandedId';
import type { workEntity } from '../model/workType';

const toQuizEntity = async (prismaWork: Work & { Author: User }): Promise<workEntity> => {
  const id = brandedId.work.entity.parse(prismaWork.id);
  return {
    id,
    quiz: prismaWork.quiz,
    answer: prismaWork.answer,
    choiceA: null,
    choiceB: null,
    choiceC: null,
    choiceD: null,
    author: {
      id: brandedId.user.entity.parse(prismaWork.authorId),
      signInName: prismaWork.Author.signInName,
    },
  };
};

export const workQuery = {
  quizListAll: (tx: Prisma.TransactionClient, authorId: DtoId['user']): Promise<workEntity[]> =>
    tx.work
      .findMany({
        where: { authorId },
        include: { Author: true },
      })
      .then((works) => Promise.all(works.map(toQuizEntity))),
  findById: async (tx: Prisma.TransactionClient, workId: MaybeId['work']): Promise<workEntity> =>
    tx.work
      .findUniqueOrThrow({ where: { id: workId }, include: { Author: true } })
      .then(toQuizEntity),
};
