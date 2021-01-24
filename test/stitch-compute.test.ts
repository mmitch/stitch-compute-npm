import { StitchCompute } from '../src/stitch-compute';
import { expect } from 'chai';
import { NumberFormatter } from '../src/number-formatter';

describe('StitchCompute', () => {
  describe('same number of stitches', () => {
    it('should return K1 when staying at 1', () => {
      expect(new StitchCompute().adjust(1, 1)).to.equal('K1');
    });
    it('should return K50 when staying at 50', () => {
      expect(new StitchCompute().adjust(50, 50)).to.equal('K50');
    });
  });

  describe('sanity checks', () => {
    it('should not allow more than double the original stitches', () => {
      expect(() => {
        new StitchCompute().adjust(20, 41);
      }).to.throw(Error, /too many.*20 can grow to 40 max/);
    });
    it('should not allow fewer than half the original stitches', () => {
      expect(() => {
        new StitchCompute().adjust(29, 14);
      }).to.throw(Error, /too few.*29 can shrink to 15 min/);
    });
  });

  describe('internationalization', () => {
    it('should use alternative format strings', () => {
      const computer = new StitchCompute();
      computer.setFormatters(new NumberFormatter('[keep %d]'));
      expect(computer.adjust(12, 12)).to.equal('[keep 12]');
    });
  });
});
