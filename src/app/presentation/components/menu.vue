<template>
  <nav>
    <div
      v-for="item in $router.getRoutes()"
      class="menu-item"
      :class="{
        'active-item': $route.fullPath === item.path,
        'none-active-item': $route.fullPath != item.path,
      }"
    >
      <RouterLink :to="item.path">{{ item.name }}</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.menu-item {
  float: left;
  margin-left: 20px;
}
.active-item a {
  color: coral !important;
}
.none-active-item a {
  color: rgb(255, 255, 255);
}
</style>
