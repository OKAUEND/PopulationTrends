import axios from "axios";
export default class {
  constructor(values = []) {
    this.RESAS_URL = "https://opendata.resas-portal.go.jp/api/v1/";
    this.RESAS_POP_API_PATH = "population/composition/perYear?prefCode=";
    this.RESAS_PREF_API_PATH = "prefectures";
    this.API_KEY = process.env.VUE_APP_apikey;
    this.Prefectures = values.size === 0 ? values : [];
    this.ErrorStack = new Error();
  }

  async fetchPopulations() {
  }

  async fetchPrefectures() {
  }

  async fetchYears() {
  }

  async _sendAsyncRESAS(API_PATH) {
  }
  /*
    @param   {Number,String} status    - エラーステータス
    @return  {Object}                  - エラーオブジェクト
  */
  _createErrorObject(status, message = "") {
}
