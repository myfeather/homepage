module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: [
        "last 2 versions",
        "not dead",
        "ie >= 11",
        "ios >= 11",
        "android >= 6",
        "safari >= 11",
        "chrome >= 60",
        ],
    }),
    require("postcss-assets"),
    require("cssnano"),
  ],
};