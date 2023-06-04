/**
 * @author Leonardo Lozano <leono@duck.com>
 */

import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { Writable } from 'stream';

global{
  declare namespace awslambda {
    export namespace HttpResponseStream {
      function from(writable: Writable, metadata: any): Writable;
    }

    export type StreamifyHandler = (event: APIGatewayEvent, responseStream: Writable, context: Context) => Promise<any>;

    export function streamifyResponse(handler: StreamifyHandler) : Handler<any, any>;
  }
}
