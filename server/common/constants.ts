export const APP_NAME = 'QUIZ_MAKER';

export const ID_NAME_LIST = ['user', 'task', 'work', 'list'] as const;

export const IS_PROD = process.env.NODE_ENV === 'production';

const listToDict = <T extends readonly [string, ...string[]]>(list: T): { [U in T[number]]: U } =>
  list.reduce((dict, type) => ({ ...dict, [type]: type }), {} as { [U in T[number]]: U });

export const ID_NAMES = listToDict(ID_NAME_LIST);
