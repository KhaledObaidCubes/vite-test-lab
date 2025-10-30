<template>
  <div>
    <input v-model="localValue" @input="inputChanged" type="text" />
  </div>
</template>

<script setup lang="ts">
import { MirrorProps } from "./mirror";
import { ref } from "vue";
const props = defineProps(MirrorProps);
const localValue = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);
const inputChanged = () => {
  emit("update:modelValue", localValue.value);
};
</script>

<style scoped></style>
