<template>
  <div class="container">
    <h3 class="caption">
      <span @click="">{{ nodes?.data.name }}</span>
      <input
        v-if="nodes?.children.length"
        type="button"
        :value="expand ? '-' : '+'"
        @click="toggle"
      />
      <button
        @click="
          nodes?.addNodeToTarget(
            nodes,
            new TreeManager({
              name: 'a' + Math.floor(Math.random() * 1000),
              idooo: '',
              checked: false,
              indeterminate: false,
              children: [],
            })
          )
        "
      >
        ADD
      </button>
      <button
        v-if="!!nodes?.depth || !!nodes?.indexInParent"
        @click="nodes?.removeNode(nodes)"
      >
        DELETE
      </button>
      <button v-if="!!nodes?.depth || !!nodes?.indexInParent" @click="">
        <img src="../assets/icons/edit.png" alt="" width="10px" />
      </button>
      <input
        v-if="!!nodes?.depth"
        class="check-box"
        type="checkbox"
        id="ABC"
        name="ABC"
        value="ABC"
        :checked="nodes?.checked"
        :indeterminate="nodes.indeterminate"
        @change="nodes!.checkMe(!nodes?.checked)"
      />
      {{ nodes?.data.checked }}
    </h3>
    <child
      v-if="expand"
      v-for="(child, _index) in nodes?.children"
      :nodes="child"
      :key="_index"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRef } from "vue"
import { props as treeContent } from "./generic-tree"
import { TreeManager } from "../models/classes/TreeManager"

const props = defineProps(treeContent)
const nodes = toRef(props, "nodes")
const expand = ref(true)
const toggle = () => (expand.value = !expand.value)

const child = defineAsyncComponent(
  () => import("../components/generic-tree.vue")
)
</script>
<style scoped>
.container {
  margin: 10px 0 0 40px;
  text-align: justify;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: rgb(13, 31, 80);
}
h3,
h4 {
  margin: 0px;
}
.caption {
  border: 1px solid transparent;
}

.caption:hover {
  background: #272626;
  /* border: 1px solid #d0d0d0; */
}
input[type="checkbox"] {
  width: 22px;
  height: 22px;
  position: absolute;
  padding: 0;
  margin: 4px 0 0 0;
}

/* .check-box {
  font-size: 110%;
  display: inline;
  padding-top: 30px;
  margin-left: 10px;
} */
</style>
