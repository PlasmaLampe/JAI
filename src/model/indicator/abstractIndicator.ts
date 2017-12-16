declare const require;
const yahooFinance = require('yahoo-finance')

import * as Promise from 'promise';
import { IYahooFinance } from '../../typings/yahoo-finance';

import {IHistoricalQuote} from '../../typings/yahoo-finance';
import { Util } from "../../util";
import { IHistoricalCandle } from './../candle';

export interface IAbstractIndicatorFormat {
  /**
   * The matching date of the current indicator value
   */
  date: string;
}

export interface IAbstractLineIndicatorFormat extends IAbstractIndicatorFormat {
  value: number;
}

export abstract class AbstractIndicator <OutputFormat extends IAbstractIndicatorFormat> {

  protected readonly indicatorData: OutputFormat[];

  constructor(public readonly name: string, protected readonly dataSrc : IHistoricalCandle[]) {
    Util.debugLog('>> Creating new indicator with name ' + name);

    try{
        this.indicatorData = this.evaluateInputData(dataSrc);
    } catch(e) {
        console.error('>> Error while loading Indicator ' + this.name, e);
    }

  }

  protected abstract evaluateInputData(dataSrc: IHistoricalCandle[]): OutputFormat[];

  protected abstract toString(src: OutputFormat) : string;

  public printToConsole() : void {
      for(const entry of this.indicatorData) {
        console.log(this.toString(entry));
      }
  }

}

export abstract class AbstractLineIndicator extends AbstractIndicator<IAbstractLineIndicatorFormat> {

    protected toString(src: IAbstractLineIndicatorFormat) : string {
        return '>> Date ' + src.date + ' and value: ' + src.value;
    }

}
