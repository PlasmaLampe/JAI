import {Company} from './model/company';
import { Predictor } from './model/predictor';
import { IHistoricalQuote } from './typings/yahoo-finance';
import { Util } from './util';
import { IHistoricalCandle } from './model/candle';

const testComp: Company = new Company('GSK');

//testComp.initOnline().then(() => { console.log(testComp) });
testComp.initOnlineHistorical('2017-10-01','2017-10-25').then(() => {

    const xValues: string[] = ['descent'];
    const outputPredictionFunction = (data: IHistoricalCandle[],entryNr: number) => {

                if(Util.isDefined(data[entryNr+1])){
                    return data[entryNr+1]['descent']
                } else {
                    return data[entryNr]['descent']
                } 
        
            };


    const model = Predictor.createRegressionModel(testComp.getHistoricalData(),xValues,
    outputPredictionFunction);

    Util.debugLog('>> created model: ', model);

    Predictor.testRegressionModel(model, testComp.getHistoricalData(),xValues,
    outputPredictionFunction);
});

