import { expect, test } from 'vitest';
import { createCognitoUserClient, noCookieClient } from '../apiClient';
import { DELETE, GET, POST } from '../utils';

test(GET(noCookieClient.private.works), async () => {
  const userClient = await createCognitoUserClient();
  const res = await userClient.private.works.$get();

  expect(res).toHaveLength(0);
});

test(POST(noCookieClient.private.works), async () => {
  const userClient = await createCognitoUserClient();
  const quiz = 'testQuiz';
  const answer = 'testAnswer';
  const list = 'name';
  const res = await userClient.private.works.$post({
    body: {
      quiz,
      answer,
      list,
    },
  });

  expect(res.quiz).toBe(quiz);
  expect(res.answer).toBe(answer);
  expect(res.list).toBe(list);
});

test(DELETE(noCookieClient.private.works), async () => {
  const apiClient = await createCognitoUserClient();
  const work = await apiClient.private.works.$post({ body: { quiz: 'a', answer: 'b', list: 'c' } });
  const res = await apiClient.private.works.delete({ body: { workId: work.id } });

  expect(res.status).toEqual(200);
});

test(DELETE(noCookieClient.private.works._workId('_workId')), async () => {
  const apiClient = await createCognitoUserClient();
  const work = await apiClient.private.works.$post({ body: { quiz: 'a', answer: 'b', list: 'c' } });
  const res = await apiClient.private.works._workId(work.id).delete();

  expect(res.status).toEqual(200);
});

// 追加テスト: データの取得後の検証
test('GET after POST', async () => {
  const userClient = await createCognitoUserClient();
  const quiz = 'testQuiz2';
  const answer = 'testAnswer2';
  const list = 'name';
  await userClient.private.works.$post({
    body: {
      quiz,
      answer,
      list,
    },
  });

  const res = await userClient.private.works.$get();
  expect(res).toHaveLength(1);
  expect(res[0].quiz).toBe(quiz);
  expect(res[0].answer).toBe(answer);
});
