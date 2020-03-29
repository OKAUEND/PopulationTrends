# PopulationTrends
都道府県別の人口推移グラフ
## Description
選択した都道府県の、1960年から2045年まで年代毎の人口推移をグラフで表示します。

## Install
### Step.1
```
yarn install
```
### Step.2
RESAS APIよりAPI Keyを発行してください。  
[RESAS API](https://opendata.resas-portal.go.jp/)

### Step.3
`.env`を作成し、`Step.2`で発光したAPI Keyで環境変数を作成します。
```
VUE_APP_apikey=" You API Key "
```
## Local Preview
```
yarn serve
```

## Project Build
```
yarn Build
```
