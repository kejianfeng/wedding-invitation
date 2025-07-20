// 微信分享配置和工具函数

export interface WechatShareConfig {
  title: string
  description: string
  image: string
  url: string
}

export const getWechatShareConfig = (name?: string): WechatShareConfig => {
  const defaultName = name || '亲爱的朋友'
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  return {
    title: `${defaultName}，邀请你参加我们的婚礼`,
    description: '好久不见，期待婚礼上能见到你',
    image: 'https://www.hunlihu.com/userphoto/194774_293b84739997b14ad0d4de69b.jpg',
    url: currentUrl
  }
}

export const updateWechatShareMeta = (config: WechatShareConfig) => {
  if (typeof window === 'undefined') return

  // 更新meta标签的辅助函数
  const updateMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  const updateNameMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  // 更新Open Graph标签
  updateMetaTag('og:title', config.title)
  updateMetaTag('og:description', config.description)
  updateMetaTag('og:image', config.image)
  updateMetaTag('og:url', config.url)

  // 更新微信分享标签
  updateNameMetaTag('wechat:title', config.title)
  updateNameMetaTag('wechat:description', config.description)
  updateNameMetaTag('wechat:image', config.image)

  // 更新Twitter标签
  updateMetaTag('twitter:title', config.title)
  updateMetaTag('twitter:description', config.description)
  updateMetaTag('twitter:image', config.image)

  // 更新页面标题
  document.title = config.title
}

export const isWechatBrowser = (): boolean => {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 传统方法
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

// 使用微信JS-SDK的分享功能
export const initWechatShare = async (config: WechatShareConfig): Promise<boolean> => {
  if (typeof window === 'undefined' || !isWechatBrowser()) {
    return false
  }

  try {
    // 检查微信JS-SDK是否已加载
    if (typeof (window as any).wx === 'undefined') {
      console.error('微信JS-SDK未加载')
      return false
    }

    // 获取当前页面URL（去除#号及其后面的内容）
    const currentUrl = window.location.href.split('#')[0]

    // 调用后端接口获取签名配置
    const response = await fetch('/api/wechat-signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: currentUrl }),
    })

    if (!response.ok) {
      console.error('获取微信签名失败')
      return false
    }

    const signatureData = await response.json()

    // 配置微信JS-SDK
    ;(window as any).wx.config({
      debug: false, // 开启调试模式
      appId: signatureData.appId,
      timestamp: signatureData.timestamp,
      nonceStr: signatureData.nonceStr,
      signature: signatureData.signature,
      jsApiList: signatureData.jsApiList,
    })

    // 配置分享内容
    ;(window as any).wx.ready(() => {
      // 分享给朋友
      ;(window as any).wx.updateAppMessageShareData({
        title: config.title,
        desc: config.description,
        link: config.url,
        imgUrl: config.image,
        success: () => {
          console.log('分享给朋友配置成功')
        },
        fail: (err: any) => {
          console.error('分享给朋友配置失败:', err)
        }
      })

      // 分享到朋友圈
      ;(window as any).wx.updateTimelineShareData({
        title: config.title,
        link: config.url,
        imgUrl: config.image,
        success: () => {
          console.log('分享到朋友圈配置成功')
        },
        fail: (err: any) => {
          console.error('分享到朋友圈配置失败:', err)
        }
      })

      // 兼容旧版本
      ;(window as any).wx.onMenuShareAppMessage({
        title: config.title,
        desc: config.description,
        link: config.url,
        imgUrl: config.image,
        success: () => {
          console.log('分享给朋友成功')
        },
        cancel: () => {
          console.log('分享给朋友取消')
        }
      })

      ;(window as any).wx.onMenuShareTimeline({
        title: config.title,
        link: config.url,
        imgUrl: config.image,
        success: () => {
          console.log('分享到朋友圈成功')
        },
        cancel: () => {
          console.log('分享到朋友圈取消')
        }
      })
    })

    ;(window as any).wx.error((err: any) => {
      console.error('微信JS-SDK配置失败:', err)
    })

    return true
  } catch (error) {
    console.error('初始化微信分享失败:', error)
    return false
  }
}

// 显示微信分享提示
export const showWechatShareTip = (): void => {
  if (typeof window === 'undefined') return

  const tip = document.createElement('div')
  tip.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
  tip.innerHTML = `
    <div class="bg-white rounded-lg p-6 mx-4 max-w-sm text-center">
      <div class="mb-4">
        <svg class="w-12 h-12 text-blue-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,10.5A1.5,1.5 0 0,1 10,12A1.5,1.5 0 0,1 8.5,13.5M15.5,13.5A1.5,1.5 0 0,1 14,12A1.5,1.5 0 0,1 15.5,10.5A1.5,1.5 0 0,1 17,12A1.5,1.5 0 0,1 15.5,13.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">分享到微信</h3>
      <p class="text-sm text-gray-600 mb-4">
        点击右上角"..."按钮，选择"分享给朋友"或"分享到朋友圈"
      </p>
      <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium">
        知道了
      </button>
    </div>
  `
  document.body.appendChild(tip)
} 