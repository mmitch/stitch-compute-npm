export class ListFormatter {
  constructor(private delimiter: string) {}

  format(elements: string[]): string {
    return elements.join(this.delimiter);
  }
}
