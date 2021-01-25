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

import { StringReplacer } from '../src/string-replacer';
import { expect } from 'chai';

describe('StringReplacer', () => {
  it('should replace %d by the given number', () => {
    expect(new StringReplacer().format('foo%d bar', 14)).to.equal('foo14 bar');
  });
  it('should replace %s by the given string', () => {
    expect(new StringReplacer().format('foo %sbar', 9, 'BAZ')).to.equal('foo BAZbar');
  });
  it('should replace both %d and %s when %d comes first', () => {
    expect(new StringReplacer().format('foo %d bar %s', 66, 'BARF')).to.equal('foo 66 bar BARF');
  });
  it('should replace both %d and %s when %s comes first', () => {
    expect(new StringReplacer().format('foo %s bar %d', 73, 'BALL')).to.equal('foo BALL bar 73');
  });
  it('should return the input unchanged if there are no placeholders', () => {
    expect(new StringReplacer().format('foo bar', 29, 'FOO')).to.equal('foo bar');
  });
  it('should only replace the first placeholder each', () => {
    expect(new StringReplacer().format('foo %s %s %d %d bar', 13, 'BAM')).to.equal('foo BAM %s 13 %d bar');
  });
  it('should allow placeholders in replacement string', () => {
    expect(new StringReplacer().format('%d frotz %s', 999, '%d %s foo')).to.equal('999 frotz %d %s foo');
  });
});
