import type { MaybeId } from 'common/types/brandedId';
import type { UserDto } from 'common/types/user';
import type { WorkDto } from 'common/types/work';
import { transaction } from 'service/prismaClient';
import { workMethod } from '../model/workMethods';
import type { WorkCreateSaveVal } from '../model/workType';
import { workCommand } from '../repository/workCommands';
import { workQuery } from '../repository/workQuery';
import { toWorkDto } from '../service/toWorkDto';

export const workUseCase = {
  create: async (user: UserDto, val: WorkCreateSaveVal): Promise<WorkDto> => {
    return transaction('RepeatableRead', async (tx) => {
      const createWork = workMethod.create(user, val);

      await workCommand.save(tx, createWork);

      return toWorkDto(createWork.work);
    });
  },
  delete: (user: UserDto, workId: MaybeId['work']): Promise<WorkDto> =>
    transaction('RepeatableRead', async (tx) => {
      const work = await workQuery.findById(tx, workId);
      const deleted = workMethod.delete(user, work);

      await workCommand.delete(tx, deleted);

      return toWorkDto(deleted.work);
    }),
};
