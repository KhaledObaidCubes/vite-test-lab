<template>
  {{ selected }}
  <div class="container">
    <div v-if="showSpinner"><Spinner /></div>
    <div v-if="!users?.total">NO Data</div>
    <div v-if="!showSpinner&& !!users!.data.length">
      <div class="flex items-center gap-3 p-2 border-b">
        <input
          type="checkbox"
          v-model="allSelected"
          @change="toggleAll"
          :indeterminate="selectAllIndeterminate"
        />
        <select v-model="action" @change="handleAction" id="bulk-action">
          <option value="SelectOption">More Options</option>
          <option value="SelectAll">Select all</option>
          <option value="DeselectAll">Deselect all</option>
          <hr />
          <option value="Delete">Delete</option>
        </select>
      </div>
      <div
        v-for="(user,index ) in users!.data"
        :key="user.id"
        class="flex items-center gap-3 p-2 border-b"
        :class="{ 'blue-bg': index % 2 == 0 }"
      >
        <div class="left-column">
          <!-- checkbox -->
          <input
            type="checkbox"
            v-model="selected"
            :value="user.id"
            @change="updateSelected"
          />

          <!-- full name -->
          <span class="font-medium">
            {{ user.firstName }} {{ user.lastName }}
          </span>

          <!-- age -->
          <span class="text-gray-500"> ({{ user.age }} years) </span>
        </div>
        <div class="actions">
          <a href="">edit</a>
          <a href="">delete</a>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button @click="main('back')" :disabled="pageIndex == 1">Back</button>
    <button
      @click="main('next')"
      :disabled="Math.ceil(users?.total!/limit)==pageIndex"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { fetchPersons } from "../../domain/classes/service-mocker";
import type { TData } from "../../domain/contract/i-types";

const users = ref<TData>();

const limit: number = 10; //items per page
var pageIndex: number = 0;
var showSpinner: boolean = false;

const selected = ref<string[]>([]); // holds selected IDs
const allSelected = ref(false); // checkbox in header
const action = ref("SelectOption"); // dropdown action
const selectAllIndeterminate = ref(false);

async function main(step: string = "next") {
  showSpinner = true;
  setPageIndex(step);
  const result: any = await fetchPersons(pageIndex, limit); //fetchPersons(pageIndex, limit);
  users.value = result;
  showSpinner = false;

  // reset selections when page changes
  selected.value = [];
  allSelected.value = false;
  selectAllIndeterminate.value = false;

  return result;
}

const setPageIndex = (direction: string) => {
  if (direction === "next") {
    pageIndex += 1;
  } else {
    if (pageIndex != 1) pageIndex -= 1;
  }
};

// toggle all from header checkbox
function toggleAll() {
  if (allSelected.value) {
    selected.value = users.value?.data.map((u) => u.id) ?? [];
  } else {
    selected.value = [];
  }
}

// handle dropdown actions
function handleAction() {
  if (action.value === "SelectAll") {
    selected.value = users.value?.data.map((u) => u.id) ?? [];
    allSelected.value = true;
  } else if (action.value === "DeselectAll") {
    selected.value = [];
    allSelected.value = false;
  } else if (action.value === "delete") {
    //delete function from here
    console.log("Delete selected users:", selected.value);
  }
  updateSelected();
  action.value = "SelectOption";
}

const updateSelected = () => {
  if (selected.value.length > 0 && selected.value.length < limit) {
    selectAllIndeterminate.value = true;
  } else if (selected.value.length == limit) {
    selectAllIndeterminate.value = false;
    allSelected.value = true;
  } else {
    selectAllIndeterminate.value = false;
    allSelected.value = false;
  }
};

main();

const Spinner = defineAsyncComponent(() => import("../components/spinner.vue"));
</script>

<style scoped>
.container {
  width: 100%;
  height: 320px;
}
.items-center {
  width: 100%;
  text-align: left;
  height: 28px;
}
button {
  margin-left: 15px;
}
.actions {
  float: right;
  width: 20%;
}
.actions a {
  margin-right: 30px;
  float: right;
  font-size: 14px;
}
.left-column {
  float: left;
  width: 80%;
}
.blue-bg {
  background-color: rgb(60, 63, 63);
}
</style>
