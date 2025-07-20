import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function InvitationCard() {
  const router = useRouter()
  const [invitationName, setInvitationName] = useState('陈文文')

  useEffect(() => {
    // 在客户端安全地获取 URL 参数
    if (router.isReady) {
      const name = router.query.name as string
      if (name) {
        setInvitationName(name)
      }
    }
  }, [router.isReady, router.query.name])
 
  return (
    <div className="relative bg-gradient-to-b from-white via-background to-background rounded-t-3xl z-10 overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute top-20 right-16 w-12 h-12 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 left-16 w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-primary/20 rounded-full"></div>
      </div>
      
      <div className="relative px-8 py-16">
        {/* 顶部装饰线 */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
        
        {/* 主要内容 */}
        <div className="text-center space-y-8">
          {/* 致亲爱的 */}
          <div className="space-y-4">
            <p className="tracking-widest text-xs text-gray-500 uppercase font-light">
              致亲爱的
            </p>
            <div className="relative">
              <p className="font-wedding text-2xl text-black mb-2 relative z-10">
                {invitationName}
              </p>
              {/* 下划线装饰 */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
            </div>
          </div>
          
          {/* 装饰性图标 */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center border border-primary/20">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              {/* 装饰性圆点 */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary/40 rounded-full"></div>
            </div>
          </div>
          
          {/* 邀请文字 */}
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-3">
              <p className="text-sm text-black leading-relaxed font-light">
                诚挚邀请您参加我们的婚礼
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                见证这份美好的时刻
              </p>
            </div>
            
            {/* 分隔装饰 */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/40"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/40"></div>
            </div>
            
            <p className="text-xs text-gray-500 italic font-light">
              "愿我们的爱情故事，成为您心中最美的回忆"
            </p>
          </div>
        </div>
        
        {/* 底部装饰线 */}
        <div className="flex justify-center mt-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
      </div>
    </div>
  )
} 