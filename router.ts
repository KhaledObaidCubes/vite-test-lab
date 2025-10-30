import { createRouter, createWebHashHistory } from "vue-router";

import UsersList from "./src/app/presentation/pages/users-list.vue";
import CreateUser from "./src/app/presentation/pages/create-user.vue";
import EditUser from "./src/app/presentation/pages/edit-user.vue";
import UserInfo from "./src/app/presentation/pages/user-details.vue";
import Example from "./src/app/presentation/pages/emit-provide-example.vue";

const routes = [
  { path: "/", name: "View Users", component: UsersList },
  {
    path: "/create-user",
    name: "New User",
    component: CreateUser,
  },
  {
    path: "/example",
    name: "Example",
    component: Example,
  },
  {
    path: "/edit-user",
    name: "Edit User",
    component: EditUser,
  },
  {
    path: "/user-info",
    name: "User Info",
    component: UserInfo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
