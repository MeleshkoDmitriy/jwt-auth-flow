import Datastore from "nedb-promises";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFolder = path.join(__dirname);

try {
  await fs.mkdir(dbFolder, { recursive: true });
} catch (error) {
  console.error('❌ Error creating database folder:', error);
}

let USERS, REFRESH_TOKENS, INVALID_TOKENS;

try {
  USERS = Datastore.create(path.join(dbFolder, "USERS.db"));
  REFRESH_TOKENS = Datastore.create(path.join(dbFolder, "REFRESH_TOKENS.db"));
  INVALID_TOKENS = Datastore.create(path.join(dbFolder, "INVALID_TOKENS.db"));
  console.log('✅ Databases initialized successfully');
} catch (error) {
  console.error('❌ Error creating databases:', error);
  throw error;
}

export { USERS, REFRESH_TOKENS, INVALID_TOKENS }; 