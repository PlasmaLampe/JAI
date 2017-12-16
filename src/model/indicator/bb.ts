import {AbstractLineIndicator} from './abstractIndicator'
import {IAbstractLineIndicatorFormat} from './abstractIndicator'

import {HistoricalCandle} from './../candle'

// => Fixme: aggregate to complete BB indicator
export class UpperBB extends AbstractLineIndicator {
    
      constructor(protected readonly interval: number) {
        super('UpperBB' + interval);
      }
    
    
      protected evaluateInputData(dataSrc: HistoricalCandle[]): IAbstractLineIndicatorFormat[] {
        //todo
        return []
      }
    
  }
  
  export class LowerBB extends AbstractLineIndicator {
    
      constructor(protected readonly interval: number) {
        super('LowerBB' + interval);
      }
    
    
      protected evaluateInputData(dataSrc: HistoricalCandle[]): IAbstractLineIndicatorFormat[] {
        //todo
        return []
      }
    
  }