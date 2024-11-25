import type { Prisma } from '@prisma/client';
import type { WorkEntity } from 'common/types/work';

export const workCommand = {
  save: async (tx: Prisma.TransactionClient, work: WorkEntity): Promise<void> => {
    await tx.work.upsert({
      where: { id: work.id },
      create: {
        id: work.id,
        quiz: work.quiz,
        answer: work.answer,
      },
      update: {
        quiz: work.quiz,
        answer: work.answer,
      },
    });
  },
};
