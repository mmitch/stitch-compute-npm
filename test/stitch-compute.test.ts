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

    describe('internationalization', () => {
        it('should use alternative format strings', () => {
            const computer = new StitchCompute();
            computer.setFormatters(new NumberFormatter('[keep %d]'));
            expect(computer.adjust(12, 12)).to.equal('[keep 12]');
        });
    })
})