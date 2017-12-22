import { IAbstractLineIndicatorFormat } from "../../indicator/abstractIndicator";
import { AbstractIndicator } from "../../indicator/abstractIndicator";
import { SMA } from "../../indicator/sma";
import { HistoricalCandle } from "../../candle";
import { Util } from "../../../util";

import { AbstractOrder } from "./abstractOrder";

/**
 * Simple example order
 */
export class SMABasedOrder extends AbstractOrder<IAbstractLineIndicatorFormat> {

    constructor(commission: number, candles: HistoricalCandle[]) {
        super('SMABasedOrder', commission, [new SMA(7)], candles);
    }

    /**
     * @override
     * 
     * @param indicators 
     * @param dataCandles 
     */
    protected entryCondition(indicators: AbstractIndicator<IAbstractLineIndicatorFormat>[], dataCandles: HistoricalCandle[]) : boolean {
        const sma : AbstractIndicator<IAbstractLineIndicatorFormat> = indicators[0];

        const lastDayOfIndicator : IAbstractLineIndicatorFormat = sma.getIndicatorData()[sma.getIndicatorData().length - 1];
        const lastDayOfCandleData : HistoricalCandle = dataCandles[dataCandles.length - 1];

        Util.debugLog('>> Checking indicator of date ' + lastDayOfIndicator.date + ' against candle ' + lastDayOfCandleData.date + 
            ' within order with name ' + this.name);

        return lastDayOfIndicator.value > lastDayOfCandleData.close;
    }

    /**
     * @override
     * 
     * @param indicators 
     * @param dataCandles 
     */
    protected exitCondition(indicators: AbstractIndicator<IAbstractLineIndicatorFormat>[], dataCandles: HistoricalCandle[]) : boolean {
        const sma : AbstractIndicator<IAbstractLineIndicatorFormat> = indicators[0];

        const lastDayOfIndicator : IAbstractLineIndicatorFormat = sma.getIndicatorData()[sma.getIndicatorData().length - 1];
        const lastDayOfCandleData : HistoricalCandle = dataCandles[dataCandles.length - 1];

        Util.debugLog('>> Checking indicator of date ' + lastDayOfIndicator.date + ' against candle ' + lastDayOfCandleData.date + 
            ' within order with name ' + this.name);

        return lastDayOfIndicator.value < lastDayOfCandleData.close;
    }

}