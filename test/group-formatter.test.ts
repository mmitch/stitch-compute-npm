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

import { GroupFormatter } from '../src/group-formatter';
import { expect } from 'chai';

describe('GroupFormatter', () => {
  describe('error conditions', () => {
    it('should throw an error if no %d is given', () => {
      expect(() => {
        new GroupFormatter('only %s');
      }).to.throw(Error, /exactly one %d.*but 0$/);
    });
    it('should throw an error if multiple %d are given', () => {
      expect(() => {
        new GroupFormatter('%d too much %d (and one %s)');
      }).to.throw(Error, /exactly one %d.*but 2$/);
    });
    it('should throw an error if no %s is given', () => {
      expect(() => {
        new GroupFormatter('only %d');
      }).to.throw(Error, /exactly one %s.*but 0$/);
    });
    it('should throw an error if multiple %s are given', () => {
      expect(() => {
        new GroupFormatter('%s too much %s (and one %d)');
      }).to.throw(Error, /exactly one %s.*but 2$/);
    });
  });

  describe('formatting', () => {
    it('should fill placeholders when the number comes first', () => {
      const formatter = new GroupFormatter('%d times ( %s )');
      expect(formatter.format(14, 'foo bar')).to.equal('14 times ( foo bar )');
    });
    it('should fill placeholders when the number comes last', () => {
      const formatter = new GroupFormatter('[%s] X %d');
      expect(formatter.format(7, 'one,two,three')).to.equal('[one,two,three] X 7');
    });
  });
});
