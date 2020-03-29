import { shallowMount } from "@vue/test-utils";
import populationschart from "@/components/PopulationsChart.vue";
import flushPromises from "flush-promises";

jest.mock("axios");

import { setPattern } from "axios";

setPattern(1);

describe("PrefectureList.vue", () => {
  it("コンポーネント描画時に非同期通信でデータを取得しているか", async () => {
    const wrapper = shallowMount(populationschart, {
      propsData: {
        prefectures: []
      }
    });
    await flushPromises();
    const years = wrapper.vm.years;
    const data = 1960;
    expect(years[0]).toEqual(data);
  });
  it("受け取ったデータに変更があった時、新しいデータをAPIより取得しているか", async () => {
    const wrapper = shallowMount(populationschart, {
      propsData: {
        prefectures: []
      }
    });
    await flushPromises();
    //propsが何もないときは長さが0である
    expect(wrapper.vm.populations.length).toBe(0);

    wrapper.setProps({
      prefectures: [{ prefName: "大阪", prefCode: 20 }]
    });
    await flushPromises();
    //propsが渡されているときは長さがその分ある
    expect(wrapper.vm.populations.length).toBe(1);
  });
});
