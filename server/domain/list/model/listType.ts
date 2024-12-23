import type { ListDto } from 'common/types/list';
import type { EntityId } from 'service/brandedId';

export type listEntity = Omit<ListDto, 'id' | 'name' | 'author'> & {
  id: EntityId['list'];
  name: string;
  author: Omit<ListDto['author'], 'id'> & { id: EntityId['user'] };
};

export type ListCreateSaveVal = { name: string };
export type ListSaveVal = { list: listEntity };
export type ListDeleteVal = { deletable: boolean; list: listEntity };
