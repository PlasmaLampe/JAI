declare const require;
const _ = require('lodash');

import {AbstractLineIndicator} from './abstractIndicator'
import {IAbstractLineIndicatorFormat} from './abstractIndicator'

import {Queue} from './../../queue'

import {IHistoricalCandle} from './../candle'

export class SMA extends AbstractLineIndicator {
    
      constructor(protected readonly interval: number, protected readonly dataSrc : IHistoricalCandle[]) {
        super('SMA' + interval, dataSrc);
      }
    
      protected evaluateInputData(dataSrc: IHistoricalCandle[]): IAbstractLineIndicatorFormat[] {
          const output: IAbstractLineIndicatorFormat[] = [];
          const buildUpQueue: Queue<IHistoricalCandle> = new Queue<IHistoricalCandle>(this.interval);

          for(const srcEntry of dataSrc){
            buildUpQueue.push(srcEntry);

            console.log(buildUpQueue.getContent().length, this.interval); // FIXME

            if(buildUpQueue.getContent().length >= this.interval - 1) {
                let sum : number = 0;
                for(const qEntry of buildUpQueue.getContent()) {
                    sum += qEntry.close;
                }
                
                console.log(output)
                
                output.push({
                    date: buildUpQueue.getContent()[buildUpQueue.getContent().length -1].date,
                    value: sum/this.interval
                })
            }
          }
        
          return output;
      }
    
    }