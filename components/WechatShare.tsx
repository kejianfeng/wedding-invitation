import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { 
  getWechatShareConfig, 
  isWechatBrowser, 
  copyToClipboard, 
  initWechatShare,
  showWechatShareTip
} from '../utils/wechatShare'

interface WechatShareProps {
  className?: string
}

export default function WechatShare({ className = '' }: WechatShareProps) {
  const router = useRouter()
  const [isWechat, setIsWechat] = useState(false)
  const [showShareTip, setShowShareTip] = useState(false)

  useEffect(() => {
    // 检测是否在微信浏览器中
    setIsWechat(isWechatBrowser())
    
    // 如果在微信中，初始化分享功能
    if (isWechatBrowser()) {
      const urlParams = new URLSearchParams(window.location.search)
      const name = urlParams.get('name') || '亲爱的朋友'
      const config = getWechatShareConfig(name)
      
      // 初始化微信分享
      initWechatShare(config).then((success) => {
        if (!success) {
          console.log('微信分享初始化失败，将使用提示方式')
        }
      })
    }
  }, [])

  const handleShare = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const name = urlParams.get('name') || '亲爱的朋友'
    const config = getWechatShareConfig(name)

    if (isWechat) {
      // 在微信中，显示分享提示
      setShowShareTip(true)
      setTimeout(() => setShowShareTip(false), 3000)
    } else {
      // 在其他浏览器中，尝试调用原生分享API
      if (navigator.share) {
        try {
          await navigator.share({
            title: config.title,
            text: config.description,
            url: config.url
          })
        } catch (error) {
          console.log('分享失败:', error)
          // 如果原生分享失败，复制链接到剪贴板
          const success = await copyToClipboard(config.url)
          if (success) {
            alert('链接已复制到剪贴板')
          } else {
            alert('复制失败，请手动复制链接')
          }
        }
      } else {
        // 不支持原生分享，复制链接
        const success = await copyToClipboard(config.url)
        if (success) {
          alert('链接已复制到剪贴板')
        } else {
          alert('复制失败，请手动复制链接')
        }
      }
    }
  }

  return (
    <>
      <button
        onClick={handleShare}
        className={`flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,10.5A1.5,1.5 0 0,1 10,12A1.5,1.5 0 0,1 8.5,13.5M15.5,13.5A1.5,1.5 0 0,1 14,12A1.5,1.5 0 0,1 15.5,10.5A1.5,1.5 0 0,1 17,12A1.5,1.5 0 0,1 15.5,13.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/>
        </svg>
        <span className="text-sm font-medium">
          {isWechat ? '分享给朋友' : '分享邀请函'}
        </span>
      </button>

      {/* 微信分享提示 */}
      {showShareTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-primary mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,10.5A1.5,1.5 0 0,1 10,12A1.5,1.5 0 0,1 8.5,13.5M15.5,13.5A1.5,1.5 0 0,1 14,12A1.5,1.5 0 0,1 15.5,10.5A1.5,1.5 0 0,1 17,12A1.5,1.5 0 0,1 15.5,13.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">分享到微信</h3>
            <p className="text-sm text-gray-600 mb-4">
              点击右上角"..."按钮，选择"分享给朋友"或"分享到朋友圈"
            </p>
            <button
              onClick={() => setShowShareTip(false)}
              className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium"
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </>
  )
} 