import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import SelectedItemsPage from "../components/SelectedItemsPage.vue";
import SettingIntegrationsPage from "../components/SettingIntegrationsPage.vue";
import DashPrueba from "../components/DashPrueba.vue"
import DashTest from "../components/DashTest.vue"
import RegisterPage from "../components/RegisterPage.vue"
import LoginPage from "../components/LoginPage.vue"

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/selected-items",
    name: "SelectedItemsPage",
    component: SelectedItemsPage,
  },
  {
    path: "/setting-integrations",
    name: "SettingIntegrationsPage",
    component: SettingIntegrationsPage,
  },
  { path: "/dash-prueba", name: "DashPrueba", component: DashPrueba },
  { path: "/dash-test", name: "DashTest", component: DashTest },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;