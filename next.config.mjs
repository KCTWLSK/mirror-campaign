import i18nConfig from "./next-i18next.config.js";
import publicRuntimeConfig from "./src/configs/index.js";

const { i18n } = i18nConfig;

const nextConfig = {
  publicRuntimeConfig,
  i18n,
};

export default nextConfig;
