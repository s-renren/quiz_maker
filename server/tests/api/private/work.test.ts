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
  const res = await userClient.private.works.$post({
    body: {
      quiz,
      answer,
    },
  });

  expect(res.quiz).toBe(quiz);
  expect(res.answer).toBe(answer);
});

test(DELETE(noCookieClient.private.works), async () => {
  const userClient = await createCognitoUserClient();
  const quiz = 'testQuiz';
  const answer = 'testAnswer';
  const posts = await userClient.private.works.$post({
    body: {
      quiz,
      answer,
    },
  });

  await userClient.private.works._workId(posts.id).$delete();
  const res = await userClient.private.works.$get();

  expect(res).toHaveLength(0);
  expect(res).toEqual([]);
});

// 追加テスト: データの取得後の検証
test('GET after POST', async () => {
  const userClient = await createCognitoUserClient();
  const quiz = 'testQuiz2';
  const answer = 'testAnswer2';
  await userClient.private.works.$post({
    body: {
      quiz,
      answer,
    },
  });

  const res = await userClient.private.works.$get();
  expect(res).toHaveLength(1);
  expect(res[0].quiz).toBe(quiz);
  expect(res[0].answer).toBe(answer);
});
