import React from 'react'
import Image from 'next/image'

interface PhotoGalleryProps {
  onImageClick: (imageSrc: string) => void
}

export default function PhotoGallery({ onImageClick }: PhotoGalleryProps) {
  const content = [
    {
      text: "我们的相遇，是命运最美的安排。在茫茫人海中，我们找到了彼此，从此生命有了新的意义。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_7676849d098edcdbd42b12815.jpg",
        alt: "相遇时刻"
      }
    },
    {
      text: "每一次的约会，都是我们爱情故事中最珍贵的篇章。那些平凡的日子里，因为有你的陪伴而变得格外美好。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_c36784a8ca35639a657d1ce81.jpg",
        alt: "约会时光"
      }
    },
    {
      text: "我们一起走过春夏秋冬，见证了彼此的成长。每一个季节都有属于我们的回忆，每一个瞬间都值得珍藏。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_ca91e400793d3a329facf2bb0.jpg",
        alt: "四季回忆"
      }
    },
    {
      text: "求婚的那一天，是我人生中最紧张也最幸福的时刻。当你点头的那一刻，我知道我们的未来将更加美好。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_d5f5e4108a8185f3bfcef009c.jpg",
        alt: "求婚时刻"
      }
    },
    {
      text: "婚纱照的拍摄，让我们重新体验了恋爱的甜蜜。镜头前的每一个笑容，都是我们爱情最真实的写照。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_e72274864b7adb6a6515d77cc.jpg",
        alt: "婚纱照"
      }
    },
    {
      text: "筹备婚礼的过程中，我们更加深刻地理解了什么是责任与承诺。每一个细节都承载着我们对未来的期待。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_eac264ceda67f424e97e37675.jpg",
        alt: "婚礼筹备"
      }
    },
    {
      text: "亲朋好友的祝福，让我们感受到了爱的力量。有你们的见证，我们的婚礼将更加完美。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_0040142949b7b091d0021ba90.jpg",
        alt: "亲友祝福"
      }
    },
    {
      text: "即将步入婚姻殿堂的我们，对未来充满了期待。我们相信，有爱的地方就是家，有你的地方就是天堂。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_0d58c4489bae873bfd44cdeeb.jpg",
        alt: "未来期待"
      }
    },
    {
      text: "兜兜圈圈遇到你，至此世间无限美好。感谢命运让我们相遇，感谢爱情让我们相守。",
      image: {
        src: "https://www.hunlihu.com/userphoto/194774_51ecd4d58bee05fe0a4e8be69.jpg",
        alt: "美好时光"
      }
    }
  ]

  return (
    <section className="py-12 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-wedding text-black mb-4">我们的爱情故事</h2>
        <p className="text-sm text-gray-600">Our Love Story</p>
      </div>
      
      <div className="px-6 space-y-12">
        {content.map((item, index) => (
          <div key={index} className="space-y-6">
            {/* 文字部分 */}
            <div className="text-center">
              <p className="text-sm text-black leading-relaxed px-4">
                {item.text}
              </p>
            </div>
            
            {/* 图片部分 */}
            <div className="relative group cursor-pointer overflow-hidden w-full">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={375}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                onClick={() => onImageClick(item.image.src)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* 分隔线（除了最后一个） */}
            {index < content.length - 1 && (
              <div className="flex justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* 底部装饰性文字 */}
      <div className="mt-12 text-center px-6">
        <p className="text-xs text-gray-600 italic">
          "love and freedom. you and gentleness"
        </p>
      </div>
    </section>
  )
} 