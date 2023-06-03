import { pipeline, Transform } from 'stream';
import { stringify } from 'csv-stringify';

import { Transaction } from './lib/transactions';


export const transactionReport = ({ tz = 'us-west1', fromDate, toDate} : {
  tz: string,
  fromDate: string,
  toDate: string
}): Transform => {
  const strigifier = stringify({ header: true });
  const asyncIterable = Transaction.sliceByZone(tz,
    fromDate, toDate);

  let count = 0;
  return pipeline(asyncIterable, strigifier).on('data', (data) => {
    count++;
    if ((count % 10000) === 0) {
      console.log('pew pew.0', 'another chunk of data', count);
    }
  });
};
