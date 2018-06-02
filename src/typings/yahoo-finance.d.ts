declare module yahooFinance {

  export interface IYahooFinanceRSSFeedEntry {
    /**
     * The title of the feed, which includes the ticker symbols in the request. For example "Yahoo! Finance: YHOO News"
     */
    title: string[];

    /**
     * 	A URL for the Yahoo! Finance News page for the ticker symbols in the request. For example http://finance.yahoo.com/q/h?s=yhoo
     */
    link: string[];

    /**
     * The language of the news items, for example, en-us for US English.
     */
    language: string[];

    /**
     * The overall description of the feed including the company names for the ticker symbols in the request, for example "Latest Financial News for YAHOO INC
     */
    description: string[];

    /**
     * The Yahoo! copyright statement for this feed.  
     */
    copyright: string[];

    /**
     * The last time the feed was updated (the current date and time). The format is in the date format defined by RFC822 Section 5, for example Mon, 256 Sep 17:25:18 -0700.
     */
    lastBuildDate: string[];

    /**
     * The image used to identify this feed. See Image Elements for element descriptions. Child elements: url, title, link, width, height
     */
    image: IYahooFinanceImageElement[];

    /**
     * A news headline. Each Yahoo! Finance company news feed contains multiple item elements, one for each headline. See Item Elements for element descriptions. 
     * Child elements: title, link, description, guid, pubDate
     */
    item: IYahooFinanceElement[];
  }

  export interface IYahooFinanceElement {
    /**
     * The news headline, for example "Yahoo! Announces Quarterly Earnings"
     */
    title: string[];

    /**
    * The Yahoo! Finance URL for this news item.
    */
    link: string[];

    /**
     * If given, a short summary of the news item. Many news items include an empty description element.
     */
    description: string[];

    /**
     * Unique identifier for the item. For news items the guid is the Yahoo! Finance ID for the listing. The attribute isPermaLink is false.
     */
    guid: string[];

    /**
     * The date and time this news item was posted, in the date format defined by RFC822 Section 5, Mon, 256 Sep 17:25:18 -0700.
     */
    pubDate: string[];
  }

  export interface IYahooFinanceImageElement {
  
    width: string[];

    height: string[];

    /**
    * The Yahoo! Finance URL for this news item.
    */
    link: string[];

    url: string[];

    title: string[];

  }

  export interface IHttpRequestOptions {
    proxy?: string;
  }

  export interface IYahooHistorialQueryObj {
    symbol: string;
    from: string;
    to: string;// period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }

  export interface IYahooQuoteQueryObj {
    symbol: string;
    modules: string[];  // ex: ['price', 'summaryDetail']
  }

  export interface IYahooFinance {
    historical(q: IYahooHistorialQueryObj, callback: (err: string, q: IHistoricalQuote[]) => void);
    quote(q: IYahooQuoteQueryObj, options: IHttpRequestOptions, callback: (err: string, q: IQuote[]) => void);
  }

  export interface IHistoricalQuote {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjClose: number;
    symbol: string;
  }

  export interface IQuoteSummaryDetail {
    maxAge: number;
    priceHint: number;
    previousClose: number;
    open: number;
    dayLow: number;
    dayHigh: number;
    regularMarketPreviousClose: number;
    regularMarketOpen: number;
    regularMarketDayLow: number;
    regularMarketDayHigh: number;
    dividendRate: number;
    dividendYield: number;
    exDividendDate: string;
    payoutRatio: number;
    fiveYearAvgDividendYield: number;
    beta: number;
    trailingPE: number;
    forwardPE: number;
    volume: number;
    regularMarketVolume: number;
    averageVolume: number;
    averageVolume10days: number;
    averageDailyVolume10Day: number;
    bid: number;
    ask: number;
    bidSize: number;
    askSize: number;
    marketCap: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    priceToSalesTrailing12Months: number;
    fiftyDayAverage: number;
    twoHundredDayAverage: number;
    trailingAnnualDividendRate: number;
    trailingAnnualDividendYield: number;
    currency: string;
    fromCurrency: string;
    lastMarket: string;
    algorithm: string;
  }

  export interface IQuotePrice {
    maxAge: number;
    preMarketChangePercent: number;
    preMarketChange: number;
    preMarketTime: string;
    preMarketPrice: number;
    preMarketSource: string;
    postMarketChangePercent: number;
    postMarketChange: number;
    postMarketTime: string;
    postMarketPrice: number;
    postMarketSource: string;
    regularMarketChangePercent: number;
    regularMarketChange: number;
    regularMarketTime: string;
    priceHint: number;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    averageDailyVolume10Day: number;
    averageDailyVolume3Month: number;
    regularMarketPreviousClose: number;
    regularMarketSource: string;
    regularMarketOpen: number;
    exchange: string;
    exchangeName: string;
    marketState: string;
    quoteType: string;
    symbol: string;
    underlyingSymbol: string;
    shortName: string;
    longName: string;
    currency: string;
    quoteSourceName: string;
    currencySymbol: string;
    fromCurrency: string;
    lastMarket: string;
    marketCap: number;
  }

  export interface ITrendToken {
    period: string;
    strongBuy: number;
    buy: number;
    hold: number;
    sell: number;
    strongSell: number;
  }

  export interface ITrend {
    trend: ITrendToken[],
    maxAge: number;
  }

  export interface IEarnings {
    maxAge: number;
    earningsChart: {
      quarterly: [{
        date: string;
        actual: number;
        estimate: number;
      }, {
          date: string;
          actual: number;
          estimate: number;
        }, {
          date: string;
          actual: number;
          estimate: number;
        }, {
          date: string;
          actual: number;
          estimate: number;
        }],
      currentQuarterEstimate: number;
      currentQuarterEstimateDate: string;
      currentQuarterEstimateYear: number;
    },
    financialsChart: {
      yearly: [{
        date: number;
        revenue: number;
        earnings: number;
      }, {
          date: number;
          revenue: number;
          earnings: number;
        }, {
          date: number;
          revenue: number;
          earnings: number;
        }],
      quarterly: [{
        date: string;
        revenue: number;
        earnings: number;
      }, {
          date: string;
          revenue: number;
          earnings: number;
        }, {
          date: string;
          revenue: number;
          earnings: number;
        }, {
          date: string;
          revenue: number;
          earnings: number;
        }]
    }
  }

  export interface IDefaultKeyStatistics {
    maxAge: number;
    forwardPE: number;
    profitMargins: number;
    floatShares: number;
    sharesOutstanding: number;
    sharesShort: number;
    sharesShortPriorMonth: number;
    heldPercentInsiders: number;
    heldPercentInstitutions: number;
    shortRatio: number;
    shortPercentOfFloat: number;
    beta: number;
    category: string;
    bookValue: number;
    priceToBook: number;
    fundFamily: string;
    legalType: string;
    lastFiscalYearEnd: string;
    nextFiscalYearEnd: string;
    mostRecentQuarter: string;
    netIncomeToCommon: number;
    trailingEps: number;
    forwardEps: number;
    pegRatio: number;
    lastSplitFactor: string;
    lastSplitDate: string;
    //52WeekChange: number;
    //SandP52WeekChange: number;
  }

  export interface ISummaryProfile {
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    website: string;
    industry: string;
    sector: string;
    longBusinessSummary: string;
    fullTimeEmployees: number;
    companyOfficers: string[];
    maxAge: number;
  }

  export interface IFinancialData {
    maxAge: number;
    currentPrice: number;
    targetHighPrice: number;
    targetLowPrice: number;
    targetMeanPrice: number;
    targetMedianPrice: number;
    recommendationMean: number;
    recommendationKey: string;
    numberOfAnalystOpinions: number;
    totalCash: number;
    totalCashPerShare: number;
    ebitda: number;
    totalDebt: number;
    quickRatio: number;
    currentRatio: number;
    totalRevenue: number;
    debtToEquity: number;
    revenuePerShare: number;
    returnOnAssets: number;
    returnOnEquity: number;
    grossProfits: number;
    freeCashflow: number;
    operatingCashflow: number;
    revenueGrowth: number;
    grossMargins: number;
    ebitdaMargins: number;
    operatingMargins: number;
    profitMargins: number;
  }

  // https://github.com/pilwon/node-yahoo-finance/blob/HEAD/docs/quote.md
  export interface IQuote {
    summaryDetail?: IQuoteSummaryDetail;
    price?: IQuotePrice,
    recommendationTrend?: ITrend,
    earnings?: IEarnings,
    calendarEvents?: any, // FIXME
    upgradeDowngradeHistory?: any // FIXME,
    defaultKeyStatistics?: IDefaultKeyStatistics,
    summaryProfile?: ISummaryProfile,
    financialData?: IFinancialData
  }
}

export = yahooFinance;
