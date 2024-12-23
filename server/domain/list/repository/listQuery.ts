import type { List, Prisma, User } from '@prisma/client';
import type { DtoId, MaybeId } from 'common/types/brandedId';
import { brandedId } from 'service/brandedId';
import type { listEntity } from '../model/listType';

const toListEntity = async (prismaList: List & { Author: User }): Promise<listEntity> => {
  return {
    id: brandedId.list.entity.parse(prismaList.id),
    name: prismaList.name,
    author: {
      id: brandedId.user.entity.parse(prismaList.authorId),
      signInName: prismaList.Author.signInName,
    },
  };
};

export const listQuery = {
  listAll: (tx: Prisma.TransactionClient, authorId: DtoId['user']): Promise<listEntity[]> =>
    tx.list
      .findMany({ where: { authorId }, include: { Author: true } })
      .then((lists) => Promise.all(lists.map(toListEntity))),
  findById: async (tx: Prisma.TransactionClient, listId: MaybeId['list']): Promise<listEntity> =>
    tx.list
      .findUniqueOrThrow({ where: { id: listId }, include: { Author: true } })
      .then(toListEntity),
};
