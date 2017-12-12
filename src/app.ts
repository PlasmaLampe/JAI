import {Company} from './model/company';
import { MinerFactory } from './model/minerFactory';
import { IHistoricalQuote } from './typings/yahoo-finance';
import { Util } from './util';

const testComp: Company = new Company('GSK');

//testComp.initOnline().then(() => { console.log(testComp) });
testComp.initOnlineHistorical('2017-01-01','2017-11-01').then(() => {

    const xValues: string[] = ['open','high','low'];
    const outputPredictionFunction = (data: IHistoricalQuote[],entryNr: number) => {
        
                if(Util.isDefined(data[entryNr+1])){
                    return data[entryNr+1]['open']
                } else {
                    return data[entryNr]['open']
                }
        
            };


    const model = MinerFactory.createRegressionModel(testComp.getHistoricalData(),xValues,
    outputPredictionFunction);

    Util.debugLog('>> created model: ', model);

    MinerFactory.testRegressionModel(model, testComp.getHistoricalData(),xValues,
    outputPredictionFunction);
});

