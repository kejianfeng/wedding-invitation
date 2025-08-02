import React, { useState, useEffect } from 'react'
import MapSection from './MapSection'
import { InvitationCardProps } from '../pages'

export default function WeddingDetails({ currentGuest }: InvitationCardProps) {
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
    <section className="py-4 bg-background">
      {/* 婚礼信息 */}
      <div className="px-6 text-center">
        <div className="mb-8">
          <div className="space-y-4">
            <div className="p-6 shadow-sm">
              {/* { 日期  } */}
              <div className="text-sm text-gray-600 mb-4"> /  婚礼日期  / </div>
              <div className="text-sm text-black">2025年10月02日 </div>
              <div className="text-sm text-gray-600 mt-1">农历八月十一（星期四）</div>
              <div className="text-sm text-gray-600 mt-1">中午11:30 恭候入席</div>
            </div>

            <div className="pt-6">
              <div className="text-sm text-gray-600 mb-2"> / 婚礼地点 / </div>
              <div className="text-sm text-black">茂名市化州官桥镇</div>
              <div className="text-sm text-gray-600 mt-1">读田村文化广场</div>
            </div>
            <MapSection />
          </div>
        </div>

        {/* 装饰性文字 */}
        <div className="mt-8">
          <p className="text-sm text-black leading-relaxed">
            {/* "最大的幸福就是能把自己的手放在你的手心<br />
            与你一起走完这浪漫的一生" */}
            {currentGuest?.extraText}
          </p>
        </div>
      </div>
      <div className="text-center mt-12">
        <h2 className="text-lg font-wedding text-black mb-4">婚礼倒计时</h2>
        <p className="text-sm text-gray-600 font-english">Countdown to Our Special Day</p>
      </div>

      {/* 倒计时组件 */}
      <div className="flex justify-center mt-10">
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

    </section>
  )
} 