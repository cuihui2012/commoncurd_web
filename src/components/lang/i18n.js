import I18n from "vue-i18n";
import Vue from "vue";
import ElementLocale from 'element-ui/lib/locale'
import cn from './cn'
import en from './en'
Vue.use(I18n);
const i18n = new I18n({
  locale: "zh-CN",  
  messages: {
    "zh-CN": cn,
    "en-US": en
  }
});
ElementLocale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换

export default i18n;