import { Util } from "../util";

const _ = require('lodash');

declare const require;
// https://github.com/Tom-Alexander/regression-js FIXME: add types
const regression = require('regression');

export class Predictor {

    /**
        import  from '';
        const result = regression.linear([[0, 1], [32, 67], [12, 79]]);
        const gradient = result.equation[0];
        const yIntercept = result.equation[1];
        }
     */

     /**
      * Creates a regression model from the given input learning data
      *
      * @param obj:                 An array containing the learning data
      * @param inputFields          The fields that should be tracked as x data
      * @param trainingPrediction   A function describing the training output value
      */
    public static createRegressionModel<DataSrc>(
                    obj:DataSrc[], 
                    inputFields: string[], 
                    trainingPrediction: (obj:DataSrc[], currentEntryNr: number) => any) : any /* FIXME: Model */ {

        Util.debugLog('>> creating regression model for input fields ', inputFields);

        const resultModel = Predictor.createDataMapFromInputObjects(obj, inputFields,trainingPrediction);
        const result = regression.linear(resultModel, {
            order: 3,
            precision: 4,
          });
        
        Util.debugLog('>> created data map ', resultModel);
        Util.debugLog('>> created linear model ', result);

        const gradient = result.equation[0];
        const yIntercept = result.equation[1];

        Util.debugLog('>> used gradient ', gradient);
        Util.debugLog('>> yIntercept ', yIntercept);

        return result;
    }

     /**
      * Tests a regression model from the given input learning data
      *
      * @param obj:                 An array containing the learning data
      * @param inputFields          The fields that should be tracked as x data
      * @param trainingPrediction   A function describing the training output value
      */
      public static testRegressionModel<DataSrc>(
        regression: any,
        obj:DataSrc[], 
        inputFields: string[], 
        trainingPrediction: (obj:DataSrc[], currentEntryNr: number) => any) : any /* FIXME: Model */ {

        Util.debugLog('>> testing given regression model for input fields ', inputFields);

        const resultModel = Predictor.createDataMapFromInputObjects(obj, inputFields,trainingPrediction);

        for(const row of resultModel){

            // remove learning entry from row
            const testrow = _.clone(row);
            testrow.pop();

            // run test prediction
            const predicted_y = regression.predict(testrow);

            Util.debugLog('>> tested ' + JSON.stringify(testrow) + ' | actual: ' 
                + row[row.length-1] + ' predicted: ' + predicted_y);

        }
    }

    /**
     * 
    *
    * @param obj:                 An array containing the learning data
    * @param inputFields          The fields that should be tracked as x data
    * @param trainingPrediction   A function describing the training output value
    */
    public static createDataMapFromInputObjects<DataSrc>(obj:DataSrc[], 
                    inputFields: string[], 
                    trainingPrediction: (obj:DataSrc[], currentEntryNr: number) => any) : number[][] {

        let resultModel : number[][] = [];
        
        for(let entryNr:number = 0; entryNr < obj.length; entryNr++) {
            let outputArrayForThisEntry : number[] = [];

            // push training data -- x values
            for(const fieldName of inputFields){
                outputArrayForThisEntry.push(obj[entryNr][fieldName]);
            }

            // calculate training Y data
            outputArrayForThisEntry.push(trainingPrediction(obj,entryNr));

            // entry completly created... push to model
            resultModel.push(outputArrayForThisEntry); 
        }

        return resultModel;

    }
}