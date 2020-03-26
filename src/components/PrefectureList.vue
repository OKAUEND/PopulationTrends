<template>
  <article class="PrefectureList">
    <ul>
      都道府県
      <li v-for="(prefecture, prefCode) in prefectures" :key="prefCode">
        <input
          type="checkbox"
          :value="prefecture"
          :id="prefCode"
          v-model="checkprefectures"
          @change="checkemit"
        />
        <label :for="prefCode">
          {{ prefecture.prefName }}
        </label>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "PrefectureList",
  data() {
    return {
      prefectures: [],
      checkprefectures: []
    };
  },
  async mounted() {
    this.prefectures = await this.axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.VUE_APP_apikey }
      })
      .then(prefectures => {
        console.log(prefectures);
        return prefectures.data.result;
      })
      .catch(error => {
        //レスポンスエラーなら別画面へ遷移して500エラーにするかも
        console.error({ error });
        alert({ error });
      });
  },
  methods: {
    checkemit() {
      return this.$emit("change", this.checkprefectures);
    }
  }
};
</script>

<style scoped lang="scss"></style>
