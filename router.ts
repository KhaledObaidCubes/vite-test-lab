import { createRouter, createWebHashHistory } from "vue-router";

import UsersList from "./src/app/presentation/pages/users-list.vue";
import CreateUser from "./src/app/presentation/pages/create-user.vue";
import EditUser from "./src/app/presentation/pages/edit-user.vue";

const routes = [
  { path: "/", name: "View USERS", component: UsersList },
  { path: "/create-user", name: "New user", component: CreateUser },
  { path: "/edit-user", name: "Edit user", component: EditUser },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
