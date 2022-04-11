import { expect } from 'chai';
import { AmountReceivable } from '../../../src/domain/remunerations/amount-receivable';
import { Currency } from '../../../src/domain/remunerations/currency';
import { Money } from '../../../src/domain/remunerations/money';

const ONE_HOUR_IN_MS = 3600000;
const HALF_HOUR_IN_MS = 1800000;
const TEN_MINUTES_IN_MS = 600000;

describe('Amount receivable', () => {
  [
    [ONE_HOUR_IN_MS, 40, 40],
    [HALF_HOUR_IN_MS, 25, 12.5],
    [TEN_MINUTES_IN_MS, 10, 1.67]
  ].forEach(([timeInMs, valuePerHour, expectedValue]) => {
    it(`should calculate a time interval value: ${timeInMs}, ${valuePerHour}, ${expectedValue}`, () => {
      const expectedAmount = new Money(expectedValue, Currency.REAL);

      const amountReceivable = new AmountReceivable(timeInMs, valuePerHour);

      expect(amountReceivable.amount).to.be.deep.equal(expectedAmount);
    });
  });
});
