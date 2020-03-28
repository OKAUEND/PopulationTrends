<template>
  <article class="Prefectures">
    <h2 class="Prefectures_Title">都道府県</h2>
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
import BaseCheckbox from "@/components/Base/BaseCheckbox.vue";
import axios from "axios";
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
    this.prefectures = await axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.VUE_APP_apikey }
      })
      .then(response => {
        console.log({ response });
        //エラーステータスチェックを行い、エラー画面へ遷移するかをチェックする
        if (response.status > 500) {
          this.setStoreState(response.status);
          return;
        } else if (
          response.data.statusCode === "403" ||
          response.data.statusCode === "404" ||
          response.data.statusCode === "429"
        ) {
          this.setStoreState(response.data.statusCode);
          return;
        }
        return response.data.result;
      })
      .catch(error => {
        //レスポンスエラーなら別画面へ遷移して500エラーにするかも
        console.error({ error });
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
    setStoreState(status) {
      console.error({ status });
      this.$store.commit("setErrorState", status);
      this.$router.push("/Error");
    }
  }
};
</script>

<style scoped lang="scss">
.Prefectures {
  width: 100%;
  margin-bottom: 30px;
  @media screen and (min-width: 781px) {
    width: calc(100% / 1.5);
    margin: 0 auto;
    margin-bottom: 30px;
  }

  &__Title {
    text-align: left;
  }

  &__PrefectureList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
  }

  &__Prefecture {
    display: inline-block;
    width: calc(100% / 3);
    margin-top: 3px;
    margin-bottom: 3px;
    @media screen and (min-width: 761px) {
      width: 125px;
    }
  }
}
</style>
