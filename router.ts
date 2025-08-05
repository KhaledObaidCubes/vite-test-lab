import { createRouter, createWebHashHistory } from "vue-router";

import GenericConcept from "./src/app/presentation/pages/TreeManager.vue";

const routes = [{ path: "/", name: "Generic Tree", component: GenericConcept }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
