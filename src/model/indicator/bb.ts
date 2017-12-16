import {AbstractLineIndicator} from './abstractIndicator'
import {IAbstractLineIndicatorFormat} from './abstractIndicator'

import {IHistoricalCandle} from './../candle'

// => Fixme: aggregate to complete BB indicator
export class UpperBB extends AbstractLineIndicator {
    
      constructor(protected readonly interval: number, protected readonly dataSrc : IHistoricalCandle[]) {
        super('UpperBB' + interval, dataSrc);
      }
    
    
      protected evaluateInputData(dataSrc: IHistoricalCandle[]): IAbstractLineIndicatorFormat[] {
        //todo
        return []
      }
    
  }
  
  export class LowerBB extends AbstractLineIndicator {
    
      constructor(protected readonly interval: number, protected readonly dataSrc : IHistoricalCandle[]) {
        super('LowerBB' + interval, dataSrc);
      }
    
    
      protected evaluateInputData(dataSrc: IHistoricalCandle[]): IAbstractLineIndicatorFormat[] {
        //todo
        return []
      }
    
  }