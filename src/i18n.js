import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

i18n
    .use(LanguageDetector)
    .init({
        interpolation: {escapeValue: false},
        resources: {
            es: {
                global: global_es
            },
            en: {
                global: global_en
            }
        },
        defaultNS: "global"
    })

export default i18n;