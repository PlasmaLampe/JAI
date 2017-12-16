'use strict'

import { suite, test, slow, timeout } from "mocha-typescript";
import { assert } from "chai";
import { SMA } from "../../model/indicator/sma";
import { MockAAPLHistoricalCandles } from "../mockData/aapl_candles";
import { HistoricalCandle } from "../../model/candle"
import { IAbstractLineIndicatorFormat } from "../../model/indicator/abstractIndicator";

@suite class GeneralSMABehaviour {
  @test smaCanBeCreated() {
    const smaIndicator = new SMA(7);

    assert.notEqual(typeof smaIndicator, 'undefined',
      "SMA indicator to be createable");
  }

  @test smaCanLoadData() {
    const smaIndicator = new SMA(7);

    const c: HistoricalCandle[] = [];
    for (const dataMock of MockAAPLHistoricalCandles.DATA) {
      c.push(new HistoricalCandle('AAPL', dataMock));
    }

    smaIndicator.loadData(c);

    assert.equal(smaIndicator.getIndicatorData().length,
      MockAAPLHistoricalCandles.DATA.length - 5,
      "SMA indicator has not the correct length with respect to " +
      "interval size and input data...");
  }

  @test smaIsCorrectlyCalculated() {
    const smaIndicator = new SMA(7);

    const c: HistoricalCandle[] = [];
    for (const dataMock of MockAAPLHistoricalCandles.DATA) {
      c.push(new HistoricalCandle('AAPL', dataMock));
    }

    smaIndicator.loadData(c);

    const smaOutput: IAbstractLineIndicatorFormat[] = 
      smaIndicator.getIndicatorData();

    // calculate sma by hand
    let sum: number = 0;
    for (let pos: number = MockAAPLHistoricalCandles.DATA.length - 8;
      pos < MockAAPLHistoricalCandles.DATA.length - 1; pos++) {
      sum += MockAAPLHistoricalCandles.DATA[pos].close;
    }

    const lastDaySMA: number = sum / 7;

    assert.equal(smaOutput[smaOutput.length - 1].value,
      lastDaySMA, 
      "SMA indicator has not correctly been calculated...");
    }
}