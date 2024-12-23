import { expect, test } from 'vitest';
import { createCognitoUserClient, noCookieClient } from '../apiClient';
import { DELETE, GET, POST } from '../utils';

test(GET(noCookieClient.private.lists), async () => {
  const userClient = await createCognitoUserClient();
  const res = await userClient.private.lists.$get();

  expect(res).toHaveLength(0);
});

test(POST(noCookieClient.private.lists), async () => {
  const userClient = await createCognitoUserClient();
  const res = await userClient.private.lists.$post({ body: { name: 'a' } });

  expect(res.name).toBe('a');
});

test(DELETE(noCookieClient.private.lists), async () => {
  const apiClient = await createCognitoUserClient();
  const list = await apiClient.private.lists.$post({ body: { name: 'a' } });
  const res = await apiClient.private.lists.delete({ body: { listId: list.id } });

  expect(res.status).toEqual(200);
});

test(DELETE(noCookieClient.private.lists._listId('_listId')), async () => {
  const apiClient = await createCognitoUserClient();
  const list = await apiClient.private.lists.$post({ body: { name: 'a' } });
  const res = await apiClient.private.lists._listId(list.id).delete();

  expect(res.status).toEqual(200);
});
