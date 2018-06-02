declare const require;
const yahooFinance = require('yahoo-finance')
const moment = require('moment')

import * as _ from 'lodash';

import * as Promise from 'promise';
import { IYahooFinance, IYahooFinanceRSSFeedEntry, IYahooFinanceElement } from '../typings/yahoo-finance';

import {RSSReader} from '../services/rss'
import {HTTP} from '../services/http'

import { IQuoteSummaryDetail } from '../typings/yahoo-finance';
import { IQuotePrice } from '../typings/yahoo-finance';
import { ITrend } from '../typings/yahoo-finance';
import { IEarnings } from '../typings/yahoo-finance';
import { IDefaultKeyStatistics } from '../typings/yahoo-finance';
import { ISummaryProfile } from '../typings/yahoo-finance';
import { IFinancialData } from '../typings/yahoo-finance';
import { IQuote } from '../typings/yahoo-finance';
import { IHistoricalQuote } from '../typings/yahoo-finance';
import { Util } from "../util";
import { HistoricalCandle } from './candle';

export interface ICompanyNewsEntry extends IYahooFinanceElement {
  /**
   * The complete content of the news
   */
  content: string;
}

export class Company {

  private summaryDetail: IQuoteSummaryDetail;
  private price: IQuotePrice;
  private recommendationTrend: ITrend;
  private earnings: IEarnings;
  private calendarEvents: any; // FIXME
  private upgradeDowngradeHistory: any; // FIXME,
  private defaultKeyStatistics: IDefaultKeyStatistics;
  private summaryProfile: ISummaryProfile;
  private financialData: IFinancialData;
  private candles: HistoricalCandle[];

  private newsFeed: ICompanyNewsEntry[];

  constructor(readonly symbol: string) {
  }

  private initNewsFeed(): Promise<{}> {

    return new Promise((success: Function, error: Function) => {

      RSSReader.read<IYahooFinanceRSSFeedEntry[]>('http://finance.yahoo.com/rss/headline?s=' + this.symbol)
        .then((r) => {
  
          this.newsFeed = Util.isDefined(r[0])? _.flatten(r[0].item) : [];

          Util.debugLog('>> Company >> Initializing news feed...');

          let newsDownloads : Promise<{}>[] = [];
          for(const newsEntry of this.newsFeed) {
            newsDownloads.push(HTTP.get(newsEntry.link[0]).then(c => newsEntry.content = c.body));
          }

          Promise.all(newsDownloads).then(() => {success()}).catch((e) => {console.error(e); success(); });
  
        }).catch((e) => {
          console.error('>> Company >> Could not initialize news feed for ticker ' + this.symbol, e);

          this.newsFeed = [];

          success();
        }) ;

    });

  }

  private initOnline(): Promise<{}> {
    return new Promise((success: Function, error: Function) => {

      Util.debugLog('>> Creating instance from company for ticket symbol ' + this.symbol);

      yahooFinance.quote({
        symbol: this.symbol,
        modules: ['financialData', 'summaryProfile', 'defaultKeyStatistics', 'price']
      }, (err, quotes: IQuote) => {

        this.financialData = quotes.financialData;
        this.summaryProfile = quotes.summaryProfile;
        this.defaultKeyStatistics = quotes.defaultKeyStatistics;

        success();
      });

    });
  }

  private initOnlineHistorical(from: string, to: string, period: string = 'd'): Promise<{}> {

    return new Promise((success: Function, error: Function) => {

      yahooFinance.historical({
        symbol: this.symbol,
        from: from,
        to: to,
        period: period  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
      }, (err, quotes: IHistoricalQuote[]) => {

        // sort backwards if needed
        if (quotes.length > 2 &&
          moment(quotes[0].date).isAfter(moment(quotes[1].date))) {
            quotes = quotes.reverse();
        }

        this.candles = [];

        for (const quoteEntry of quotes) {
          // FIXME: ORDER!!!!
          const newCandle: HistoricalCandle = new HistoricalCandle(this.symbol, quoteEntry);

          if (this.candles.length > 0) {
            newCandle.setPreviousCandle(this.candles[this.candles.length - 1]);
            this.candles[this.candles.length - 1].setNextCandle(newCandle);
          }

          this.candles.push(newCandle);
        }

        success();
      });

    });
  }

  public init(from: string, to: string, period: string = 'd'): Promise<{}> {
    return new Promise((success: Function, error: Function) => {
      
      this.initNewsFeed()
        .then(() => {
            this.initOnline().then(() => {
              this.initOnlineHistorical(from, to, period).then(() => {
                success();
              }).catch((e) => { error(e) })
            }).catch((e) => { error(e) })
        }).catch((e) => { error(e) })

    });
  }

  public getHistoricalData(): HistoricalCandle[] { // FixME: add caching
    return this.candles;
  }

  public getNews(): ICompanyNewsEntry[] {
    return this.newsFeed;
  }

}