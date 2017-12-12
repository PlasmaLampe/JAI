declare const require;
const yahooFinance = require('yahoo-finance')

import * as Promise from 'promise';
import { IYahooFinance } from '../typings/yahoo-finance';

import {IQuoteSummaryDetail} from '../typings/yahoo-finance';
import {IQuotePrice} from '../typings/yahoo-finance';
import {ITrend} from '../typings/yahoo-finance';
import {IEarnings} from '../typings/yahoo-finance';
import {IDefaultKeyStatistics} from '../typings/yahoo-finance';
import {ISummaryProfile} from '../typings/yahoo-finance';
import {IFinancialData} from '../typings/yahoo-finance';
import {IQuote} from '../typings/yahoo-finance';
import {IHistoricalQuote} from '../typings/yahoo-finance';
import { Util } from "../util";

export class Company {
    
      private summaryDetail: IQuoteSummaryDetail;
      private price: IQuotePrice;
      private recommendationTrend: ITrend;
      private earnings: IEarnings;
      private calendarEvents: any; // FIXME
      private upgradeDowngradeHistory : any; // FIXME,
      private defaultKeyStatistics: IDefaultKeyStatistics;
      private summaryProfile: ISummaryProfile;
      private financialData: IFinancialData;
      private historialData: IHistoricalQuote[];
    
      constructor(readonly symbol: string) {
      }
    
      public initOnline(): Promise<{}> {
        return new Promise((success: Function, error: Function) => {
    
          Util.debugLog('>> Creating instance from company for ticket symbol ' + this.symbol);

          yahooFinance.quote({
            symbol: this.symbol,
            modules: ['financialData','summaryProfile','defaultKeyStatistics','price']
          }, (err, quotes : IQuote) => {

            this.financialData = quotes.financialData;
            this.summaryProfile = quotes.summaryProfile;
            this.defaultKeyStatistics = quotes.defaultKeyStatistics;
    
            success();
          });
    
        });
      }

      public initOnlineHistorical(from: string, to: string, period: string = 'd'): Promise<{}> {

        return new Promise((success: Function, error: Function) => {
    
          Util.debugLog('>> Loading historial data for ' + this.symbol);

          yahooFinance.historical({
            symbol: this.symbol,
            from: from,
            to: to,
            // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
          }, (err, quotes: IHistoricalQuote[]) => {
              
              this.historialData = quotes;
            
              success();
          });
    
        });
      }

      public getHistoricalData(): IHistoricalQuote[] { // FixME: add caching
        return this.historialData;
      }
    
    }