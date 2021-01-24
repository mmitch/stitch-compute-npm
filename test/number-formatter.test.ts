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
