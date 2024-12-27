import type { Prisma } from '@prisma/client';
import assert from 'assert';
import type { ListDeleteVal, ListSaveVal } from '../model/listType';

export const listCommand = {
  save: async (tx: Prisma.TransactionClient, val: ListSaveVal): Promise<void> => {
    await tx.list.upsert({
      where: { id: val.list.id },
      create: {
        id: val.list.id,
        name: val.list.name,
        authorId: val.list.author.id,
      },
      update: {
        name: val.list.name,
      },
    });
  },
  delete: async (tx: Prisma.TransactionClient, val: ListDeleteVal): Promise<void> => {
    assert(val.deletable);

    await tx.list.delete({ where: { id: val.list.id } });
  },
};
