import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import SelectedItemsPage from "../components/SelectedItemsPage.vue";
import SettingIntegrationsPage from "../components/SettingIntegrationsPage.vue";
import DashPrueba from "../components/DashPrueba.vue"
import DashTest from "../components/DashTest.vue"

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
  // Puedes añadir más rutas aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
