import Vue from "vue";
import Vuex from "vuex";

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
      if (state.ErrorStatus === 403) {
        return `${state.ErrorStatus} Forbidden`;
      } else if (state.ErrorStatus === 404) {
        return `${state.ErrorStatus} Not Found`;
      } else if (state.ErrorStatus === 429) {
        return `${state.ErrorStatus} Too Many Requests`;
      } else {
        //5xxエラーはコレを表示する
        return `5xx Server Error`;
      }
    },
    getErrorMessage: state => {
      console.log(state);
      if (state.ErrorStatus === 403 || state.ErrorStatus === 404) {
        return "お探しのページは見つかりませんでした。";
      } else if (state.ErrorStatus === 429) {
        return "アクセス制限回数に達しました。時間おき再度アクセスしてください。";
      } else {
        //5xxエラーはコレを表示する
        return "サーバーへアクセス出来ませんでした。再度時間をおきからアクセスしてください。";
      }
    }
  }
});
