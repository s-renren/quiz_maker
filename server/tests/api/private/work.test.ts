import { expect, test } from 'vitest';
import { createCognitoUserClient, noCookieClient } from '../apiClient';
import { GET, POST } from '../utils';

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
