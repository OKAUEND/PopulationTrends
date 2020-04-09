import axios from "axios";
export default class {
  constructor(values = []) {
    this.RESAS_URL = "https://opendata.resas-portal.go.jp/api/v1/";
    this.RESAS_POP_API_PATH = "population/composition/perYear?prefCode=";
    this.RESAS_PREF_API_PATH = "prefectures";
    this.API_KEY = process.env.VUE_APP_apikey;
    this.Prefectures = values.length !== 0 ? values : [];
    this.isError = false;
    this.ErrorObject = {};
  }

  async fetchPopulations() {
    console.log(this.Prefectures);
    const result = await Promise.all(
      this.Prefectures.map(Prefecture => {
        return this._sendAsyncRESAS(
          `${this.RESAS_POP_API_PATH}${Prefecture.prefCode}`
        ).then(result => {
          console.log(result);
          const population = result.data.result.data[0].data.map(population => {
            return population.value;
          });
          return Promise.resolve({
            data: population,
            name: Prefecture.prefName,
            PrefCode: Prefecture.prefCode
          });
        });
      })
    )
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        window.console.error({ error });
        return;
      });

    //エラー時の場合はエラーオブジェクトを返す
    if (this.isError) {
      return this.ErrorObject;
    }

    //エラーが出ていない場合は返り値をそのまま上へ返す
    return result;
  }

  async fetchPrefectures() {
    const result = await this._sendAsyncRESAS(this.RESAS_PREF_API_PATH);

    //エラー時の場合はそのまま返す
    if (this.isError) {
      return result;
    }

    //エラーじゃない場合は不要なデータを除外し必要なデータだけの構造にして返す
    //エラー状態じゃないため、エラーかどうかのフラグだけを残すようにする
    const prefectures = result.data.result;
    return {
      isError: result.isError,
      prefectures: prefectures
    };
  }

  async fetchYears() {
    const result = await this._sendAsyncRESAS(`${this.RESAS_POP_API_PATH}1`);
    //エラー時の場合はそのまま返す
    if (this.isError) {
      return this.ErrorObject;
    }

    return result.data.result.data[0].data.map(data => {
      console.log(data.year);
      return data.year;
    });
  }

  async _sendAsyncRESAS(API_PATH) {
    return await axios
      .get(`${this.RESAS_URL}${API_PATH}`, {
        headers: { "X-API-KEY": this.API_KEY }
      })
      .then(response => {
        //エラーステータスチェックを行い、エラー画面へ遷移するかをチェックする
        if (response.status > 500) {
          return this._changeErrorStatus(response.status);
        } else if (
          response.data.statusCode === "403" ||
          response.data.statusCode === "404" ||
          response.data.statusCode === "429"
        ) {
          return this._changeErrorStatus(
            response.data.statusCode,
            response.data.message
          );
        }
        return { ...response, isError: false };
      })
      .catch(error => {
        window.console.error({ error });
      });
  }
  /*
    @param   {Number,String} status    - エラーステータス
  */
  _changeErrorStatus(status, message = "") {
    this.isError = true;
    this.ErrorObject = {
      isError: true,
      Status: status,
      Message: message
    };
  }
}
