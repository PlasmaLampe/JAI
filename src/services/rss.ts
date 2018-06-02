import * as xml2js from 'xml2js';
import * as Promise from 'promise';
import {HTTP, HTTPResponse} from './http'
import { Util } from '../util';

/**
 * A simple RSS reader
 */
export class RSSReader {

    /**
     * Reads the rss feed from the given URI
     * @param uri   The feed's source
     */
    public static read<TargetRSSStructure>(uri: string): Promise<TargetRSSStructure> {

        return new Promise((res, rej) => {

            HTTP.get(uri).then((data: HTTPResponse) => {

                const parser = new xml2js.Parser();
    
                parser.parseString(data.body, (err, result) => {
                    if(Util.isDefined(err)){
                        rej(err);
                    }

                    res(result.rss.channel);
                });
    
            }).catch((e) => {
                rej(e);
            })

        });

    }

}

