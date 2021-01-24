import { ListFormatter } from '../src/list-formatter';
import { expect } from 'chai';

describe('ListFormatter', () => {
  describe('formatting', () => {
    it('should return single element unchanged', () => {
      const formatter = new ListFormatter('unused');
      expect(formatter.format(['foo'])).to.equal('foo');
    });
    it('should insert delimiter between elements', () => {
      const formatter = new ListFormatter('::');
      expect(formatter.format(['one', 'two', 'three'])).to.equal('one::two::three');
    });
  });
});
