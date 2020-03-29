import Vue from "vue";
import Vuex from "vuex";
import message from "@/assets/message.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ErrorStatus: 403
  },
  mutations: {
    setErrorState(state, value) {
      state.ErrorStatus = Number(value);
    }
  },
  actions: {
    setErrorState({ commit }, event) {
      commit("setErrorState", event);
    }
  },
  getters: {
    getErrorStatus: state => {
      switch (state.ErrorStatus) {
        case 403:
          return `${state.ErrorStatus} Forbidden`;
        case 404:
          return `${state.ErrorStatus} Not Found`;
        case 429:
          return `${state.ErrorStatus} Too Many Requests`;
        default:
          //5xxエラーはコレを表示する
          return `5xx Server Error`;
      }
    },
    getErrorMessage: state => {
      switch (state.ErrorStatus) {
        case 403 || 404:
          return message.Status403And404;
        case 429:
          return message.Status429;
        default:
          //5xxエラーはコレを表示する
          return message.Status5xx;
      }
    }
  }
});
