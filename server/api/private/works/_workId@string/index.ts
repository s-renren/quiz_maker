import type { DefineMethods } from 'aspida';
import type { WorkDto } from 'common/types/work';

export type Methods = DefineMethods<{
  delete: {
    status: 200;
    resBody: WorkDto;
  };
}>;
