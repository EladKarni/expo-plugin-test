const { AndroidConfig, withAndroidManifest } = require("expo/config-plugins");

function addAttributesToApplication(androidManifest, attributes) {
  const app = AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  if (app?.$) {
    app.$ = { ...app.$, ...attributes };
  }

  return androidManifest;
}

const withMySDK = (expoConfig, languages) => {
  console.log(languages);
  return withAndroidManifest(expoConfig, (config) => {
    config.modResults = addAttributesToApplication(config.modResults, {
      "android:localeConfig": "@xml/locales_config",
    });
    return config;
  });
};

module.exports = withMySDK;
