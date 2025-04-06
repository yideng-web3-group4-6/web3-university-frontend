import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';
import en from './messages/en.json';
import zh from './messages/zh.json';

// 从 SUPPORTED_LANGUAGES 派生类型
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
// 定义语言资源配置类型
interface LanguageResources {
  [key: string]: {
    translation: Record<string, string>;
  };
}

// 定义支持的语言列表
const SUPPORTED_LANGUAGES = ['en', 'zh'] as const;
// 语言资源映射
const resources: LanguageResources = {
  en: { translation: en },
  zh: { translation: zh },
};

// 获取默认语言
const getDefaultLanguage = (): SupportedLanguage => {
  const languageFromCookie = Cookies.get('i18nLang');
  return SUPPORTED_LANGUAGES.includes(languageFromCookie as SupportedLanguage)
    ? (languageFromCookie as SupportedLanguage)
    : 'en'; // 默认语言为 'en'
};

export const translationValue = (key: string, options: object = {}) => {
  return i18n.t(key, { ...options });
};

// 初始化 i18n 配置
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDefaultLanguage(), // 使用函数获取默认语言
    supportedLngs: SUPPORTED_LANGUAGES, // 支持的语言列表
    fallbackLng: 'en', // 如果语言不可用，回退到英文
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS，不需要额外转义
    },
  })
  .catch(error => {
    console.error('Failed to initialize i18n:', error);
  });

// 监听语言变化并更新 cookie
i18n.on('languageChanged', lng => {
  Cookies.set('i18nLang', lng, { expires: 365 }); // 每次语言变化时更新 cookie
});

export default i18n;
