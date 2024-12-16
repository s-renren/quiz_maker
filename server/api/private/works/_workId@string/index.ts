import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';

export type Methods = DefineMethods<{
  delete: {
    status: 200;
    reqBody: { id: DtoId['work'] };
  };
}>;
