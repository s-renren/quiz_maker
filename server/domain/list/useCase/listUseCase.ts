import type { MaybeId } from 'common/types/brandedId';
import type { ListDto } from 'common/types/list';
import type { UserDto } from 'common/types/user';
import { transaction } from 'service/prismaClient';
import { listMethod } from '../model/listMethod';
import type { ListCreateSaveVal } from '../model/listType';
import { listCommand } from '../repository/listCommand';
import { listQuery } from '../repository/listQuery';
import { toListDto } from '../service/toListDto';

export const listUseCase = {
  create: async (user: UserDto, val: ListCreateSaveVal): Promise<ListDto> => {
    return transaction('RepeatableRead', async (tx) => {
      const createList = listMethod.create(user, val);

      await listCommand.save(tx, createList);

      return toListDto(createList.list);
    });
  },
  delete: (user: UserDto, listId: MaybeId['list']): Promise<ListDto> =>
    transaction('RepeatableRead', async (tx) => {
      const list = await listQuery.findById(tx, listId);
      const deleted = listMethod.delete(user, list);

      await listCommand.delete(tx, deleted);
      return toListDto(deleted.list);
    }),
};
