declare const require;
const _ = require('lodash');

import {AbstractLineIndicator} from './abstractIndicator'
import {IAbstractLineIndicatorFormat} from './abstractIndicator'

import {Queue} from './../../queue'

import {HistoricalCandle} from './../candle'

export class SMA extends AbstractLineIndicator {

      constructor(protected readonly interval: number) {
        super('SMA' + interval);
      }
    
      protected evaluateInputData(dataSrc: HistoricalCandle[]): IAbstractLineIndicatorFormat[] {
          const output: IAbstractLineIndicatorFormat[] = [];
          const buildUpQueue: Queue<HistoricalCandle> = new Queue<HistoricalCandle>(this.interval);

          for(const srcEntry of dataSrc){
            buildUpQueue.push(srcEntry);

            if(buildUpQueue.getContent().length >= this.interval - 1) {
                let sum : number = 0;

                for(const qEntry of buildUpQueue.getContent()) {
                    sum += qEntry.close;
                }
                
                output.push({
                    date: buildUpQueue.getContent()[buildUpQueue.getContent().length -1].date,
                    value: sum/this.interval
                })
            }
          }
        
          return output;
      }
    
    }