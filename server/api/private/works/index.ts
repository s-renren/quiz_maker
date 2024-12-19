import type { DefineMethods } from 'aspida';
import type { MaybeId } from 'common/types/brandedId';
import type { WorkCreateVal, WorkDto } from 'common/types/work';

export type Methods = DefineMethods<{
  get: {
    query?: {
      limit?: number;
    };
    resBody: WorkDto[];
  };

  post: {
    reqBody: WorkCreateVal;
    resBody: WorkDto;
  };

  delete: {
    reqBody: {
      workId: MaybeId['work'];
    };
    status: 200;
    resBody: WorkDto;
  };
}>;
