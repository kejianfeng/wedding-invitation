import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { InvitationCardProps } from '@/pages'

export default function HeroSection({ invitationName, currentGuest }: InvitationCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleWelcomeConfirm = () => {
    setShowWelcomeModal(false)
    // 开始播放音乐
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* 音频元素 */}
      <audio
        ref={audioRef}
        src="https://www.hunlihu.com/sysmusic/131a43efbfa84433bd7e7fe9ac1da932.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* 欢迎弹窗 */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center">
            <Image src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/e289181ce8cd41c9a03fefbe5465f8ce.jpg" alt="欢迎" width={300} height={600} />
            <p className="text-sm text-white  my-4 leading-relaxed px-2 font-wedding">
              <span> {currentGuest?.nickName || invitationName || '大人'}，</span>
              <span >请帖来啦！</span>
            </p>
            <button
              onClick={handleWelcomeConfirm}
              className="w-full bg-white text-gray-800 py-2 px-8 rounded-full text-lg shadow-lg border border-gray-200"
            >
              <span className="relative z-10">一起见证！</span>
            </button>
          </div>

        </div>
      )}

      <Image
        src="https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/ba7aae3b62d64efb9cc55a41f1f24ef7.jpg"
        alt="婚礼背景"
        width={375}
        height={600}
        className="w-full h-[600px] object-cover"
        priority
      />

      {/* 音乐播放按钮 - 右上角 */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleMusic}
          className="w-12 h-12 flex items-center justify-center transition-all duration-300"
        >
          <Image
            src="https://h.hunlihu.com/static/inv/png/play_2-c19e7a5a.png"
            alt="音乐播放"
            width={24}
            height={24}
            className={`w-6 h-6 transition-transform duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
          />
        </button>
      </div>

      {/* 顶部装饰元素 */}
      <div className="absolute left-0 top-0 m-12 pointer-events-none">
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
          <div className="mb-8">
            <p className="text-sm mb-2 opacity-90 font-light">好久不见·婚礼见</p>
            <p className="text-lg font-light">2025.10.02</p>
          </div>
        </div>
      </div>

      {/* 新郎新娘名字区域 - 参考设计图 */}
      <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center space-x-2 ">
        <div className="text-center">
          <p className="text-base font-wedding text-black font-light tracking-wide">柯剑烽</p>
        </div>
        <div className="text-xl text-black font-light opacity-60">/</div>
        <div className="text-center">
          <p className="text-base font-wedding  text-black font-light tracking-wide">黄菲霞</p>
        </div>
        <div>
          <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-center space-x-2">
            <div className="text-center">
              <p className="text-xs font-english opacity-80 tracking-wider text-black uppercase">GROOM</p>
            </div>
            <div className="text-xl text-black font-light opacity-60 invisible">/</div>
            <div className="text-center">
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