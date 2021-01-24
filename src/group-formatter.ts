import { format } from 'util';

export class GroupFormatter {
  private order: ParameterOrder;

  constructor(private template: string, private delimiter: string) {
    this.check(template);
    this.order = this.determineOrder(template);
  }

  format(value: number, elements: string[]): string {
    const joinedElements = elements.join(this.delimiter);

    switch (this.order) {
      case ParameterOrder.NumberThenString:
        return format(this.template, value, joinedElements);
      case ParameterOrder.StringThenNumber:
        return format(this.template, joinedElements, value);
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
