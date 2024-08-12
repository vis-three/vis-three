import {defineConfig} from "vitepress";


import {enConfig} from './en'
import {sharedConfig} from './shared'
import {zhConfig} from './zh'


export default defineConfig({
    ...sharedConfig,
    locales: {
        root: {label: '简体中文', lang: 'zh-CN', link: '/', ...zhConfig},
        en: {label: 'English', lang: 'en-US', link: '/en/', ...enConfig},
    },
});
