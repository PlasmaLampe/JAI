import {Company} from './model/company';

const checkedStocks: string[] = [ 'AAPL', 'T', 'MO' ];

const testComp: Company = new Company('GSK');

testComp.init().then(() => { console.log(testComp) });