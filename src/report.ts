import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { Readable, Writable, Transform, pipeline } from 'stream';
import { promisify } from 'util';

import { transactionReport } from './queryRepo';

const promisePipeline = promisify(pipeline);
// awslambda is a global namespace added to the NodeJS environment
exports.handler = awslambda.streamifyResponse(async (event: APIGatewayEvent,
  responseStream: Writable, context: Context) => {
    const { queryStringParameters } = event;

    const fromDate = queryStringParameters!['fromDate'];
    const toDate = queryStringParameters!['toDate'];
    const tz = queryStringParameters!['tz'] ?? 'us-west1';

    const metadata = {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Accept-Encoding': 'gzip',
        'X-Custom-Header': 'Cool-Custom-Header'
      }
    };

    let requestStream: Readable | Transform;

    if (!fromDate || !toDate) {
      metadata.statusCode = 400;
      metadata.headers['Content-Type'] =  'application/json';

      requestStream = Readable.from(Buffer.from('Missing query parameters. Bad request'));
    } else {
      requestStream = transactionReport({tz, fromDate, toDate});
    }

    responseStream = awslambda.HttpResponseStream.from(responseStream, metadata);

    await promisePipeline(requestStream, responseStream);
});
