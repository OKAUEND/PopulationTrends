module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/assets/scss/prepends.scss";'
      }
    }
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "都道府県別人口推移"
    }
  }
};
