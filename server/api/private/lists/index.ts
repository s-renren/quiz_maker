import type { DefineMethods } from 'aspida';
import type { MaybeId } from 'common/types/brandedId';
import type { ListCreateVal, ListDto } from 'common/types/list';

export type Methods = DefineMethods<{
  get: {
    query?: {
      limit?: number;
    };
    resBody: ListDto[];
  };

  post: {
    reqBody: ListCreateVal;
    resBody: ListDto;
  };

  delete: {
    reqBody: {
      listId: MaybeId['list'];
    };
    status: 200;
    resBody: ListDto;
  };
}>;
