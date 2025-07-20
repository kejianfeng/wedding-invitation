import React from 'react'
import Image from 'next/image'

export default function SignatureSection() {
  return (
    <section className="py-12 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-wedding text-black mb-4">新人签名</h2>
        <p className="text-sm text-gray-600">Our Signatures</p>
      </div>
      
      <div className="px-6">
        {/* 新人照片 */}
        <div className="flex space-x-4 mb-8">
          <div className="flex-1 text-center">
            <div className="relative w-full aspect-[4/5] mb-4">
              <Image
                src="https://www.hunlihu.com/userphoto/194774_5f660475495b91827d638e84b.jpg"
                alt="新郎照片"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <p className="text-lg font-wedding text-black">柯剑烽</p>
            <p className="text-xs text-gray-600">丨</p>
          </div>
          
          <div className="flex-1 text-center">
            <div className="relative w-full aspect-[4/5] mb-4">
              <Image
                src="https://www.hunlihu.com/userphoto/194774_5d6f54766a3cc0086e0a3151a.jpg"
                alt="新娘照片"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <p className="text-lg font-wedding text-black">黄菲霞</p>
            <p className="text-xs text-gray-600">丨</p>
          </div>
        </div>
        
        {/* 签名文字 */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-black leading-relaxed">
              我的心如身在旷野的小鸟<br/>
              已经从你的眼睛里找到了<br/>
              自己的天空
            </p>
            <p className="text-xs text-gray-600 italic">
              My heart, the bird of the wilderness<br/>
              has found its sky in your eye.
            </p>
          </div>
        </div>
        
        {/* 装饰性元素 */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
        
        {/* 邀请文字 */}
        <div className="text-center">
          <h3 className="text-xl font-wedding text-black mb-4">诚挚邀请</h3>
          <div className="space-y-2 text-sm text-black leading-relaxed">
            <p>这是一封心意满满的婚礼邀请函</p>
            <p>收到这封邀请函的你们</p>
            <p>都是我们人生中最重要的部分</p>
            <p>诚挚邀请您携家人参加我们的婚礼</p>
            <p>见证我们的爱情</p>
            <p>感谢您一直以来的支持与关爱</p>
            <p>我们携手期待着您的到来</p>
          </div>
          
          <div className="mt-6 text-xs text-gray-600 italic">
            <p>To Our Family And Friends,</p>
            <p>Thank You For Celebrating Our Special Day,</p>
            <p>Supporting Us And Sharing Our Love.</p>
          </div>
        </div>
        
        {/* 装饰性文字 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-black leading-relaxed">
            "也许这世界上美好的事情很多<br/>
            但我心底最美好的人，只有你一个"
          </p>
        </div>
      </div>
    </section>
  )
} 