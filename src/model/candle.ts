declare const require;
const yahooFinance = require('yahoo-finance')

import * as Promise from 'promise';
import { IYahooFinance } from '../typings/yahoo-finance';

import {IHistoricalQuote} from '../typings/yahoo-finance';
import { Util } from "../util";

export class HistoricalCandle {

  readonly date: string;

  readonly min: number;
  readonly max: number;
  readonly minMaxDiff: number;

  readonly open: number;
  readonly close: number;
  readonly openCloseDiff: number;
  readonly openClosePercentageChange: number;

  readonly volume: number;

  readonly bullishCandle: boolean;
  readonly bearishCandle: boolean;

  private previousCandle: HistoricalCandle;
  private nextCandle: HistoricalCandle;

  public descent: number; // do not write from the outside... fixme: readonly?
    
  constructor(readonly symbol: string, readonly historialData: IHistoricalQuote) {

    Util.debugLog('>> Creating candle for symbol ' + symbol + ' for date ' + historialData.date);

    this.date = historialData.date;

    this.min = historialData.low;
    this.max = historialData.high;
    this.open = historialData.open;
    this.close = historialData.close;
    this.volume = historialData.volume;

    this.minMaxDiff = this.max - this.min;
    
    this.openCloseDiff = this.close - this.open;
    this.openClosePercentageChange = this.openCloseDiff / this.close;

    this.bullishCandle = this.open > this.close;
    this.bearishCandle = !this.bullishCandle;

    this.descent = 1;

  }

  public setNextCandle(c: HistoricalCandle) : void {
      this.nextCandle = c;
  }

  public setPreviousCandle(c: HistoricalCandle) : void {
    this.descent = this.close / c.close;
    this.previousCandle = c;
  }

  public getNextCandle(): HistoricalCandle {
    return this.nextCandle;
  }

  public getPreviousCandle(): HistoricalCandle {
    return this.previousCandle;
  }
  
}