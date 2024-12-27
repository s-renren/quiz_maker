import { listUseCase } from 'domain/list/useCase/listUseCase';
import { brandedId } from 'service/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  delete: async ({ user, params }) => {
    const list = await listUseCase.delete(user, brandedId.list.maybe.parse(params.listId));

    return { status: 200, body: list };
  },
}));
