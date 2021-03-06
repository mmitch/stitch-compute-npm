/*
 * Copyright (C) 2021  Christian Garbs <mitch@cgarbs.de>
 * Licensed under GNU GPL v3 or later.
 *
 * This file is part of stitch-compute.
 *
 * stitch-compute is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * stitch-compute is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with stitch-compute.  If not, see <http://www.gnu.org/licenses/>.
 */

import { StitchCompute } from '../src/stitch-compute';
import { expect } from 'chai';
import { FormatterSet } from '../src/formatter-set';

describe('StitchCompute', () => {
  describe('same number of stitches', () => {
    it('should return K1 when staying at 1', () => {
      expect(new StitchCompute().adjustEvenly(1, 1)).to.equal('K1');
    });
    it('should return K50 when staying at 50', () => {
      expect(new StitchCompute().adjustEvenly(50, 50)).to.equal('K50');
    });
  });

  describe('adding stitches', () => {
    it('should calculate from 10 to 11', () => {
      expect(new StitchCompute().adjustEvenly(10, 11)).to.equal('K5 A1 K5');
    });
    it('should use repetition group from 10 to 20', () => {
      expect(new StitchCompute().adjustEvenly(10, 20)).to.equal('10x ( K1 A1 )');
    });
    it('should calculate from 70 to 112', () => {
      expect(new StitchCompute().adjustEvenly(70, 112)).to.equal('14x ( K1 A1 K1 A1 K2 A1 K1 )');
    });
  });

  describe('combining stitches', () => {
    it('should calculate from 53 to 48', () => {
      expect(new StitchCompute().adjustEvenly(10, 11)).to.equal('K5 A1 K5');
    });
    it('should use repetition group from 30 25', () => {
      expect(new StitchCompute().adjustEvenly(10, 20)).to.equal('10x ( K1 A1 )');
    });
    it('should calculate from 8 to 5', () => {
      expect(new StitchCompute().adjustEvenly(8, 5)).to.equal('K1 C2 K1 C1');
    });
    it('should calculate from 112 to 70', () => {
      expect(new StitchCompute().adjustEvenly(112, 70)).to.equal('14x ( K1 C2 K1 C1 )');
    });
    it('should calculate from 113 to 70', () => {
      expect(new StitchCompute().adjustEvenly(113, 70)).to.equal(
        'K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C2 K1 C1 K1 C2 K1 C1 K1 C2 K1 C1'
      );
    });
    it('should work for all combines', () => {
      expect(new StitchCompute().adjustEvenly(2, 1)).to.equal('C1');
    });
    it('should normalize correctly from 9 to 5', () => {
      expect(new StitchCompute().adjustEvenly(9, 5)).to.equal('C2 K1 C2');
    });
    it('should normalize correctly from 35 to 18', () => {
      expect(new StitchCompute().adjustEvenly(35, 18)).to.equal('C8 K1 C9');
    });
  });

  describe('sanity checks', () => {
    it('should not allow more than double the original stitches', () => {
      expect(() => {
        new StitchCompute().adjustEvenly(20, 41);
      }).to.throw(Error, /too many.*20 can grow to 40 max/);
    });
    it('should not allow fewer than half the original stitches', () => {
      expect(() => {
        new StitchCompute().adjustEvenly(29, 14);
      }).to.throw(Error, /too few.*29 can shrink to 15 min/);
    });
  });

  describe('internationalization', () => {
    it('should use alternative format strings', () => {
      const computer = new StitchCompute();
      const formatters: FormatterSet = {
        keepStitches: '[keep %d]',
        addStitches: '[add %d]',
        combineStitches: '[combine %d]',
        groupInstructions: '{{ %s }} times %d',
        listSeparator: ', '
      };

      computer.setFormatters(formatters);

      expect(computer.adjustEvenly(12, 13)).to.equal('[keep 6], [add 1], [keep 6]');
      expect(computer.adjustEvenly(14, 7)).to.equal('{{ [combine 1] }} times 7');
    });
    it('should not change undefined format strings (combination 1)', () => {
      const computer = new StitchCompute();
      const formatters: FormatterSet = {
        keepStitches: '[keep %d]',
        combineStitches: '[combine %d]',
        groupInstructions: '{{ %s }} times %d'
      } as FormatterSet;

      computer.setFormatters(formatters);

      expect(computer.adjustEvenly(12, 13)).to.equal('[keep 6] A1 [keep 6]');
      expect(computer.adjustEvenly(14, 7)).to.equal('{{ [combine 1] }} times 7');
    });
    it('should not change undefined format strings (combination 2)', () => {
      const computer = new StitchCompute();
      const formatters: FormatterSet = {
        addStitches: '[add %d]',
        listSeparator: ', '
      } as FormatterSet;

      computer.setFormatters(formatters);

      expect(computer.adjustEvenly(12, 13)).to.equal('K6, [add 1], K6');
      expect(computer.adjustEvenly(14, 7)).to.equal('7x ( C1 )');
    });
  });
});
