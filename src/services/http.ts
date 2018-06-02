import * as request from 'request';
import * as Promise from 'promise';

import { Util } from '../util';

/**
 * Simple re-export of the request response type
 */
export type HTTPResponse = request.RequestResponse; 

/**
 * A simple HTTP service wrapping request.js with a Promise API
 */
export class HTTP {

    public static get(url: string) : Promise<HTTPResponse> {
        return new Promise((res, rej) => {

            request(url, (error, response, body) => {
                if(Util.isDefined(error)) {
                    rej(error);
                }

                res(response);
            });

        });

    } 

}