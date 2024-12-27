import assert from 'assert';
import type { UserDto } from 'common/types/user';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';
import type { ListCreateSaveVal, ListDeleteVal, listEntity, ListSaveVal } from './listType';

export const listMethod = {
  create: (user: UserDto, val: ListCreateSaveVal): ListSaveVal => {
    const list: listEntity = {
      id: brandedId.list.entity.parse(ulid()),
      name: val.name,
      author: { id: brandedId.user.entity.parse(user.id), signInName: user.signInName },
    };
    return { list };
  },
  delete: (user: UserDto, list: listEntity): ListDeleteVal => {
    assert(user.id === String(list.author.id));
    return { deletable: true, list };
  },
};
