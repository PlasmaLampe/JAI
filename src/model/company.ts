const yahooFinance: any = require("./yahoo-finance");
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
    
      constructor(readonly symbol: string) {
      }
    
      public init(): Promise<{}> {
        return new Promise((success: Function, error: Function) => {
    
          yahooFinance.quote({
            symbol: this.symbol,
            modules: ['financialData','summaryProfile','defaultKeyStatistics']
          }, (err, quotes : IQuote) => {
            this.financialData = quotes.financialData;
            this.summaryProfile = quotes.summaryProfile;
            this.defaultKeyStatistics = quotes.defaultKeyStatistics;
    
            success();
          });
    
        });
      }
    
    }