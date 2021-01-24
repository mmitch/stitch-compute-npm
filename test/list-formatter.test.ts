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
