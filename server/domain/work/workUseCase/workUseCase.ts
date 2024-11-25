import type { CreateQuiz } from 'common/types/work';
import { transaction } from 'service/prismaClient';
import { workMethod } from '../model/workMethods';
import { workCommand } from '../repository/workCommands';

export const workUseCase = {
  create: async (quiz: string, answer: string): Promise<CreateQuiz> => {
    return transaction('RepeatableRead', async (tx) => {
      const CreateWork = workMethod.create({ quiz, answer });

      await workCommand.save(tx, CreateWork);

      return CreateWork;
    });
  },
};
