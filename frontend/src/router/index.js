import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import SelectedItemsPage from "../components/SelectedItemsPage.vue";
import SettingServicesPage from "../components/SettingServicesPage.vue";
import Dashboard from "../components/UserDashboard.vue";
import DashPrueba from "../components/DashPrueba.vue"

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
    path: "/setting-services",
    name: "SettingServicesPage",
    component: SettingServicesPage,
  },
  { path: "/dashboard", name: "UserDashboard", component: Dashboard },
  { path: "/dash-prueba", name: "DashPrueba", component: DashPrueba },
  // Puedes añadir más rutas aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
