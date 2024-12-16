import type { Prisma } from '@prisma/client';
import type { WorkDto } from 'common/types/work';
import { assert } from 'console';
import type { WorkDeleteVal } from '../model/workType';

export const workCommand = {
  save: async (tx: Prisma.TransactionClient, work: WorkDto): Promise<void> => {
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
  delete: async (tx: Prisma.TransactionClient, val: WorkDeleteVal): Promise<void> => {
    assert(val.deletable);

    await tx.work.delete({ where: { id: val.work.id } });
  },
};
