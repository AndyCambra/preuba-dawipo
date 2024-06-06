import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedApis: [], // Almacena las API(s) seleccionada(s)
  },
  mutations: {
    updateSelectedApis(state, selectedApis) {
      state.selectedApis = selectedApis;
    },
  },
});
