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

import { greatestCommonDivisor } from './greatest-common-divisor';
import { GroupFormatter } from './group-formatter';
import { ListFormatter } from './list-formatter';
import { NumberFormatter } from './number-formatter';

export class StitchCompute {
  private keepFormatter = new NumberFormatter('K%d');
  private addFormatter = new NumberFormatter('A%d');
  private combineFormatter = new NumberFormatter('C%d');
  private groupFormatter = new GroupFormatter('%dx ( %s )');
  private listFormatter = new ListFormatter(' ');

  adjust(from: number, to: number): string {
    if (from === to) {
      return this.keep(from);
    }

    const max = 2 * from;
    const min = Math.floor((from + 1) / 2);
    if (to > max) {
      throw new Error(`too many stitches to add - ${from} can grow to ${max} max`);
    }
    if (to < min) {
      throw new Error(`too few stitches to keep - ${from} can shrink to ${min} min`);
    }

    const repetitions = greatestCommonDivisor(from, to);
    if (repetitions > 1) {
      const group = this.adjust_evenly(from / repetitions, to / repetitions);
      return this.groupFormatter.format(repetitions, group);
    } else {
      return this.adjust_evenly(from, to);
    }
  }

  setFormatters(keep: NumberFormatter): void {
    this.keepFormatter = keep;
  }

  private adjust_evenly(from: number, to: number): string {
    const actions = this.calculateActions(to, from);
    this.combineActions(actions);
    this.normalizeActions(actions);
    const elements = this.formatActions(actions);
    return this.listFormatter.format(elements);
  }

  private calculateActions(to: number, from: number): Action[] {
    const actions: Action[] = [];
    const grow = to > from;
    const shrink = to < from;
    let oldpos = 0;
    let newpos = 0.0;
    while (oldpos < from || newpos < to) {
      const diff = oldpos - (newpos / to) * from;

      if (diff < 0 && shrink) {
        actions.push({ type: 'C', count: 1 });
        oldpos += 2;
        newpos++;
      } else if (diff > 0 && grow) {
        actions.push({ type: 'A', count: 1 });
        newpos++;
      } else {
        actions.push({ type: 'K', count: 1 });
        oldpos++;
        newpos++;
      }
    }
    return actions;
  }

  private normalizeActions(actions: Action[]): void {
    if (actions.length < 3) {
      return;
    }
    const first = actions[0];
    const last = actions[actions.length - 1];
    if (first.type !== last.type) {
      return;
    }

    const diff = Math.floor((first.count - last.count) / 2);
    first.count -= diff;
    last.count += diff;
  }

  private combineActions(actions: Action[]): void {
    let lastType = '';
    let pos = 0;
    while (pos < actions.length) {
      const current = actions[pos];
      if (lastType === current.type) {
        actions[pos - 1].count++;
        actions.splice(pos, 1);
      } else {
        lastType = current.type;
        pos++;
      }
    }
  }

  private formatActions(actions: Action[]): string[] {
    return actions.map((action) => {
      const count = action.count;
      const type = action.type;
      if (type === 'K') {
        return this.keepFormatter.format(count);
      } else if (type === 'C') {
        return this.combineFormatter.format(count);
      } else if (type === 'A') {
        return this.addFormatter.format(count);
      } else {
        throw new Error(`unknown action type ${type}`);
      }
    });
  }

  private keep(count: number): string {
    return this.keepFormatter.format(count);
  }
}

class Action {
  type = '';
  count = 0;
}
