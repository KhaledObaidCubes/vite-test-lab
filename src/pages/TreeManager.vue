<script setup lang="ts">
import { defineAsyncComponent, reactive } from "vue"
import { TreeManagerWithCheckBox } from "../models/classes/TreeManagerWithCheckBox"

//const treeI = reactive(new TreeManager(treeGamma))
const treeI = reactive(
  new TreeManagerWithCheckBox({
    name: "root",
    idooo: "",
    checked: false,
    indeterminate: false,
    children: [],
  })
)

//----------------- create tree from json directly from data stored in demo-data.ts ---------------------

// const root = new TreeManager<MyDataType>(myRootData)
const child = new TreeManagerWithCheckBox({
  name: "a1",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})
const child2 = new TreeManagerWithCheckBox({
  name: "a2",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})
const child3 = new TreeManagerWithCheckBox({
  name: "a3",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})
const child4 = new TreeManagerWithCheckBox({
  name: "a4",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})
const child5 = new TreeManagerWithCheckBox({
  name: "a5",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})

const child6 = new TreeManagerWithCheckBox({
  name: "a6",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})
const child7 = new TreeManagerWithCheckBox({
  name: "a7",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})
const child8 = new TreeManagerWithCheckBox({
  name: "a8",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})
const child9 = new TreeManagerWithCheckBox({
  name: "a9",
  idooo: "",
  checked: false,
  indeterminate: false,
  children: [],
})

child.addNodeInstance(child2)
child.addNodeInstance(child3)
child.addNodeInstance(child4)
child.addNodeInstance(child5)
treeI.addNodeInstance(child)

child2.addNodeInstance(child6)
child2.addNodeInstance(child7)
child2.addNodeInstance(child8)
child2.addNodeInstance(child9)

const TreeComp = defineAsyncComponent(
  () => import("../components/generic-tree.vue")
)
</script>

<template>
  <h3>AS JSON</h3>
  <tree-comp :nodes="treeI" />

  <!-- <div>
    <pre>{{ treeI.toJSONFormat() }}</pre>
  </div> -->
</template>

<style scoped>
h3 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
}
</style>
