const {
  AndroidConfig,
  withAndroidManifest,
  XML,
} = require("expo/config-plugins");
const { mkdirSync } = require("fs");

function addAttributesToApplication(androidManifest, attributes) {
  const app = AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  if (app?.$) {
    app.$ = { ...app.$, ...attributes };
  }

  return androidManifest;
}

function addLanguages(languages) {
  return languages.map((lang) => ({ $: { "android:name": lang } }));
}

function generateXML({ lang }) {
  return {
    "locale-config": {
      $: {
        "xmlns:android": "http://schemas.android.com/apk/res/android",
      },
      locale: addLanguages(lang),
    },
  };
}

async function writeXMLFiles(langs) {
  const obj = generateXML(langs);
  const dir = "android/app/src/main/res/xml";

  mkdirSync(dir, { recursive: true });
  await XML.writeXMLAsync({ path: `${dir}/locales_config.xml`, xml: obj });
}

const withRNLocalizeSettings = (expoConfig, languages) => {
  console.log(languages);
  return withAndroidManifest(expoConfig, (config) => {
    config.modResults = addAttributesToApplication(config.modResults, {
      "android:localeConfig": "@xml/locales_config",
    });
    writeXMLFiles(languages);
    return config;
  });
};

module.exports = withRNLocalizeSettings;
