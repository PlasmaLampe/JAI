import { Util } from "../util";

const _ = require('lodash');

declare const require;
// https://www.npmjs.com/package/js-regression FIXME: add types
const jsregression = require('js-regression');

export class MinerFactory {

    /**
     * // === training data generated from y = 2.0 + 5.0 * x + 2.0 * x^2 === //
        var data = [];
        for(var x = 1.0; x < 100.0; x += 1.0) {
        var y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random() * 1.0;
        data.push([x, x * x, y]); // Note that the last column should be y the output
        }
        
        // === Create the linear regression === //
        var regression = new jsregression.LinearRegression({
        alpha: 0.001, // 
        iterations: 300,
        lambda: 0.0
        });
        // can also use default configuration: var regression = new jsregression.LinearRegression(); 
        
        // === Train the linear regression === //
        var model = regression.fit(data);
        
        // === Print the trained model === //
        console.log(model);
        
        
        // === Testing the trained linear regression === //
        var testingData = [];
        for(var x = 1.0; x < 100.0; x += 1.0) {
        var actual_y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random() * 1.0;
        var predicted_y = regression.transform([x, x * x]);
        console.log("actual: " + actual_y + " predicted: " + predicted_y); 
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

        const resultModel = MinerFactory.createDataMapFromInputObjects(obj, inputFields,trainingPrediction);

        Util.debugLog('>> created data map ', resultModel);

        var regression = new jsregression.LogisticRegression(); // Fixme: Austauschbar machen
        //var regression = new jsregression.LinearRegression(); // Fixme: Austauschbar machen
        
        // === Train the linear regression === //
        regression.fit(resultModel);

        return regression;
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

        const resultModel = MinerFactory.createDataMapFromInputObjects(obj, inputFields,trainingPrediction);

        // === Train the linear regression === //
        regression.fit(resultModel);

        for(const row of resultModel){

            // remove learning entry from row
            const testrow = _.clone(row);
            testrow.pop();

            // run test prediction
            const predicted_y = regression.transform(testrow);

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