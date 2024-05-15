export const PORT = process.env.PORT || 3000;
export const MONGO_CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  'mongodb+srv://omar:omar1234@test.jyc6ghz.mongodb.net/node-tuts?retryWrites=true&w=majority';
export const MONGO_DATABASE_NAME: string =
  process.env.MONGO_DATABASE_NAME || 'myTodoapp';
export const GLOBALPREFIX = 'api';
export const HOST = process.env.HOST ?? 'localhost';
export const DBNAME = 'DB-DEVHUBMONITOR';
export const BASE_GITHUB_URL = 'https://api.github.com';
export const REFRESH_TOKEN_TTL_MONTHS = 2;
export const ACCESS_TOKEN_TTL_MINS = 5;
export const ACCESS_TOKEN_SECRET = 'MRqQloBgqK45AU9R2gaMlstMP2p';
export const REFRESH_TOKEN_SECRET = 'LaZGQ9VopIMXzQHYPB9wBkbeF8o';
