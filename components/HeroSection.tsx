import React from 'react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="https://www.hunlihu.com/userphoto/194774_293b84739997b14ad0d4de69b.jpg"
        alt="婚礼背景"
        width={375}
        height={600}
        className="w-full h-[600px] object-cover"
        priority
      />
      
      {/* 顶部装饰元素 */}
      <div className="absolute top-[1.425rem] left-[1.4rem] w-[7.3125rem] h-[3.4775rem] z-[7] pointer-events-none opacity-100">
        <Image
          src="https://h.hunlihu.com/sysma/1_b81e042e5b98fc40fc65013b3.png"
          alt="装饰元素"
          width={117}
          height={55}
          className="w-full h-full object-cover"
          style={{
            transform: 'rotate(0deg) scale(1) translateZ(0.01px)',
          }}
        />
      </div>
      
      {/* 内容层 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <div className="text-center">
          {/* 中央装饰元素 - 替代"We Got Married"文字 */}
          <div className="mb-8 flex justify-center">
            <div className="w-[8rem] h-[4rem]">
              <Image
                src="https://h.hunlihu.com/sysma/1_b81e042e5b98fc40fc65013b3.png"
                alt="婚礼装饰"
                width={128}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-sm mb-2 opacity-90 font-light">好久不见·婚礼见</p>
            <p className="text-xl font-light">2025.10.02</p>
          </div>
          
          {/* 装饰性分割线 */}
          <div className="w-16 h-px bg-white opacity-60 mb-8 mx-auto"></div>
          
          {/* 新郎新娘名字区域 - 参考设计图 */}
          <div className="flex items-center justify-center space-x-2">
            <div className="text-center">
              <p className="text-base font-wedding mb-2 text-black font-light tracking-wide">柯剑烽</p>
              <p className="text-xs font-english opacity-80 tracking-wider text-black uppercase">GROOM</p>
            </div>
            <div className="text-3xl text-black font-light opacity-60">/</div>
            <div className="text-center">
              <p className="text-base font-wedding mb-2 text-black font-light tracking-wide">黄菲霞</p>
              <p className="text-xs font-english opacity-80 tracking-wider text-black uppercase">BRIDE</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部mask过渡 */}
      <div className="hero-mask-transition"></div>
    </div>
  )
} 