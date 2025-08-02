import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

interface PhotoGalleryProps {
  onImageClick: (imageSrc: string | string[]) => void
}

// 懒加载图片组件
const LazyImage = ({
  src,
  alt,
  className = "",
  onClick,
  priority = false
}: {
  src: string
  alt: string
  className?: string
  onClick?: () => void
  priority?: boolean
}) => {
  const [isLoaded, setIsLoaded] = useState(priority)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  // 检查元素是否在视口中
  const checkInView = useCallback(() => {
    if (!imgRef.current) return

    const rect = imgRef.current.getBoundingClientRect()
    const isVisible = (
      rect.top <= window.innerHeight + 200 && // 提前200px开始加载
      rect.bottom >= -200
    )

    if (isVisible && !isInView) {
      setIsInView(true)
    }
  }, [isInView])

  // 监听滚动事件
  useEffect(() => {
    if (priority) return // 首屏图片不需要懒加载

    checkInView()
    window.addEventListener('scroll', checkInView)
    window.addEventListener('resize', checkInView)

    return () => {
      window.removeEventListener('scroll', checkInView)
      window.removeEventListener('resize', checkInView)
    }
  }, [checkInView, priority])

  return (
    <div
      ref={imgRef}
      className={`relative group cursor-pointer overflow-hidden ${className}`}
      onClick={onClick}
      data-src={src} // 记录真正的URL
    >
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      ) : (
        // 占位符
        <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">加载中...</div>
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
    </div>
  )
}

export default function PhotoGallery({ onImageClick }: PhotoGalleryProps) {
  return (
    <section className="py-8 bg-background text-xs">
      <div className="text-center mb-8">
        <h2 className="text-lg font-wedding text-black mb-2">11年，挚爱如初</h2>
        <p className="text-sm text-gray-600  font-english">Our Love Story</p>
      </div>
      {/* 初遇 - 首屏图片，优先加载 */}
      <div className="space-y-6 ">
        <div className='pt-4 pb-4  bg-black'>
          <LazyImage
            src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/fa7f37e6b83f4e3ca0a66d42453c9096.jpg"
            alt="初遇"
            className="w-full"
            onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/fa7f37e6b83f4e3ca0a66d42453c9096.jpg")}
            priority={true}
          />
          <p className='text-white text-xs mt-2 font-english text-center'>As the clouds and mist dissipate, I love you and everyone knows it</p>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6">

        <div className="text-left mt-6 font-wedding">
          <div className="text-xs  leading-8">
            <p> 第一次见到你时</p>
            <p> 我就知道我的生活将因你而改变</p>
            <p> 那一刻，时间仿佛静止</p>
            <p> 世界只剩下你</p>
          </div>
        </div>
        {/* 海边 - 懒加载 */}
        <div>
          <LazyImage
            src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/12ed27b1485841278292c90b38f4bbed.jpg"
            alt="海边照片1"
            className="w-full mb-4"
            onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/12ed27b1485841278292c90b38f4bbed.jpg")}
          />
          <LazyImage
            src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/becd0b7aa73b4be8befe72bd4f171648.jpg"
            alt="海边照片2"
            className="w-full mb-4"
            onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/becd0b7aa73b4be8befe72bd4f171648.jpg")}
          />
          <LazyImage
            src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/cd9a97c476624aafa0c7546f9a9373fb.jpg"
            alt="海边照片3"
            className="w-full mb-4"
            onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/cd9a97c476624aafa0c7546f9a9373fb.jpg")}
          />

          <div className="text-right mt-8 font-wedding leading-8">
            <p> 人生再长，也长不过四季 </p>
            <p> 余生袅袅，我只想牵着你的手 </p>
            <p> 奔往世间所有美好的存在里 </p>
            <p> 漫漫亦灿灿，年年又岁岁 </p>

          </div>
        </div>
        {/* 草地 */}
        <div className="flex flex-row gap-4 items-center">
          <div className="w-3/4">
            <LazyImage
              src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/1d9cce927d1b4902a14319eefb2313ee.jpg"
              alt="草地照片"
              className="w-full"
              onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/1d9cce927d1b4902a14319eefb2313ee.jpg")}
            />
          </div>
          <div className="w-1/4 text-center space-y-3">
            <p className="text-gray-600 font-english text-sm md:text-lg writing-mode-vertical-rl transform" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              You make my heart smile
            </p>
          </div>
        </div>

        {/* 草地 */}
        <div className="flex flex-row-reverse gap-4 items-center mt-12">
          <div className="w-2/3">
            <LazyImage
              src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/b12f1e45996c41979bc9f44b65f923bb.jpg"
              alt="婚纱照"
              className="w-full"
              onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/b12f1e45996c41979bc9f44b65f923bb.jpg")}
            />
          </div>
          <div className='w-1/2 relative left-4 z-50' >
            <LazyImage
              src="https://h.hunlihu.com/sysma/1_a15de4444b77369b1f66d8fc0.png"
              alt="装饰图片"
              className="w-full"
              onClick={() => onImageClick("https://h.hunlihu.com/sysma/1_a15de4444b77369b1f66d8fc0.png")}
            />
          </div>

        </div>
        {/* 英文分界 */}
        <div className='flex justify-around'>
          {/* <svg className='w-full' xmlns="http://www.w3.org/2000/svg" width="691.157" height="13.969" viewBox="0 0 691.157 13.969" preserveAspectRatio="none">
            <defs>
            </defs>
            <path id="_without_love_" data-name="{ without love }" d="M34.828,40.31c-0.615-.21-1.05-0.8-1.05-2.355V35.8c0-1.635-.99-1.995-1.68-1.995,0.69,0,1.68-.51,1.68-2.16V29.48c0-1.56.435-2.13,1.05-2.355l-0.015-.15a2.2,2.2,0,0,0-2.085,2.5v1.755c0,2.37-.6,2.31-1.185,2.49V33.89c0.585,0.165,1.185.09,1.185,2.31v1.755a2.2,2.2,0,0,0,2.085,2.5Zm7.71-12.869v2.64h0.2a2.468,2.468,0,0,1,2.76-2.445h0.885v8.91a1.017,1.017,0,0,1-1.08,1.26V38h3.66v-0.2a1.026,1.026,0,0,1-1.095-1.26v-8.91h0.885c0.21,0,2.715.03,2.775,2.445h0.2V27.44h-9.18Zm19.14,2.085c0-1.455.03-1.755,0.735-1.89v-0.2H59.757v0.2c0.42,0.135.435,0.435,0.435,1.89V32.81h-4.11V29.525c0-1.455.015-1.755,0.435-1.89v-0.2h-2.67v0.2c0.72,0.135.75,0.54,0.75,1.89V35.96c0,1.44.045,1.635-.75,1.845V38h2.67v-0.2c-0.42-.15-0.435-0.315-0.435-1.845V33.065h4.11V35.96c0,1.335-.03,1.695-0.435,1.845V38h2.655v-0.2c-0.78-.21-0.735-0.615-0.735-1.845V29.525ZM71.862,34.88c-0.315,3-2.97,2.925-4.3,2.925h-0.69v-5.04h0.975c0.375,0,1.995.015,2.07,1.515h0.195V31.055H69.912c-0.075,1.515-1.665,1.515-2.07,1.515H66.868V27.635h0.81c1.215,0,3.81.03,3.99,2.5h0.2v-2.7h-7.35v0.2c0.66,0,.81.48,0.81,1.41v7.2c0,1.02-.18,1.56-0.81,1.56V38h7.545V34.88H71.862Zm15.06,2.025c0.78-1.23.45-2.895-1.56-4.215l-2.475-1.635c-2.265-1.47-1.035-3.555.585-3.555,2.5,0,3.09,1.56,3.225,3.03h0.21V28.01a7.55,7.55,0,0,0-3.435-.705,3.249,3.249,0,0,0-2.82,1.17c-1.155,1.77.21,3.135,1.635,4.08l2.49,1.605c1.755,1.245,1.455,3.78-.825,3.78-2.55,0-3.225-1.695-3.39-3.525h-0.18V37.3a6.278,6.278,0,0,0,3.57.84C86.277,38.135,86.922,36.905,86.922,36.905Zm11.4-4.11c0,4.125-1.365,5.145-3.135,5.145s-3.15-1.02-3.15-5.145c0-4.11,1.365-5.295,3.15-5.295S98.322,28.685,98.322,32.8Zm1.74,0c0-2.97-1.575-5.49-4.875-5.49s-4.875,2.52-4.875,5.49c0,2.985,1.575,5.34,4.875,5.34S100.062,35.78,100.062,32.8Zm7.035,5.34a3.376,3.376,0,0,0,3.645-3.675V30.38c0-1.41-.045-2.745,1.92-2.745v-0.2h-3.9v0.2c1.755,0,1.785,1.335,1.785,2.745v4.08a2.691,2.691,0,0,1-2.715,3,2.631,2.631,0,0,1-2.729-2.925v-5.58c0-1.185.54-1.32,1.184-1.32v-0.2h-3.734v0.2c0.66,0,1.065.285,1.065,1.3V34.4A3.38,3.38,0,0,0,107.1,38.135Zm15.48-3.39c-0.255,3.06-2.8,3.075-4.41,3.06h-0.539V28.97c0-1.08.464-1.335,1.109-1.335v-0.2h-3.569v0.2c0.645,0,.945.345,0.945,1.26v7.32c0,1.02-.18,1.59-0.825,1.59V38h7.484V34.745h-0.2Zm8.566,5.715a2.2,2.2,0,0,0,2.085-2.5V36.2c0-2.22.6-2.145,1.184-2.31V33.725c-0.585-.18-1.184-0.12-1.184-2.49V29.48a2.2,2.2,0,0,0-2.085-2.5l-0.015.15c0.615,0.225,1.05.8,1.05,2.355v2.16c0,1.65.99,2.16,1.679,2.16-0.689,0-1.679.36-1.679,1.995v2.16c0,1.56-.435,2.145-1.05,2.355ZM309.7,40.779c-0.615-.21-1.05-0.8-1.05-2.355v-2.16c0-1.635-.99-1.995-1.68-1.995,0.69,0,1.68-.51,1.68-2.16V29.95c0-1.56.435-2.13,1.05-2.355l-0.015-.15a2.2,2.2,0,0,0-2.085,2.5V31.7c0,2.37-.6,2.31-1.185,2.49V34.36c0.585,0.165,1.185.09,1.185,2.31v1.755a2.2,2.2,0,0,0,2.085,2.5Zm16.47-5.415a3.2,3.2,0,0,1-3.24,3.045c-1.515,0-3.285-.615-3.285-5.22,0-4.53,1.725-5.22,3.285-5.22,1.215,0,2.82.57,3.24,3.045h0.2l0.18-2.325a5.351,5.351,0,0,0-3.615-.915c-3.105,0-5.205,2.04-5.205,5.415,0,3.345,2.1,5.415,5.205,5.415a5.7,5.7,0,0,0,3.615-.93l-0.18-2.31h-0.2Zm5.145-.285,1.815-4.98,1.965,4.98h-3.78Zm7.47,3.195c-0.42-.03-0.735-0.015-1.23-1.215,0,0-1.86-4.74-3.69-9.15H333.7l-2.5,6.825c-1.305,3.465-1.68,3.525-2.25,3.54v0.2h3.345v-0.2c-2.085.06-1.425-1.8-1.02-3h3.885l0.525,1.3c0.345,0.84.5,1.695-.315,1.695v0.2h3.42v-0.2Zm9.24-10.365v0.18c1.98,0,1.965,2.16,1.965,3.555v4.635l-6.48-8.37h-2.775v0.18c0.39,0.03.825-.06,1.785,1.14l0.615,0.795v4.695c0,1.35,0,3.555-2.175,3.555v0.2h4.335v-0.2c-1.965,0-1.965-2.235-1.965-3.555V30.25l6.375,8.22h0.48V31.645c0-1.395-.045-3.555,2.13-3.555V27.91h-4.29Zm13.605,0v0.18c1.98,0,1.965,2.16,1.965,3.555v4.635l-6.48-8.37h-2.775v0.18c0.39,0.03.825-.06,1.785,1.14l0.615,0.795v4.695c0,1.35,0,3.555-2.175,3.555v0.2H358.9v-0.2c-1.965,0-1.965-2.235-1.965-3.555V30.25l6.375,8.22h0.48V31.645c0-1.395-.045-3.555,2.13-3.555V27.91h-4.29Zm14.79,5.355c0,4.125-1.365,5.145-3.135,5.145s-3.15-1.02-3.15-5.145c0-4.11,1.365-5.295,3.15-5.295S376.417,29.155,376.417,33.265Zm1.74,0c0-2.97-1.575-5.49-4.875-5.49s-4.875,2.52-4.875,5.49c0,2.985,1.575,5.34,4.875,5.34S378.157,36.249,378.157,33.265Zm2.49-5.355v2.64h0.195A2.468,2.468,0,0,1,383.6,28.1h0.885v8.91a1.017,1.017,0,0,1-1.08,1.26v0.2h3.66v-0.2a1.026,1.026,0,0,1-1.1-1.26V28.1h0.885c0.21,0,2.715.03,2.775,2.445h0.195V27.91h-9.18Zm24.315,7.3c-0.255,3.06-2.805,3.075-4.41,3.06h-0.54V29.44c0-1.08.465-1.335,1.11-1.335v-0.2h-3.57v0.2c0.645,0,.945.345,0.945,1.26v7.32c0,1.02-.18,1.59-0.825,1.59v0.2h7.485V35.214h-0.195Zm3.36-7.3v0.2a0.954,0.954,0,0,1,1.05,1.185v7.575c0,1.02-.405,1.41-1.05,1.41v0.2h3.645v-0.2c-0.63,0-1.05-.39-1.05-1.41V29.29a0.959,0.959,0,0,1,1.05-1.185v-0.2h-3.645Zm12.945,0v0.2c2.16,0,1.275,2.16.81,3.555l-1.86,4.935-2.67-7.155a0.947,0.947,0,0,1,.9-1.335v-0.2h-4.035v0.2a1.322,1.322,0,0,1,1.425,1.095s1.785,4.86,3.63,9.27h0.21l2.58-6.78c1.365-3.585,1.74-3.585,2.73-3.585v-0.2h-3.72Zm13.395,7.44c-0.315,3-2.97,2.925-4.3,2.925h-0.69V33.23h0.975c0.375,0,2,.015,2.07,1.515h0.195V31.52H708.85c-0.075,1.515-1.665,1.515-2.07,1.515h-0.975V28.1h0.81c1.215,0,3.81.03,3.99,2.5H710.8V27.9h-7.35V28.1c0.66,0,.81.48,0.81,1.41v7.2c0,1.02-.18,1.56-0.81,1.56v0.2H711v-3.12h-0.2Zm8.61,5.58a2.2,2.2,0,0,0,2.085-2.5V36.664c0-2.22.6-2.145,1.185-2.31V34.19c-0.585-.18-1.185-0.12-1.185-2.49V29.945a2.2,2.2,0,0,0-2.085-2.5l-0.015.15c0.615,0.225,1.05.795,1.05,2.355V32.1c0,1.65.99,2.16,1.68,2.16-0.69,0-1.68.36-1.68,2v2.16c0,1.56-.435,2.145-1.05,2.355Z" transform="translate(-31.531 -26.969)" fill="rgba(67,67,67,1)"></path>
          </svg> */}
          {/* {LOVE} */}
          <span className='font-english text-xs'>{'{LOVE}'}</span>
          <span className='font-english text-xs'>{'{AND}'}</span>
          <span className='font-english text-xs'>{'{UP}'}</span>
        </div>
        {/* 草地 */}        <div className="">
          <div >
            <div className="text-center my-8 font-wedding leading-8">
              <p> 在每个黄昏，以一袭温婉，共你语 </p>
              <p> 陪你，度过漫长岁月 </p>
            </div>
            <div className='flex justify-center gap-4'>
              <LazyImage
                src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/072cf9f5aefe4f84903c7656c2ddd472.jpg"
                alt="草地照片1"
                className="w-full mb-4"
                onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/072cf9f5aefe4f84903c7656c2ddd472.jpg")}
              />
              <LazyImage
                src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/45793d7cadb3440b810fc78c2d4b14a4.jpg"
                alt="草地照片1"
                className="w-full mb-4"
                onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/45793d7cadb3440b810fc78c2d4b14a4.jpg")}
              />
            </div>
            <div className="text-center my-8 font-wedding leading-8">
              <p> 也许这世界上美好的事情很多 </p>
              <p> 但我心底最美好的人，只有你一个 </p>

            </div>
            <LazyImage
              src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/695797d7125c4b26b1e2e42417c739f4.jpg"
              alt="婚纱照1"
              className="w-full mb-4"
              onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/695797d7125c4b26b1e2e42417c739f4.jpg")}
            />
            <LazyImage
              src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/5ac3132478884ef291fd464c7618567e.jpg"
              alt="婚纱照2"
              className="w-full"
              onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/5ac3132478884ef291fd464c7618567e.jpg")}
            />
          </div>
        </div>

        {/* 永恒的爱 */}
        <div className="space-y-4">

          <div className="text-xs text-center leading-8 font-wedding ">
            <div className='flex justify-center'>
              <LazyImage
                src="https://h.hunlihu.com/sysma/1_6bf8447219f4a08321f99ad6f.png"
                alt="装饰图片"
                className="w-1/4 "
                onClick={() => onImageClick("https://h.hunlihu.com/sysma/1_6bf8447219f4a08321f99ad6f.png")}
              />
            </div>
            <p> 婚礼是我们俩做的一个勇敢的决定</p>
            <p>我们希望它温馨质朴</p>
            <p>不拘泥于形式，不匆忙，慢慢来</p>
            <p>邀请此刻正在看请柬的你 </p>
          </div>
          <LazyImage
            src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/f5790ca9d87f42c7a65169bf5e429528.jpg"
            alt="永恒的爱"
            className="w-full"
            onClick={() => onImageClick("https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/f5790ca9d87f42c7a65169bf5e429528.jpg")}
          />
        </div>
        {/* 底部装饰 */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-block">
            <p className="text-xs text-gray-500 italic">
              "Love is not finding someone to live with,<br />
              it's finding someone you can't live without."
            </p>
          </div>
        </div>
      </div>
    </section >
  )
}
