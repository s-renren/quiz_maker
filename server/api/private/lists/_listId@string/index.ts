import type { DefineMethods } from 'aspida';
import type { ListDto } from 'common/types/list';

export type Methods = DefineMethods<{
  delete: {
    status: 200;
    resBody: ListDto;
  };
}>;
