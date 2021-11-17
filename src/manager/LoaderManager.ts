import { BaseEvent, EventDispatcher, ImageLoader, Loader, TextureLoader } from "three"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"

export interface LoaderMap {
  [key: string]: Loader
}

export interface LoadDetail {
  url: string
  progress: number
  error: boolean
  message: string
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

export enum LoaderManagerEventType {
  LOADING = 'loading',
  DETAILLOADING = 'detailLoading',
  DETAILLOADED = 'detailLoaded',
  LOADED = 'loaded'
}

export class LoaderManager extends EventDispatcher<LoadingEvent | DetailEvent | LoadedEvent> {
  private resourceMap: Map<string, unknown>
  private loaderMap: LoaderMap
  private loadTotal: number
  private loadSuccess: number
  private loadError: number
  private isError: boolean
  private isLoading: boolean
  private isLoaded: boolean
  private loadDetailMap: {[key: string]: LoadDetail}
  constructor () {
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

    this.loaderMap = {
      'jpg': imageLoader,
      'png': imageLoader,
      'jpeg': imageLoader,
      'obj': new OBJLoader(),
      'mtl': new MTLLoader()
    }
  }

  load (urlList: Array<string>): this {
    this.isLoading = true
    if (urlList.length <= 0) {
      this.checkLoaded()
      console.warn(`url list is empty.`)
      return this
    }

    this.loadTotal += urlList.length

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

      const ext = url.split('.').pop()?.toLocaleLowerCase()
      if (!ext) {
        detail.message = `url: ${url} 地址有误，无法获取文件格式。`
        detail.error = true
        this.isError = true
        this.loadError += 1
        continue
      }

      const loader = loaderMap[ext!]

      if (!loader) {
        detail.message = `url: ${url} 不支持此文件格式加载。`
        detail.error = true
        this.isError = true
        this.loadError += 1
        continue
      }
      

      loader.loadAsync(url, (event: ProgressEvent) => {
        detail.progress = Number((event.loaded / event.total).toFixed(2))
        this.dispatchEvent({
          type: 'detailLoading',
          detail
        })
      }).then(res => {
        detail.progress = 1
        this.loadSuccess += 1
        this.resourceMap.set(url, res)
        this.dispatchEvent({
          type: 'detailLoaded',
          detail
        })
        this.dispatchEvent({
          type: 'loading',
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
          type: 'detailLoaded',
          detail
        })
        this.dispatchEvent({
          type: 'loading',
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        })
        this.checkLoaded()
      })


    }

    return this
  }

   private loaded (): this {
    this.dispatchEvent({
      type: 'loaded',
      loadTotal: this.loadTotal,
      loadSuccess: this.loadSuccess,
      loadError: this.loadError,
      resourceMap: this.resourceMap
    })
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

  dispose (): this {
    this.resourceMap.clear()
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
}