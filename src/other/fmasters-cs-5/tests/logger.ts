// Just a test class to collect value while traversing
export class Logger<T> {
  values: T[];
  constructor() {
    this.values = [];
    this.log = this.log.bind(this);
  }
  log(value: T): void {
    this.values.push(value);
  }
  clear(): void {
    this.values = [];
  }
}
