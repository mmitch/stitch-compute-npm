import { format } from "util";

export class NumberFormatter {
    constructor(private template: string) {
        this.check(template);
    }

    format(value: number): string {
        return format(this.template, value);
    }

    private check(format: string) {
        const count = (format.match(/%d/g) || []).length;
        if (count !== 1) {
            throw new Error('formatter does not contain exactly one %d placeholder, but ' + count);
        }
    }
}