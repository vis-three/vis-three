import {defineConfig} from 'vitepress'
import path from "path";
import fs from "fs";

export const sharedConfig = defineConfig({
    logo: "/favicon.ico",
    base: "/docs",
    title: "VIS-THREE",
    head: [["link", {rel: "icon", href: "/favicon.ico"}]],
    appearance: 'dark',
    markdown: {
        attrs: {disable: true},
        theme: {
            dark: "github-dark",
            light: "github-light",
        },
    },
    description: "A web 3D development framework for assembled based on three.js",
    outDir: path.resolve(__dirname, "../../../website/public/docs"),
    themeConfig: {
        logo: "/favicon.ico",
        outlineTitle: "本页目录",
        outline: [2, 3],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/vis-three/vis-three",
            },
        ],
        repo: "https://github.com/vis-three/vis-three",
        repoLabel: "github",
    },
})