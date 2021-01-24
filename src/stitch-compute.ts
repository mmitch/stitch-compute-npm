import { NumberFormatter } from "./number-formatter"

export class StitchCompute {
    private keepFormatter = new NumberFormatter('K%d');

    adjust(from: number, to: number): string {

        if (from === to) {
            return this.keep(from);
        }

        const max = 2*from;
        const min = Math.floor((from + 1) / 2);
        if (to > max) {
            throw new Error(`too many stitches to add - ${from} can grow to ${max} max`)
        }
        if (to < min) {
            throw new Error(`too few stitches to keep - ${from} can shrink to ${min} min`)
        }

        return '';
    }

    setFormatters(keep: NumberFormatter): void {
        this.keepFormatter = keep;
    }

    private keep(count: number): string {
        return this.keepFormatter.format(count);
    }

}