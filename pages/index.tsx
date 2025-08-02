import React, { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import InvitationCard from '../components/InvitationCard'
import PhotoGallery from '../components/PhotoGallery'
import WeddingDetails from '../components/WeddingDetails'
import MapSection from '../components/MapSection'
import SignatureSection from '../components/SignatureSection'
import BottomActions from '../components/BottomActions'
import ImageLightbox from '../components/ImageLightbox'
import { useRouter } from 'next/router'
import { guest } from '@/utils/guest'

export interface InvitationCardProps {
  invitationName: string
  currentGuest: any
}

export default function Home() {
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [invitationName, setInvitationName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // 在客户端安全地获取 URL 参数
    if (router.isReady) {
      const name = router.query.name as string
      if (name) {
        setInvitationName(name)
      }
    }
  }, [router.isReady, router.query.name])

  const currentGuest = useMemo(() => {
    return guest.find(item => item.name === invitationName)
  }, [invitationName])

  const handleImageClick = (imageSrc: string | string[]) => {
    if (Array.isArray(imageSrc)) {
      setLightboxImages(imageSrc)
      setLightboxIndex(0)
    } else {
      setLightboxImages([imageSrc])
      setLightboxIndex(0)
    }
    setIsLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false)
    setLightboxImages([])
    setLightboxIndex(0)
  }

  const commonProps = {
    invitationName,
    currentGuest,
  }

  return (
    <>
      <Head>
        <title>婚礼请柬 - 柯剑烽 & 黄菲霞</title>
        <meta name="description" content="柯剑烽与黄菲霞的婚礼邀请函" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
      </Head>

      <main className="min-h-screen mx-auto relative bg-background">
        {/* 首页英雄区域 */}
        <HeroSection {...commonProps} />

        {/* 邀请卡片 */}
        <InvitationCard {...commonProps} />

        {/* 照片画廊 */}
        <PhotoGallery onImageClick={handleImageClick} />

        {/* 新人签名和邀请文字 */}
        <SignatureSection />
        {/* 婚礼详情和倒计时 */}
        <WeddingDetails {...commonProps} />

        {/* 底部操作按钮 */}
        <BottomActions />

        {/* 图片查看器 */}
        <ImageLightbox
          isOpen={isLightboxOpen}
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={handleCloseLightbox}
        />
      </main>
    </>
  )
} 