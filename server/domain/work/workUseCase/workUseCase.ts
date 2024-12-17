import type { MaybeId } from 'common/types/brandedId';
import type { CreateQuiz, WorkDto } from 'common/types/work';
import { transaction } from 'service/prismaClient';
import { workMethod } from '../model/workMethods';
import { workCommand } from '../repository/workCommands';
import { workQuery } from '../repository/workQuery';
import { toWorkDto } from '../service/toWorkDto';

export const workUseCase = {
  create: async (quiz: string, answer: string): Promise<CreateQuiz> => {
    return transaction('RepeatableRead', async (tx) => {
      const CreateWork = workMethod.create({ quiz, answer });

      await workCommand.save(tx, CreateWork);

      return CreateWork;
    });
  },
  delete: (workId: MaybeId['work']): Promise<WorkDto> =>
    transaction('RepeatableRead', async (tx) => {
      const work = await workQuery.findById(tx, workId);
      const deleted = workMethod.delete(work);

      await workCommand.delete(tx, deleted);

      return toWorkDto(deleted.work);
    }),
};
