import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

type DbClient = ReturnType<typeof drizzle>;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlClient?: DbClient;
};

let pool: Pool | undefined = globalForDb.__arenaNextJsPostgresqlPool;
let dbClient: DbClient | undefined = globalForDb.__arenaNextJsPostgresqlClient;

function getDb(): DbClient {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  if (!pool) {
    const useSsl =
      process.env.DATABASE_SSL === "true" ||
      process.env.DATABASE_SSL === "1";

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });

    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlPool = pool;
    }
  }

  if (!dbClient) {
    dbClient = drizzle(pool);

    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlClient = dbClient;
    }
  }

  return dbClient;
}

export const db = new Proxy({} as DbClient, {
  get(_target, prop, receiver) {
    const client = getDb();
    return Reflect.get(client, prop, receiver);
  },
  apply(_target, _thisArg, args) {
    const client = getDb();
    return Reflect.apply(client as unknown as (...args: unknown[]) => unknown, _thisArg, args);
  },
});

