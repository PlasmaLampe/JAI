import {Company} from './model/company';
import { Predictor } from './model/predictor';
import { IHistoricalQuote, IYahooFinanceRSSFeedEntry } from './typings/yahoo-finance';
import { Util } from './util';
import { HistoricalCandle } from './model/candle';
import { SMA } from './model/indicator/sma';

import * as fs from 'fs';

import {AbstractLineIndicator} from './model/indicator/abstractIndicator'
import { SMABasedOrder } from './model/trading/orders/smaBasedOrder';

const testComp: Company = new Company('EXK');

testComp.init('2017-01-01','2017-10-25').then(() => { 
    
    fs.writeFile("/Users/jorgamelunxen/Documents/dev2/JAI/"+testComp.getNews()[0].guid[0]._+'.html', testComp.getNews()[0].content, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 

    console.log(testComp.getNews()[0].content) 
});

//testComp.initOnlineHistorical('2017-01-01','2017-10-25').then(() => {

    //new SMABasedOrder(9.90,testComp.getHistoricalData()).run();

        /*
        
    const inputPredictionFunction = (data: IHistoricalCandle[],entryNr: number) => {
        return data[entryNr]['openClosePercentageChange']
    };

    const outputPredictionFunction = (data: IHistoricalCandle[],entryNr: number) => {

        if(Util.isDefined(data[entryNr+1])){
            return data[entryNr+1]['openClosePercentageChange']
        } else {
            return data[entryNr]['openClosePercentageChange']
        } 

    };


    const model = Predictor.createRegressionModel(testComp.getHistoricalData(),inputPredictionFunction,
    outputPredictionFunction);

    Util.debugLog('>> created model: ', model);

    Predictor.testRegressionModel(model, testComp.getHistoricalData(),inputPredictionFunction,
    outputPredictionFunction); */
//});

