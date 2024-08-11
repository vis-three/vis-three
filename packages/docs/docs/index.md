---
layout: home
hero:
  name: VIS-THREE
  text: 基于three.js的组装式前端3D开发框架
  tagline: A web 3D development framework for assembled based on three.js
  image:
    src: /favicon.ico
    alt: Logo image
  actions:
    - theme: brand
      text: 开始
      link: /start/intro
    - theme: alt
      text: github
      link: https://github.com/Shiotsukikaedesari/vis-three
features:
  - icon: 🛠️
    title: 功能插件化
    details: 引擎提供功能插件的拔插能力，对各模块各功能进行解耦开发，持续集成，兼容拓展。
  - icon: 📚
    title: 逻辑策略化
    details: 提供策略注入能力，与策略回滚能力，更好的组合插件与引擎集成，将逻辑与插件解耦，提高插件兼容，提高业务功能兼容，更好的持续集成。
  - icon: ⚡️
    title: 场景配置化
    details: 提供配置化中间层，所有对象动作皆为配置，降低开发成本，你只用关系配置，剩下的交给我们。
  - icon: 📦
    title: 工程组件化
    details: 通过@vue/reactivity提供MVVM的组件化开发方式，符合前端开发习惯，高效的进行web3D项目构建。
footer: MPL-2.0 Licensed | Copyright (c) 2021 Shiotsukikaedesari
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
    const docsReleaseTagSpan = document.createElement('samp')
    docsReleaseTagSpan.classList.add('docs-cn-github-release-tag')
    docsReleaseTagSpan.innerText = '0.6.X'
    if(! document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline > samp')){
    tagLineParagragh.appendChild(docsReleaseTagSpan)
    }
})
</script>
