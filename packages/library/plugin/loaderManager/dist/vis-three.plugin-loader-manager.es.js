import { Loader as M, Cache as m, ImageLoader as y } from "three";
import { OBJLoader as v } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader as D } from "three/examples/jsm/loaders/MTLLoader.js";
import { RGBELoader as S } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader as T } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader as w } from "three/examples/jsm/loaders/FBXLoader.js";
import { DRACOLoader as O } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader as A } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DDSLoader as P } from "three/examples/jsm/loaders/DDSLoader.js";
import { MeshoptDecoder as R } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { LUTCubeLoader as b } from "three/examples/jsm/loaders/LUTCubeLoader.js";
import { LUT3dlLoader as x } from "three/examples/jsm/loaders/LUT3dlLoader.js";
import { EventDispatcher as C } from "@vis-three/core";
import { transPkgName as j } from "@vis-three/utils";
const h = class h extends M {
  constructor(t) {
    super(t);
  }
  load(t, s, l, r) {
    this.path !== void 0 && (t = this.path + t), this.manager.itemStart(t), t = this.manager.resolveURL(t);
    const d = m.get(t);
    if (d !== void 0)
      return setTimeout(() => {
        s && s(d), this.manager.itemEnd(t);
      }, 0), d;
    const e = document.createElement("video");
    return e.preload = h.preload, e.autoplay = h.autoplay, e.loop = h.loop, e.muted = h.muted, e.src = t, e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.zIndex = "-1", document.body.appendChild(e), e.oncanplay = () => {
      m.add(t, e), this.manager.itemEnd(t), s && s(e);
    }, e.onerror = (a) => {
      this.manager.itemEnd(t), r && r(a);
    }, e;
  }
};
h.autoplay = !0, h.preload = "auto", h.muted = !0, h.loop = !0;
let u = h;
var p = /* @__PURE__ */ ((i) => (i.BEFORELOAD = "beforeLoad", i.LOADING = "loading", i.DETAILLOADING = "detailLoading", i.DETAILLOADED = "detailLoaded", i.LOADED = "loaded", i))(p || {});
class I extends C {
  constructor(t) {
    super(), this.urlList = [], this.path = "", this.resourceMap = /* @__PURE__ */ new Map(), this.loadTotal = 0, this.loadSuccess = 0, this.loadError = 0, this.isError = !1, this.isLoading = !1, this.isLoaded = !1, this.loadDetailMap = {};
    const s = new y(), l = new u(), r = new T();
    r.setDRACOLoader(new O()), r.setKTX2Loader(new A()), r.setMeshoptDecoder(R), this.loaderMap = {
      jpg: s,
      png: s,
      jpeg: s,
      obj: new v(),
      mtl: new D(),
      mp4: l,
      webm: l,
      ogg: l,
      hdr: new S(),
      gltf: r,
      glb: r,
      fbx: new w(),
      dds: new P(),
      cube: new b(),
      "3dl": new x()
    }, t && (this.loaderMap = Object.assign(this.loaderMap, t.loaderExtends));
  }
  loaded() {
    return this.dispatchEvent({
      type: "loaded",
      loadTotal: this.loadTotal,
      loadSuccess: this.loadSuccess,
      loadError: this.loadError,
      resourceMap: this.resourceMap
    }), this;
  }
  checkLoaded() {
    return this.loadTotal === this.loadSuccess + this.loadError && (this.isError = !0, this.isLoaded = !0, this.isLoading = !1, this.loaded()), this;
  }
  /**
   * 设置统一资源路径前缀
   * @param path
   * @returns
   */
  setPath(t) {
    return this.path = t, this;
  }
  /**
   * 设置请求头
   * @param headers
   * @returns this
   */
  setRequestHeader(t) {
    return Object.values(this.loaderMap).forEach((s) => {
      s.setRequestHeader(t);
    }), this;
  }
  /**
   * 设置响应类型
   * @param responseType
   * @returns this
   */
  setResponseType(t) {
    return Object.values(this.loaderMap).forEach((s) => {
      s.setResponseType && s.setResponseType(t);
    }), this;
  }
  /**
   * 获取加载器
   * @param ext 资源类型
   * @returns
   */
  getLoader(t) {
    return this.loaderMap[t] ? this.loaderMap[t] : null;
  }
  /**
   * 加载资源
   * @param urlList string[] | [{ext: string, url: string}]
   * @returns this
   */
  load(t) {
    var d;
    if (this.reset(), this.isLoading = !0, this.dispatchEvent({
      type: "beforeLoad",
      urlList: [...t]
    }), t.length <= 0)
      return this.checkLoaded(), console.warn("url list is empty."), this;
    this.loadTotal += t.length;
    const s = this.resourceMap, l = this.loaderMap, r = this.loadDetailMap;
    for (const e of t) {
      let a, n;
      typeof e == "string" ? (a = e, n = ((d = a.split(".").pop()) == null ? void 0 : d.toLocaleLowerCase()) || "") : (a = e.url, n = e.ext.toLocaleLowerCase(), n.startsWith(".") && (n = n.slice(1)));
      const o = {
        url: a,
        progress: 0,
        error: !1,
        message: a
      };
      if (r[a] = o, s.has(a)) {
        o.progress = 1, this.loadSuccess += 1, this.dispatchEvent({
          type: "detailLoaded",
          detail: o
        }), this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        }), this.checkLoaded();
        continue;
      }
      if (!n) {
        o.message = `url: ${a} 地址有误，无法获取文件格式。`, console.warn(o.message), o.error = !0, this.isError = !0, this.loadError += 1, this.dispatchEvent({
          type: "detailLoaded",
          detail: o
        }), this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        });
        continue;
      }
      const g = l[n];
      if (!g) {
        o.message = `url: ${a} 不支持此文件格式加载。`, console.warn(o.message), o.error = !0, this.isError = !0, this.loadError += 1, this.dispatchEvent({
          type: "detailLoaded",
          detail: o
        }), this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        });
        continue;
      }
      const L = a.replace(/\\/g, "/").split("/"), f = L.pop(), E = this.path + L.join("/") + "/";
      g.setPath(E).loadAsync(f, (c) => {
        o.progress = Number((c.loaded / c.total).toFixed(2)), this.dispatchEvent({
          type: "detailLoading",
          detail: o
        });
      }).then((c) => {
        o.progress = 1, this.loadSuccess += 1, this.resourceMap.set(a, c), this.urlList.push(e), this.dispatchEvent({
          type: "detailLoaded",
          detail: o
        }), this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        }), this.checkLoaded();
      }).catch((c) => {
        o.error = !0, o.message = JSON.stringify(c), this.loadError += 1, this.dispatchEvent({
          type: "detailLoaded",
          detail: o
        }), this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        }), this.checkLoaded();
      });
    }
    return this;
  }
  /**
   * 重置加载管理器属性
   * @returns
   */
  reset() {
    return this.loadTotal = 0, this.loadSuccess = 0, this.loadError = 0, this.isError = !1, this.isLoading = !1, this.isLoaded = !1, this.loadDetailMap = {}, this;
  }
  /**
   * 注册loader
   * @param ext 文件格式: jpg
   * @param loader extend THREE.Loader
   * @returns this
   */
  register(t, s) {
    return this.loaderMap[t] = s, this;
  }
  // 资源是否已经加装
  hasLoaded(t) {
    return this.resourceMap.has(t);
  }
  /**
   * 获取url下的资源
   * @param url
   * @returns
   */
  getResource(t) {
    return this.resourceMap.get(t);
  }
  /**
   * @deprecated
   * 获取详细资源信息
   * @returns
   */
  getLoadDetailMap() {
    return this.loadDetailMap;
  }
  /**
   * @deprecated
   * 设置详细资源信息
   * @param map
   * @returns
   */
  setLoadDetailMap(t) {
    return this.loadDetailMap = t, this;
  }
  // TODO:
  remove(t) {
  }
  // 导出json资源单
  toJSON() {
    return JSON.stringify(this.urlList);
  }
  /**
   * 导出配置单
   * @returns
   * @todo 对比缓存
   */
  exportConfig() {
    return JSON.parse(JSON.stringify(this.urlList));
  }
  /**
   * 清空缓存
   * @returns
   */
  dispose() {
    return this.resourceMap.clear(), this;
  }
}
const N = "@vis-three/plugin-loader-manager", F = j(N), Z = function(i) {
  return {
    name: F,
    install(t) {
      const s = new I(i);
      i != null && i.path && s.setPath(i.path), t.loaderManager = s, t.loadResources = (l, r) => {
        const d = (e) => {
          r(void 0, e), s.removeEventListener(
            p.LOADED,
            d
          );
        };
        try {
          s.addEventListener(
            p.LOADED,
            d
          );
        } catch (e) {
          r(e);
        }
        return s.load(l), t;
      }, t.loadResourcesAsync = (l) => new Promise((r, d) => {
        const e = (a) => {
          r(a), s.removeEventListener(
            p.LOADED,
            e
          );
        };
        try {
          s.addEventListener(
            p.LOADED,
            e
          );
        } catch (a) {
          d(a);
        }
        s.load(l);
      });
    },
    dispose(t) {
      t.loaderManager.dispose(), delete t.loaderManager, delete t.loadResources, delete t.loadResourcesAsync;
    }
  };
};
export {
  p as LOADER_EVENT,
  F as LOADER_MANAGER_PLUGIN,
  I as LoaderManager,
  Z as LoaderManagerPlugin
};
