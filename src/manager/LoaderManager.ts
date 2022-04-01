import { EventDispatcher, BaseEvent } from './../core/EventDispatcher';
import { ImageLoader, Loader, TextureLoader } from "three"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { VideoLoader } from '../extends/loader/VideoLoader';

export enum LOADERMANAGER {
  BEFORELOAD = 'beforeLoad',
  LOADING = 'loading',
  DETAILLOADING = 'detailLoading',
  DETAILLOADED = 'detailLoaded',
  LOADED = 'loaded'
}

export interface LoadDetail {
  url: string
  progress: number
  error: boolean
  message: string
}

export interface BeforeLoadEvent extends BaseEvent {
  urlList: string[]
}

export interface LoadingEvent extends BaseEvent {
  loadTotal: number
  loadSuccess: number
  loadError: number
}

export interface DetailEvent extends BaseEvent {
  detail: LoadDetail
}


export interface LoadedEvent extends BaseEvent {
  loadTotal: number
  loadSuccess: number
  loadError: number
  resourceMap: Map<string, unknown>
}

export interface LoaderManagerParameters {
  loaderExtends: {[key: string]: Loader}
}

export class LoaderManager extends EventDispatcher {
  private resourceMap: Map<string, unknown>
  private loaderMap: {[key: string]: Loader}
  private loadTotal: number
  private loadSuccess: number
  private loadError: number
  private isError: boolean
  private isLoading: boolean
  private isLoaded: boolean
  private loadDetailMap: {[key: string]: LoadDetail}

  path: string = ''

  constructor (parameters?: LoaderManagerParameters) {
    super()
    this.resourceMap = new Map()
    this.loadTotal = 0
    this.loadSuccess = 0
    this.loadError = 0
    this.isError = false
    this.isLoading = false
    this.isLoaded = false
    this.loadDetailMap = {}

    const imageLoader = new ImageLoader()
    const videoLoader = new VideoLoader()

    this.loaderMap = {
      'jpg': imageLoader,
      'png': imageLoader,
      'jpeg': imageLoader,
      'obj': new OBJLoader(),
      'mtl': new MTLLoader(),
      'mp4': videoLoader,
      'webm': videoLoader,
      'ogg': videoLoader,
    }

    if (parameters) {
      this.loaderMap = Object.assign(this.loaderMap, parameters.loaderExtends)
    }
  }

  private loaded (): this {
    this.dispatchEvent({
      type: LOADERMANAGER.LOADED,
      loadTotal: this.loadTotal,
      loadSuccess: this.loadSuccess,
      loadError: this.loadError,
      resourceMap: this.resourceMap
    })
    return this
  }

  private checkLoaded (): this {
    if (this.loadTotal === this.loadSuccess + this.loadError) {
      this.isError = true
      this.isLoaded = true
      this.isLoading = false
      this.loaded()
    }
    return this
  }

  setPath(path: string): this {
    const map = this.loaderMap
    Object.keys(map).forEach(ext => {
      map[ext].setPath(path)
    })
    this.path = path
    return this
  }

  load (urlList: Array<string>): this {
    this.reset()
    this.isLoading = true
    this.dispatchEvent({
      type: LOADERMANAGER.BEFORELOAD,
      urlList: [...urlList]
    })
    if (urlList.length <= 0) {
      this.checkLoaded()
      console.warn(`url list is empty.`)
      return this
    }

    this.loadTotal += urlList.length

    const resourceMap = this.resourceMap
    const loaderMap = this.loaderMap
    const loadDetailMap = this.loadDetailMap

    for (let url of urlList) {
      const detail: LoadDetail = {
        url,
        progress: 0,
        error: false,
        message: url
      }

      loadDetailMap[url] = detail

      // 判断有无缓存
      if (resourceMap.has(url)) {
        detail.progress = 1
        this.loadSuccess += 1
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        })
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        })
        this.checkLoaded()
        continue
      }

      const ext = url.split('.').pop()?.toLocaleLowerCase()
      if (!ext) {
        detail.message = `url: ${url} 地址有误，无法获取文件格式。`
        console.warn(detail.message)
        detail.error = true
        this.isError = true
        this.loadError += 1
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        })
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        })
        continue
      }

      const loader = loaderMap[ext!]

      if (!loader) {
        detail.message = `url: ${url} 不支持此文件格式加载。`
        console.warn(detail.message)
        detail.error = true
        this.isError = true
        this.loadError += 1
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        })
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        })
        continue
      }
      

      loader.loadAsync(url, (event: ProgressEvent) => {
        detail.progress = Number((event.loaded / event.total).toFixed(2))
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADING,
          detail
        })
      }).then(res => {
        detail.progress = 1
        this.loadSuccess += 1
        this.resourceMap.set(url, res)
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        })
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        })
        this.checkLoaded()
      }).catch (err => {
        detail.error = true
        detail.message = JSON.stringify(err)
        this.loadError += 1
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        })
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        })
        this.checkLoaded()
      })
    }

    return this
  }

  reset (): this {
    this.loadTotal = 0
    this.loadSuccess = 0
    this.loadError = 0
    this.isError = false
    this.isLoading = false
    this.isLoaded = false
    this.loadDetailMap = {}
    return this
  }

  // 注册自定loader
  register (ext: string, loader: Loader): this {
    this.loaderMap[ext] = loader
    return this
  }

  // 资源是否已经加装
  hasLoaded (url: string): boolean {
    return this.resourceMap.has(url)
  }

  getResource (url: string): unknown {
    return this.resourceMap.get(url)
  }

  // 获取详细资源信息
  getLoadDetailMap (): {[key: string]: LoadDetail} {
    return this.loadDetailMap
  }

  // 设置详细资源信息
  setLoadDetailMap (map: {[key: string]: LoadDetail}): this {
    this.loadDetailMap = map
    return this
  }

  // TODO:
  remove(url: string) {}

  // 导出资源单
  toJSON (): string {
    const assets: string[] = []
    this.resourceMap.forEach((value, url) => {
      assets.push(url)
    })

    return JSON.stringify(assets)
  }

  dispose (): this {
    this.resourceMap.clear()
    return this
  }

}