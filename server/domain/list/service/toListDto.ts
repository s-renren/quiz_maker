import type { ListDto } from 'common/types/list';
import { brandedId } from 'service/brandedId';
import type { listEntity } from '../model/listType';

export const toListDto = (list: listEntity): ListDto => ({
  ...list,
  id: brandedId.list.dto.parse(list.id),
  name: list.name,
  author: { ...list.author, id: brandedId.user.dto.parse(list.author.id) },
});
