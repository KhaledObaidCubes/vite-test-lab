<template>
  <div>
    <mirror v-model="mainValue" />
    {{ mainValue }}
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
const mainValue = ref("khaled");

const mirror = defineAsyncComponent(
  () => import("../components/mirror/mirror.vue")
);
</script>
