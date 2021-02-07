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

import { FormatterSet } from './formatter-set';
import { greatestCommonDivisor } from './greatest-common-divisor';
import { GroupFormatter } from './group-formatter';
import { ListFormatter } from './list-formatter';
import { NumberFormatter } from './number-formatter';

export { FormatterSet } from './formatter-set';

export class StitchCompute {
  private keepFormatter = new NumberFormatter('K%d');
  private addFormatter = new NumberFormatter('A%d');
  private combineFormatter = new NumberFormatter('C%d');
  private groupFormatter = new GroupFormatter('%dx ( %s )');
  private listFormatter = new ListFormatter(' ');

  adjust_evenly(from: number, to: number): string {
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
      const actions = this.calculateActions(to, from);
      this.combineActions(actions);
      this.normalizeActions(actions);
      const elements = this.formatActions(actions);
      return this.listFormatter.format(elements);
    }
  }

  setFormatters(formatters: FormatterSet): void {
    if (this.isSet(formatters.keepStitches)) {
      this.keepFormatter = new NumberFormatter(formatters.keepStitches);
    }
    if (this.isSet(formatters.addStitches)) {
      this.addFormatter = new NumberFormatter(formatters.addStitches);
    }
    if (this.isSet(formatters.combineStitches)) {
      this.combineFormatter = new NumberFormatter(formatters.combineStitches);
    }
    if (this.isSet(formatters.groupInstructions)) {
      this.groupFormatter = new GroupFormatter(formatters.groupInstructions);
    }
    if (this.isSet(formatters.listSeparator)) {
      this.listFormatter = new ListFormatter(formatters.listSeparator);
    }
  }

  isSet(string: string): boolean {
    return string != undefined && string != null;
  }

  private calculateActions(to: number, from: number): Action[] {
    const actions: Action[] = [];
    const grow = to > from;
    const shrink = to < from;
    const allshrink = to * 2 == from;
    let oldpos = 0;
    let newpos = 0.0;
    while (oldpos < from || newpos < to) {
      const diff = oldpos - (newpos / to) * from;

      if (allshrink || (diff < 0 && shrink)) {
        actions.push(new Action(Type.Combine));
        oldpos += 2;
        newpos++;
      } else if (diff > 0 && grow) {
        actions.push(new Action(Type.Add));
        newpos++;
      } else {
        actions.push(new Action(Type.Keep));
        oldpos++;
        newpos++;
      }
    }
    return actions;
  }

  private normalizeActions(actions: Action[]): void {
    if (actions.length < 2) {
      return;
    }

    const first = actions[0];
    const last = actions[actions.length - 1];

    if (first.type === last.type) {
      this.equalizeActionCounts(first, last);
    } else if (first.count === 1 && last.count > 1) {
      this.moveHalfOfLastActionToFront(actions);
    }
  }

  private equalizeActionCounts(first: Action, last: Action) {
    const diff = Math.floor((first.count - last.count) / 2);
    first.count -= diff;
    last.count += diff;
  }

  private moveHalfOfLastActionToFront(actions: Action[]) {
    const last = actions[actions.length - 1];
    const toMove = Math.floor(last.count / 2);
    const extraAction = { ...last };
    last.count -= toMove;
    extraAction.count = toMove;
    actions.unshift(extraAction);
  }

  private combineActions(actions: Action[]): void {
    let lastType: Type | null = null;
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
      switch (type) {
        case Type.Keep:
          return this.keepFormatter.format(count);

        case Type.Combine:
          return this.combineFormatter.format(count);

        case Type.Add:
          return this.addFormatter.format(count);
      }
    });
  }

  private keep(count: number): string {
    return this.keepFormatter.format(count);
  }
}

enum Type {
  Keep,
  Combine,
  Add
}

class Action {
  readonly type: Type;
  count = 1;
  constructor(type: Type) {
    this.type = type;
  }
}
