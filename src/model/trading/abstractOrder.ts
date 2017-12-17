import { AbstractIndicator, IAbstractIndicatorFormat } from "../indicator/abstractIndicator";
import { HistoricalCandle } from "../candle";

export abstract class AbstractOrder<IndicatorFormat extends IAbstractIndicatorFormat> {

    protected isActive: boolean;

    constructor(    protected readonly name: string, 
                    protected readonly commissionCost: number,
                    protected readonly indicators: AbstractIndicator<IndicatorFormat>[],
                    protected readonly dataCandles: HistoricalCandle[] ) {

                        this.isActive = false;

    }

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
    }

    protected createExit() : void {
        this.isActive = false;
        // ... FIXME
    }

}