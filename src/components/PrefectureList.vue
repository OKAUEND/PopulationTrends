<template>
  <article class="Prefectures">
    都道府県
    <div class="Prefectures__Container">
      <ul class="Prefectures__PrefectureList">
        <li
          v-for="(prefecture, prefCode) in prefectures"
          :key="prefCode"
          class="Prefectures__Prefecture"
        >
          <base-checkbox
            :object="prefecture"
            :id="prefCode"
            v-model="prefecturesevent"
            >{{ prefecture.prefName }}</base-checkbox
          >
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import BaseCheckbox from "@/components/Base/BaseCheckBox.vue";
export default {
  name: "PrefectureList",
  components: {
    BaseCheckbox
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      prefectures: []
    };
  },
  async mounted() {
    this.prefectures = await this.axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.VUE_APP_apikey }
      })
      .then(prefectures => {
        return prefectures.data.result;
      })
      .catch(error => {
        //レスポンスエラーなら別画面へ遷移して500エラーにするかも
        console.error({ error });
        alert({ error });
      });
  },
  computed: {
    prefecturesevent: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("input", value);
      }
    }
  },
  methods: {
    checkemit() {
      return this.$emit("change", this.checkprefectures);
    }
  }
};
</script>

<style scoped lang="scss">
.Prefectures {
  width: 330px;
  margin: 0 auto;
  margin-bottom: 10px;
  @media screen and (min-width: 761px) {
    width: 100%;
  }
  &__PrefectureList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media screen and (min-width: 761px) {
      width: calc(100% / 1.5);
      margin: 0 auto;
    }
  }

  &__Prefecture {
    display: inline-block;
    width: 110px;
    margin-top: 3px;
    margin-bottom: 3px;
  }
}
</style>
