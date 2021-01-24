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
