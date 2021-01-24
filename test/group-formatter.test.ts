import { GroupFormatter } from '../src/group-formatter';
import { expect } from 'chai';

describe('GroupFormatter', () => {
  describe('error conditions', () => {
    it('should throw an error if no %d is given', () => {
      expect(() => {
        new GroupFormatter('only %s', ',');
      }).to.throw(Error, /exactly one %d.*but 0$/);
    });
    it('should throw an error if multiple %d are given', () => {
      expect(() => {
        new GroupFormatter('%d too much %d (and one %s)', ',');
      }).to.throw(Error, /exactly one %d.*but 2$/);
    });
    it('should throw an error if no %s is given', () => {
      expect(() => {
        new GroupFormatter('only %d', ',');
      }).to.throw(Error, /exactly one %s.*but 0$/);
    });
    it('should throw an error if multiple %s are given', () => {
      expect(() => {
        new GroupFormatter('%s too much %s (and one %d)', ',');
      }).to.throw(Error, /exactly one %s.*but 2$/);
    });
  });

  describe('formatting', () => {
    it('should fill placeholders when the number comes first', () => {
      const formatter = new GroupFormatter('%d times ( %s )', ' ');
      expect(formatter.format(14, ['a', 'b'])).to.equal('14 times ( a b )');
    });
    it('should fill placeholders when the number comes last', () => {
      const formatter = new GroupFormatter('[%s] X %d', ':');
      expect(formatter.format(7, ['one', 'two', 'three'])).to.equal('[one:two:three] X 7');
    });
  });
});
