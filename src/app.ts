import {Company} from './model/company';
import { Predictor } from './model/predictor';
import { IHistoricalQuote } from './typings/yahoo-finance';
import { Util } from './util';
import { HistoricalCandle } from './model/candle';
import { SMA } from './model/indicator/sma';

import {AbstractLineIndicator} from './model/indicator/abstractIndicator'
import { SMABasedOrder } from './model/trading/orders/smaBasedOrder';

const testComp: Company = new Company('AAPL');

//testComp.initOnline().then(() => { console.log(testComp) });
testComp.initOnlineHistorical('2017-01-01','2017-10-25').then(() => {

    new SMABasedOrder(9.90,testComp.getHistoricalData()).run();

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
});

