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

  describe('adding stitches', () => {
    it('should calculate from 10 to 11', () => {
      expect(new StitchCompute().adjust(10, 11)).to.equal('K5 A1 K5');
    });
    it('should use repetition group from 10 to 20', () => {
      expect(new StitchCompute().adjust(10, 20)).to.equal('10x ( K1 A1 )');
    });
    it('should calculate from 70 to 112', () => {
      expect(new StitchCompute().adjust(70, 112)).to.equal('14x ( K1 A1 K1 A1 K2 A1 K1 )');
    });
  });

  describe('combining stitches', () => {
    it('should calculate from 53 to 48', () => {
      expect(new StitchCompute().adjust(10, 11)).to.equal('K5 A1 K5');
    });
    it('should use repetition group from 30 25', () => {
      expect(new StitchCompute().adjust(10, 20)).to.equal('10x ( K1 A1 )');
    });
    it('should calculate from 8 to 5', () => {
      expect(new StitchCompute().adjust(8, 5)).to.equal('K1 C2 K1 C1');
    });
    it('should calculate from 112 to 70', () => {
      expect(new StitchCompute().adjust(112, 70)).to.equal('14x ( K1 C2 K1 C1 )');
    });
    it('should calculate from 113 to 70', () => {
      expect(new StitchCompute().adjust(113, 70)).to.equal(
        'K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C1'
      );
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
