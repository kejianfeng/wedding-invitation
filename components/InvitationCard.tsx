import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { guest } from '../utils/guest'
import { InvitationCardProps } from '../pages'

export default function InvitationCard({ invitationName, currentGuest }: InvitationCardProps) {
  return (
    <div className="relative bg-gradient-to-b from-white via-background to-background rounded-t-3xl z-10 overflow-hidden">
      <div className="flex justify-center pointer-events-none">
        <Image
          src="https://h.hunlihu.com/sysma/1_5ee41461a91d900440cc6a184.png"
          // src="https://img.alicdn.com/imgextra/i4/2210508254720/O1CN01LYOUTS1kjoDniZcvd_!!2210508254720.jpg"
          alt="底部装饰"
          width={100}
          height={60}
          className="w-8/12 object-cover"
        />
      </div>

      <p className="mt-4 text-sm font-wedding  text-center tracking-widest text-text-wedding"> 我们的「婚礼邀请」</p>
      <div className="relative px-8 py-16">
        {/* 顶部装饰线 */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>

        {/* 主要内容 */}
        <div className="text-center space-y-8">
          {/* 致亲爱的 */}
          <div className="space-y-4">
            {invitationName && <> <p className="tracking-widest text-xs text-gray-500 uppercase font-light">
              致亲爱的
            </p>
              <div className="relative">
                <p className="font-wedding text-2xl text-black mb-2 relative z-10">
                  {invitationName}
                </p>
              </div></>}
            {/* https://img.alicdn.com/imgextra/i4/2210508254720/O1CN01eQcTqH1kjoDclSC3t_!!2210508254720.png */}
            <div className="flex justify-center">
              <Image
                src="https://img.alicdn.com/imgextra/i4/2210508254720/O1CN01eQcTqH1kjoDclSC3t_!!2210508254720.png"
                alt="love"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
          </div>

          {/* 嗨当您看到这篇文章的时候我们的婚礼已经进入倒计时啦~在这不平凡的一年我们决定携手踏进人生的新阶段成为彼此生命中最重要的人 */}
          {/* 邀请文字 */}
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-3">
              <p className="text-sm text-black leading-relaxed font-light">
                嗨 👋 ～～～ 诚挚邀请您参加我们的婚礼
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                一起见证与感受
              </p>

              <p className="text-xs text-gray-600 leading-relaxed font-light">
                小烽烽与小菲霞这独一无二的时刻
              </p>
            </div>

            {/* 分隔装饰 */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/40"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/40"></div>
            </div>

            <p className="text-xs text-gray-500 italic font-light">
              "期待你的到来，赋予那天特别的意义"
            </p>
            {/* <iframe width={330} height={86} src="//music.163.com/outchain/player?type=2&id=2003171285&auto=1&height=66" allow="autoplay"></iframe> */}
          </div>
        </div>

        {/* 底部装饰线 */}
        <div className="flex justify-center mt-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
      </div>
    </div >
  )
} 