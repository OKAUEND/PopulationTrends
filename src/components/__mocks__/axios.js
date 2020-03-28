export default {
  get: () => {
    switch (pattern) {
      case 0:
        return Promise.resolve({
          data: { result: [{ prefName: "大阪", prefCode: 20 }] }
        });
      case 1:
        return Promise.resolve({
          data: {
            result: { data: [{ data: [{ year: 1960, value: 20 }] }] }
          }
        });
      case 2:
        return Promise.resolve({
          data: {
            result: { data: [{ data: [{ year: 1960, value: 20 }] }] }
          }
        });
    }
  }
};

export let pattern = 0;

export function setPattern(value) {
  pattern = value;
}

/*
    本来ならテストファイル側からpattern変数を使いpatternでSwitchする処理を実装したかったが、
    getメソッド内からpatternを参照できなかったために、実現できず
    強引ではあるがurlでSwitchさせて値を返すように妥協対応
    */
//    console.log(this);
//    switch (url) {
//      case "https://opendata.resas-portal.go.jp/api/v1/prefectures":
//        return Promise.resolve({
//          data: { result: [{ prefName: "大阪", prefCode: 20 }] }
//        });
//      case "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1":
//        return Promise.resolve({
//          data: {
//            result: { data: [{ data: [{ year: 1960, value: 20 }] }] }
//          }
//        });
//      case "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=20":
//        return Promise.resolve({
//          data: {
//            result: { data: [{ data: [{ year: 1960, value: 20 }] }] }
//          }
//        });
//    }
//  }
