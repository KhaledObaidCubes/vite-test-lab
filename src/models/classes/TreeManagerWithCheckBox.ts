import type { ITreeManager } from "../interfaces/i-treeManager"
import type { TCheckedTree } from "../interfaces/i-types"
import { TreeManager } from "./TreeManager"

export class TreeManagerWithCheckBox<
  T extends TCheckedTree
> extends TreeManager<T> {
  /**
   *
   */
  constructor(data: ITreeManager<T>) {
    super(data)
  }

  public get indeterminate(): boolean {
    if (!this.children.length) return false
    this.data.indeterminate =
      this.children.some((c: any) => c.indeterminate) ||
      (this.children.some((c: any) => c.data.checked) &&
        this.children.filter((c: any) => c.data.checked).length !=
          this.children.length)

    return this.data.indeterminate
  }

  public get checked(): boolean {
    if (!this.children.length) return this.data.checked
    this.data.checked =
      this.data.checked ||
      (this.children?.every((c: any) => c.checked) && !this.data.indeterminate)
    return this.data.checked
  }

  checkMe(checked: boolean) {
    this.data.checked = checked
    this.children.forEach((c: any) => c.checkMe(checked))
  }

  // public get indeterminate(): boolean {
  //   if (!this.children.length) return false
  //   const i = this.children.some((c: any) => c.indeterminate) || (this.children.some((c: any) => c.checked) && this.children.filter((c: any) => c.checked).length != this.children.length)
  //   this.data.indeterminate = i
  //   return i
  // }

  // public get checked(): boolean {
  //   if (!this.children.length) return this.data.checked
  //   const c = this.data.checked || this.children?.every((c: any) => c.checked)
  //   this.data.checked = c && !this.data.indeterminate
  //   return c
  // }

  // checkMe(checked: boolean) {
  //   this.data.checked = checked
  //   this.children.forEach((c: any) => c.checkMe(checked))
  // }

  // checkBoxController(node: any) {
  //   node.data.checked = !node.data.checked
  //   const allChecked = node.parent?.children.every((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)
  //   const someChecked = node.parent?.children.some((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)
  //   node.parent.data.checked = allChecked
  //   node.parent.data.indeterminate = someChecked && !allChecked
  //   function checkSubChildren(node: any) {
  //     node.data.checked ? node.children.map((child: any) => (child.data.checked = true)) : node.children.map((child: any) => (child.data.checked = false))
  //     node.children.map((x: any) => {
  //       if (!!x.children.length) checkSubChildren(x)
  //     })
  //   }
  //   checkSubChildren(node)

  //   function sayParentNAme(node: any | undefined) {
  //     if (node.parent == undefined) return
  //     if (!!node.children.length) console.log(`${node.data.name} has ${node.children.length} children`)
  //     const AllChildrenInParentChecked = node.children.every((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)
  //     const someChildrenInParentChecked = node.children.some((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)

  //     node.parent.data.checked = AllChildrenInParentChecked
  //     node.parent.data.indeterminate = someChildrenInParentChecked && !AllChildrenInParentChecked

  //     sayParentNAme(node.parent)
  //   }
  //   sayParentNAme(node.parent)
  //   // debugger
  // }
}
