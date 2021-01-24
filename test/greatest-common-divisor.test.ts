import { greatestCommonDivisor } from '../src/greatest-common-divisor';
import { expect } from 'chai';

describe('greatestCommonDivisor()', () => {
  it('should return 1 for input (1, 1)', () => {
    expect(greatestCommonDivisor(1, 1)).to.equal(1);
  });
  it('should return 1 for input (5, 3)', () => {
    expect(greatestCommonDivisor(5, 3)).to.equal(1);
  });
  it('should return 1 for input (3, 5)', () => {
    expect(greatestCommonDivisor(3, 5)).to.equal(1);
  });
  it('should return 5 for input (15, 5)', () => {
    expect(greatestCommonDivisor(15, 5)).to.equal(5);
  });
  it('should return 25 for input (25, 75)', () => {
    expect(greatestCommonDivisor(25, 75)).to.equal(25);
  });
  it('should return 68 for input (476, 612)', () => {
    expect(greatestCommonDivisor(476, 612)).to.equal(68);
  });
});
