import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';

interface Transaction {
  id: string;
  tz: string;
  type: string;
  detail: string;
  // ... more columns for suspense effect
  created_by: number;
  created_date: string;
}

interface Database {
  transaction: Transaction;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool: createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      database: process.env.DB
    })
  }),
});
