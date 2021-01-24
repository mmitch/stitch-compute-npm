import { NumberFormatter } from '../src/number-formatter';
import { expect } from 'chai';

describe('NumberFormatter', () => {
  describe('error conditions', () => {
    it('should throw an error if no %d is given', () => {
      expect(() => {
        new NumberFormatter('const');
      }).to.throw(Error, /exactly one %d.*but 0$/);
    });
    it('should throw an error if multiple %d are given', () => {
      expect(() => {
        new NumberFormatter('%d too much %d');
      }).to.throw(Error, /exactly one %d.*but 2$/);
    });
  });

  describe('formatting', () => {
    it('should fill placeholder', () => {
      const formatter = new NumberFormatter('foo%d bar');
      expect(formatter.format(14)).to.equal('foo14 bar');
    });
  });
});
