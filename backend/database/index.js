import Datastore from "nedb-promises";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFolder = path.join(__dirname);

await fs.mkdir(dbFolder, { recursive: true });

export const USERS = Datastore.create(path.join(dbFolder, "USERS.db"));
export const REFRESH_TOKENS = Datastore.create(path.join(dbFolder, "REFRESH_TOKENS.db"));
export const INVALID_TOKENS = Datastore.create(path.join(dbFolder, "INVALID_TOKENS.db")); 