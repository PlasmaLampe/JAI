declare const require;
const yahooFinance = require('yahoo-finance')

import * as Promise from 'promise';
import { IYahooFinance } from '../../typings/yahoo-finance';

import {IHistoricalQuote} from '../../typings/yahoo-finance';
import { Util } from "../../util";
import { HistoricalCandle } from './../candle';

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

  protected indicatorData: OutputFormat[];

  constructor(public readonly name: string) {
    Util.debugLog('>> Creating new indicator with name ' + name);
  }

  public abstract loadData(dataSrc : HistoricalCandle[]): void;

  public printToConsole() : void {
    for(const entry of this.indicatorData) {
      console.log(this.toString(entry));
    }
  }

  protected abstract evaluateInputData(dataSrc: HistoricalCandle[]): OutputFormat[];

  protected abstract toString(src: OutputFormat) : string;
}

export abstract class AbstractLineIndicator extends AbstractIndicator<IAbstractLineIndicatorFormat> {

  constructor(public readonly name: string) {
            super(name);
      }

    public loadData(dataSrc : HistoricalCandle[]): void {
        try{
          this.indicatorData = this.evaluateInputData(dataSrc);
      } catch(e) {
          console.error('>> Error while loading Indicator ' + this.name, e);
      }
    }

    public getIndicatorData() : IAbstractLineIndicatorFormat[] {
      return this.indicatorData;
    }

    protected toString(src: IAbstractLineIndicatorFormat) : string {
        return '>> Indicator ' + this.name + ' for date ' 
          + src.date + ' and value: ' + src.value;
    }

}
