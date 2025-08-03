import type { IList } from "../contract/i-list";
import type { listItem } from "../contract/listItem";
import { Triangle } from "./triangle";
export class List implements IList {
  data: listItem[];
  constructor(data: listItem[]) {
    this.data = data;
  }
  renderNestedDivs(obj: listItem[]): string {
    return obj
      .map((item) => {
        const content = `<div>${item.name}`;
        const children = item.children
          ? this.renderNestedDivs(item.children)
          : "";
        return `${content}${children}</div>`;
      })
      .join("");
  }
  htmlText(): string {
    return this.renderNestedDivs(this.data);
  }
  doSomethingWithTri(height: number, width: number): number {
    const tri = new Triangle(height, width);
    return tri.area() * 2;
  }
}
