import { Kysely } from 'kysely';
import { queryBuilder } from './database';

export class Transaction {

  /**
   * Query transaction table. Filter by timeZone and date rage.
   * // NOTE: A possible but theorical scenario
   * @param  tz                     timeZone
   * @param  fromDate               from date. ISO format
   * @param  toDate                 to date. ISO format
   * @return          AsyncIterableIterator for `selected columns`
   */
  static sliceByZone(tz: string, fromDate: string, toDate: string) {
    return queryBuilder.selectFrom('transaction')
      .select(['id', 'tz as timeZone', 'type', 'created_date', 'detail'])
      .where('tz', '=', tz)
      .where(({ and, cmpr }) => and([
          cmpr('created_date', '>=', fromDate),
          cmpr('created_date', '<', toDate)
      ]))
      .stream(10000);
  }

}
