import { NumberFormatter } from '../src/number-formatter';
import { expect } from 'chai';

describe('NumberFormatter', () => {
  describe('error conditions', () => {
    it('should throw an error if no %d is given', () => {
      expect(() => {
        new NumberFormatter('const');
      }).to.throw(Error, /exactly one.*but 0$/);
    });
    it('should throw an error if multiple %d are given', () => {
      expect(() => {
        new NumberFormatter('%d too much %d');
      }).to.throw(Error, /exactly one.*but 2$/);
    });
  });

  describe('formatting', () => {
    it('should insert given number into template', () => {
      expect(new NumberFormatter('foo%d bar').format(14)).to.equal('foo14 bar');
    });
  });
});
