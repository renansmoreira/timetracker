import { expect } from 'chai';
import { DateRepresentation } from '../../src/domain/date-representation';

describe('Date representation', () => {

  it('should be created with the current unix timestamp', () => {
    const currentTimestamp = Date.now();

    const newDate = new DateRepresentation();

    expect(newDate.timestamp).to.be.closeTo(currentTimestamp, 5);
  });

  it('should be created with a specific timestamp', () => {
    const expectedTimestamp = Date.now();

    const newDate = new DateRepresentation(expectedTimestamp);

    expect(newDate.timestamp).to.be.equal(expectedTimestamp);
  });

  it('should subtract two dates', () => {
    const lowerDate = new DateRepresentation(1000);
    const higherDate = new DateRepresentation(1500);
    const expectedResultInMs = 500;

    const result = higherDate.minus(lowerDate);

    expect(result.timestamp).to.be.equal(expectedResultInMs);
  });

  it('should get timestamp in date format', () => {
    const timestamp = 1650247415;
    const expectedDate = new Date(2022, 4, 18, 2, 3, 35);

    const newDate = new DateRepresentation(timestamp);

    expect(newDate.date).to.be.equal(expectedDate);
  });
});
