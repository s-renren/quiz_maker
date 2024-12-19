import type { Prisma } from '@prisma/client';
import { assert } from 'console';
import type { WorkDeleteVal, WorkSaveVal } from '../model/workType';

export const workCommand = {
  save: async (tx: Prisma.TransactionClient, val: WorkSaveVal): Promise<void> => {
    await tx.work.upsert({
      where: { id: val.work.id },
      create: {
        id: val.work.id,
        quiz: val.work.quiz,
        answer: val.work.answer,
        authorId: val.work.author.id,
      },
      update: {
        quiz: val.work.quiz,
        answer: val.work.answer,
      },
    });
  },
  delete: async (tx: Prisma.TransactionClient, val: WorkDeleteVal): Promise<void> => {
    assert(val.deletable);

    await tx.work.delete({ where: { id: val.work.id } });
  },
};
