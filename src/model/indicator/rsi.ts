import {AbstractLineIndicator} from './abstractIndicator'
import {IAbstractLineIndicatorFormat} from './abstractIndicator'

import {HistoricalCandle} from './../candle'

export class RSI extends AbstractLineIndicator {
    
      constructor(protected readonly interval: number) {
        super('RSI' + interval);
      }
    
    
      protected evaluateInputData(dataSrc: HistoricalCandle[]): IAbstractLineIndicatorFormat[] {
        //todo
        return []
      }
    
  }