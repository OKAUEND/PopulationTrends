import { shallowMount, mount } from "@vue/test-utils";
import PrefectureList from "@/components/prefectureList.vue";
import BaseCheckbox from "@/components/Base/BaseCheckbox.vue";
import flushPromises from "flush-promises";

jest.mock("axios");

import { setPattern } from "axios";

setPattern(0);

describe("PrefectureList.vue", () => {
  test("コンポーネントを描画時に非同期処理が行われデータを取得できているか", async () => {
    const wrapper = shallowMount(PrefectureList, {
      propsData: {
        value: []
      }
    });

    await flushPromises();
    const prefectures = wrapper.vm.prefectures;
    const data = [{ prefName: "大阪", prefCode: 20 }];
    expect(prefectures).toEqual(data);
  });
  test("非同期処理で取得した分のデータをリストで描画できているか", async () => {
    const wrapper = mount(PrefectureList, {
      propsData: {
        value: []
      }
    });
    await flushPromises();
    expect(wrapper.contains("li")).toBe(true);
  });
  test("Baseコンポーネントからのemitを受け取れているか", async () => {
    const wrapper = shallowMount(PrefectureList, {
      propsData: {
        value: []
      }
    });
    await flushPromises();
    const emittestdata = { prefName: "大阪", prefCode: 20 };
    wrapper.find(BaseCheckbox).vm.$emit("input", emittestdata);
    expect(wrapper.emitted().input[0][0]).toEqual(emittestdata);
  });
});
