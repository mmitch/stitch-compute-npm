import { format } from "util";
import { NumberFormatter } from "./number-formatter";

export class StitchCompute {
    private keepFormatter = new NumberFormatter('K%d');

    adjust(from: number, to: number): string {

        if (from === to) {
            return this.keep(from);
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