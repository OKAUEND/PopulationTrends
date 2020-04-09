<template>
  <article class="Prefectures">
    <div class="Prefectures__Container">
      <h2 class="Prefectures_Title">都道府県</h2>
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
import RESAS from "@/RESAS.js";
const api = new RESAS();
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
    const result = await api.fetchPrefectures();

    if (result.isError) {
      this.setStoreState(result.Status);
    }

    this.prefectures = result.prefectures;
  },
  computed: {
    prefecturesevent: {
      get() {
        return this.value;
      },
      /*
        @param   {Object} value    - 個別の都道府県オブジェクト
        @return  {emit}            - emitイベント
      */
      set(value) {
        return this.$emit("input", value);
      }
    }
  },

  methods: {
    /*
      @param   {Number,String} status    - エラーステータス
    */
    setStoreState(status) {
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
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;
  @media screen and (min-width: 781px) {
    margin-bottom: 30px;
  }

  &__Container {
    max-width: $container_pc_width;
    margin: 0 auto;
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
      width: 120px;
    }
  }
}
</style>
