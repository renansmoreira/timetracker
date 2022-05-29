import { expect } from 'chai';
import { Currency } from '../../../src/domain/remunerations/currency';
import { Money } from '../../../src/domain/remunerations/money';

describe('Money', () => {
  it('should be created with value', () => {
    const expectedAmount = 100;

    const money = new Money(expectedAmount, Currency.REAL);

    expect(money.amount).to.be.equal(expectedAmount);
  });

  it('should be created without value', () => {
    const money = new Money();

    expect(money.amount).to.be.equal(0);
    expect(money.currency).to.be.equal(Currency.REAL);
  });

  it('should be created with currency', () => {
    const expectedCurrency = Currency.REAL;

    const money = new Money(100, expectedCurrency);

    expect(money.currency).to.be.equal(expectedCurrency);
  });

  [
    [1.699, 1.70],
    [2.759, 2.76],
    [10.659, 10.66],
    [1.6666666666666665, 1.67]
  ].forEach(([rawAmount, expectedRoundedAmount]) => {
    it(`should round values: ${rawAmount}, ${expectedRoundedAmount}`, () => {
      const money = new Money(rawAmount, Currency.REAL);

      expect(money.amount).to.be.equal(expectedRoundedAmount);
    });
  });

  [
    [2.35],
    [300.11],
    [55.99]
  ].forEach(([rawAmount]) => {
    it(`should not round values with less than 3 decimal places: ${rawAmount}`, () => {
      const money = new Money(rawAmount, Currency.REAL);

      expect(money.amount).to.be.equal(rawAmount);
    });
  });
});
