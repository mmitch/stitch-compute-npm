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

import { StringReplacer } from './string-replacer';

export class NumberFormatter {
  private readonly replacer = new StringReplacer();

  constructor(private template: string) {
    this.check(template);
  }

  format(value: number): string {
    return this.replacer.format(this.template, value);
  }

  private check(format: string) {
    const count = (format.match(/%d/g) || []).length;
    if (count !== 1) {
      throw new Error('formatter does not contain exactly one %d placeholder, but ' + count);
    }
  }
}
