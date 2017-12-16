import {AbstractLineIndicator} from './abstractIndicator'
import {IAbstractLineIndicatorFormat} from './abstractIndicator'

import {IHistoricalCandle} from './../candle'

export class RSI extends AbstractLineIndicator {
    
      constructor(protected readonly interval: number, protected readonly dataSrc : IHistoricalCandle[]) {
        super('RSI' + interval, dataSrc);
      }
    
    
      protected evaluateInputData(dataSrc: IHistoricalCandle[]): IAbstractLineIndicatorFormat[] {
        //todo
        return []
      }
    
  }