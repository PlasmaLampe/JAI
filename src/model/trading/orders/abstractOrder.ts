import { AbstractIndicator, IAbstractIndicatorFormat } from "../../indicator/abstractIndicator";
import { HistoricalCandle } from "../../candle";
import { Util } from "../../../util";

export abstract class AbstractOrder<IndicatorFormat extends IAbstractIndicatorFormat> {

    protected isActive: boolean;

    constructor(    protected readonly name: string, 
                    protected readonly commissionCost: number,
                    protected readonly indicators: AbstractIndicator<IndicatorFormat>[],
                    protected readonly dataCandles: HistoricalCandle[] ) {

                    this.isActive = false;

                    // init indicator
                    for(const indicator of this.indicators) {
                        indicator.loadData(dataCandles);
                    }

    }

    /**
     * Tries to execute the current order and calls entry and exit functions
     */
    public run(): void {

        if(this.entryCondition(this.indicators, this.dataCandles)){
            this.createEntry();
        }

        if(this.exitCondition(this.indicators, this.dataCandles)){
            this.createExit();
        }

    }

    protected abstract entryCondition(indicators: AbstractIndicator<IndicatorFormat>[], dataCandles: HistoricalCandle[]) : boolean;

    protected abstract exitCondition(indicators: AbstractIndicator<IndicatorFormat>[], dataCandles: HistoricalCandle[]) : boolean;

    protected createEntry() : void {
        this.isActive = true;
        // ... FIXME
        Util.debugLog('>> Order is active');
    }

    protected createExit() : void {
        this.isActive = false;
        // ... FIXME
        Util.debugLog('>> Order is inactive');
    }

}