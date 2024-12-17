import { workUseCase } from 'domain/work/workUseCase/workUseCase';
import { brandedId } from 'service/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  delete: async ({ params }) => {
    const work = await workUseCase.delete(brandedId.work.maybe.parse(params.workId));

    return { status: 200, body: work };
  },
}));
