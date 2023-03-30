var en = require("./translations.en.json");
var zh_hk = require("./translations.zh-HK.json");

const i18n = {
  translations: {
    "en": en.i18n,
    "zh-HK": zh_hk.i18n,
  },
  defaultLang: "zh-HK",
  useBrowserDefault: false,
};

module.exports = i18n;