import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import SelectedItemsPage from "../Connectors/Pages/SelectedItemsPage.vue";
import SettingIntegrationsPage from "../Connectors/Pages/SettingIntegrationsPage.vue";
import DashPrueba from "../Dashboard/Pages/DashPrueba.vue";
import DashTest from "../Dashboard/Pages/DashTest.vue";
import RegisterPage from "../components/RegisterPage.vue";
import LoginPage from "../components/LoginPage.vue";

import DashboardA from "../Dashboard/Pages/DashboardA.vue";

import ManageConnectors from "@/Connectors/Pages/ManageConnectors.vue";
import CreateConnector from "@/Connectors/Pages/CreateConnector.vue";

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
  { path: "/dashboard-a", name: "DashboardA", component: DashboardA },
  { path: "/dash-test", name: "DashTest", component: DashTest },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
  {
    path: "/manage-connectors",
    name: "ManageConnectors",
    component: ManageConnectors,
  },
  {
    path: "/create-connector",
    name: "CreateConnector",
    component: CreateConnector,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
