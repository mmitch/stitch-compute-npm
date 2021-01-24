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

import { format } from 'util';

export class GroupFormatter {
  private order: ParameterOrder;

  constructor(private template: string) {
    this.check(template);
    this.order = this.determineOrder(template);
  }

  format(repetitions: number, content: string): string {
    switch (this.order) {
      case ParameterOrder.NumberThenString:
        return format(this.template, repetitions, content);
      case ParameterOrder.StringThenNumber:
        return format(this.template, content, repetitions);
    }
  }

  private check(format: string) {
    const numCount = (format.match(/%d/g) || []).length;
    const stringCount = (format.match(/%s/g) || []).length;

    if (numCount !== 1) {
      throw new Error('formatter does not contain exactly one %d placeholder, but ' + numCount);
    }
    if (stringCount !== 1) {
      throw new Error('formatter does not contain exactly one %s placeholder, but ' + stringCount);
    }
  }

  private determineOrder(format: string): ParameterOrder {
    if (format.indexOf('%d') < format.indexOf('%s')) {
      return ParameterOrder.NumberThenString;
    }
    return ParameterOrder.StringThenNumber;
  }
}

enum ParameterOrder {
  NumberThenString,
  StringThenNumber
}
