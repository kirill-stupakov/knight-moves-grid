export default class Queue<T> {
  private arr: T[] = [];

  enqueue(element: T): void {
    this.arr.push(element);
  }

  dequeue(): T {
    let res = this.arr[0];
    this.arr.shift();

    return res;
  }

  isEmpty(): boolean {
    return this.arr.length === 0;
  }
}
