import { expect } from 'chai';
import { AmountReceivable } from '../../../src/domain/remunerations/amount-receivable';

const ONE_HOUR_IN_MS = 3600000;
const HALF_HOUR_IN_MS = 1800000;
const TEN_MINUTES_IN_MS = 600000;

describe('Amount receivable', () => {
  [
    [ONE_HOUR_IN_MS, 40, 40],
    [HALF_HOUR_IN_MS, 25, 12.5],
    [TEN_MINUTES_IN_MS, 10, 1.6666666666666665]
  ].forEach(([timeInMs, valuePerHour, expectedValue]) => {
    it(`should calculate a time interval value: ${timeInMs}, ${valuePerHour}, ${expectedValue}`, () => {
      const amountReceivable = new AmountReceivable(timeInMs, valuePerHour);

      expect(amountReceivable.value).to.be.equal(expectedValue);
    });
  });
});
