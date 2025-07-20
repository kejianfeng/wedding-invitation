import React, { useState, useEffect } from 'react'

export default function WeddingDetails() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = new Date('2025-10-02T11:58:00')
    
    const timer = setInterval(() => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-wedding text-black mb-4">婚礼倒计时</h2>
        <p className="text-sm text-gray-600">Countdown to Our Special Day</p>
      </div>
      
      {/* 倒计时组件 */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-lg flex flex-col items-center justify-center">
              <div className="text-xl font-bold">{timeLeft.days}</div>
              <div className="text-xs">天</div>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-lg flex flex-col items-center justify-center">
              <div className="text-xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs">时</div>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-lg flex flex-col items-center justify-center">
              <div className="text-xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs">分</div>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-lg flex flex-col items-center justify-center">
              <div className="text-xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs">秒</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 婚礼信息 */}
      <div className="px-6 text-center">
        <div className="mb-8">
          <h3 className="text-xl font-wedding text-black mb-4">婚礼详情</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">日期</div>
              <div className="text-lg font-wedding text-black">2025年10月02日</div>
              <div className="text-xs text-gray-600 mt-1">农历：八月十一（星期四）</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">时间</div>
              <div className="text-lg font-wedding text-black">11:58</div>
              <div className="text-xs text-gray-600 mt-1">良辰吉时</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">地点</div>
              <div className="text-lg font-wedding text-black">幸福大酒店</div>
              <div className="text-xs text-gray-600 mt-1">北京市朝阳区幸福路123号</div>
            </div>
          </div>
        </div>
        
        {/* 装饰性文字 */}
        <div className="mt-8">
          <p className="text-sm text-black leading-relaxed">
            "最大的幸福就是能把自己的手放在你的手心<br/>
            与你一起走完这浪漫的一生"
          </p>
        </div>
      </div>
    </section>
  )
} 