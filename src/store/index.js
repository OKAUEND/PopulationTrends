import Vue from "vue";
import Vuex from "vuex";
import message from "@/assets/message.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ErrorStatus: 403,
    Populations: []
  },
  mutations: {
    /*
      @param   {Object} state    - VuexのState
      @param   {Number,String} value    - エラーレスポンス番号
    */
    setErrorState(state, value) {
      state.ErrorStatus = Number(value);
    },
    /*
      @param   {Object} state    - VuexのState
      @param   {Array}  value    - RESASより取得した都道府県別人口推移の配列
    */
    setPopulations(state, value) {
      state.Populations = value;
    }
  },
  actions: {
    /*
      @param   {commit} commit          - commitイベント
      @param   {Number,String} event    - エラーレスポンス番号
    */
    setErrorState({ commit }, event) {
      commit("setErrorState", event);
    },
    /*
      @param   {commit} commit          - commitイベント
      @param   {Array}  value    - RESASより取得した都道府県別人口推移の配列
    */
    setPopulations({ commit }, event) {
      commit("setPopulations", event);
    }
  },
  getters: {
    /*
      @param   {Object} state      - VuexのState
      @return  {String}            - エラーのタイトル名
    */
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
    /*
      @param   {Object} state      - VuexのState
      @return  {String}            - エラーメッセージ
    */
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
    },
    /*
      @param   {Object} state      - VuexのState
      @return  {Array}             - キャッシュ中の人口推移配列の都道府県番号配列
    */
    getPopulationsPrefCode: state => {
      return state.Populations.map(Population => {
        return Population.PrefCode;
      });
    },
    /*
    @param   {Object} state      - VuexのState
    @return  {Array}             - キャッシュ中の人口推移配列
  */
    getPopulations: state => {
      return state.Populations;
    }
  }
});
