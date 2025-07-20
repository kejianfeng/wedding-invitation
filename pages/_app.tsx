import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { getWechatShareConfig, updateWechatShareMeta } from '../utils/wechatShare'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // 动态更新微信分享信息
    const updateWechatShare = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        const name = urlParams.get('name') || '亲爱的朋友'
        const config = getWechatShareConfig(name)
        
        // 更新meta标签
        updateWechatShareMeta(config)
      }
    }

    // 页面加载时更新分享信息
    updateWechatShare()

    // 监听路由变化
    const handleRouteChange = () => {
      updateWechatShare()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  )
} 