import type { DtoId } from './brandedId';

export type ListDto = {
  id: DtoId['list'];
  name: string;
  author: { id: DtoId['user']; signInName: string };
};

export type ListCreateVal = { name: string };
