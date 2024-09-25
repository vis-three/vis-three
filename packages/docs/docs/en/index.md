---
layout: home
hero:
  name: VIS-THREE
  text: A composable Web 3D framework built on three.js
  tagline: 基于three.js的组装式前端3D开发框架
  image:
    src: /favicon.ico
    alt: Logo image
  actions:
    - theme: brand
      text: Get Started
      link: /en/start/intro
    - theme: alt
      text: github
      link: https://github.com/Shiotsukikaedesari/vis-three
features:
  - icon: 🛠️
    title: Modular Plugin System
    details: The engine provides plug-and-play functionality for plugins, enabling decoupled development for various modules and features. This allows for continuous integration and compatibility with extensions.
  - icon: 📚
    title: Strategic Logic Integration
    details: The framework offers strategy injection and rollback capabilities, enhancing the integration of plugins with the engine. This approach decouples logic from plugins, improves plugin compatibility, and facilitates better integration of business functionalities, supporting continuous integration.
  - icon: ⚡️
    title: Configurable Scenes
    details: The framework provides a configurable intermediary layer where all object interactions are managed through configurations. This reduces development costs by allowing you to focus solely on defining configurations while the framework handles the rest.
  - icon: 📦
    title: Component-Based Architecture
    details: Leveraging @vue/reactivity for an MVVM component-based development approach, this framework aligns with front-end development practices and enables efficient construction of web 3D projects.
footer: MPL-2.0 Licensed | Copyright (c) 2021 Shiotsukikaedesari
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
    const docsReleaseTagSpan = document.createElement('samp')
    docsReleaseTagSpan.classList.add('docs-cn-github-release-tag')
    docsReleaseTagSpan.innerText = '0.6.X(Waiting for update)'
    if(! document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline > samp')){
    tagLineParagragh.appendChild(docsReleaseTagSpan)
    }
})
</script>
