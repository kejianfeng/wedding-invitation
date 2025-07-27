import React from 'react'
import Image from 'next/image'


export default function BottomActions() {

  return (
    <section className="py-8 bg-background">
      <div className="px-6">
        <Image
          src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/492d7f1a1a7a44138da05139c629a8c3.jpg"
          alt="婚纱照"
          width={800}
          height={600}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Image
          src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/6d185c1c00ea42ecb96a46f015c99f2a.jpg"
          alt="婚纱照"
          width={800}
          height={600}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />


        {/* 底部装饰 */}
        <div className="mt-8 text-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4"></div>
          <p className="text-xs text-gray-600">
            柯剑烽 & 黄菲霞<br />
            2025年10月02日
          </p>
        </div>
      </div>
    </section>
  )
} 