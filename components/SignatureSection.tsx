import React from 'react'
import Image from 'next/image'

export default function SignatureSection() {
  return (
    <section className="py-4 bg-gradient-to-b from-white to-gray-50">
      <div className="px-6">
        {/* 顶部标题 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-wedding text-black mb-6">婚礼邀请</h2>

          {/* 装饰元素 - love */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-gray-300"></div>
            <span className="mx-4 text-red-700 font-wedding text-lg">
              <Image
                src="https://img.alicdn.com/imgextra/i1/2210508254720/O1CN013y15or1kjoDkPpdvL_!!2210508254720.png"
                alt="love"
                width={100}
                height={100}
                className="object-cover"
              />
            </span>
            <div className="w-16 h-px bg-gray-300"></div>
          </div>
          {/* 英文标题 */}
          <p className="text-sm font-english text-black uppercase tracking-wide">WELCOME TO OUR WEDDING</p>
        </div>

        {/* 新人照片区域 */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          {/* 新郎照片 */}
          <div className="text-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="https://www.hunlihu.com/userphoto/194774_5f660475495b91827d638e84b.jpg"
                alt="新郎照片"
                fill
                className="p-1 object-cover rounded-full border border-gray-300"
              />
            </div>
          </div>

          {/* 新娘照片 */}
          <div className="text-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="https://www.hunlihu.com/userphoto/194774_5d6f54766a3cc0086e0a3151a.jpg"
                alt="新娘照片"
                fill
                className="p-1 object-cover rounded-full border border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 