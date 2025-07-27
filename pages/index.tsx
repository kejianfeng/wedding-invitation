import React, { useState } from 'react'
import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import InvitationCard from '../components/InvitationCard'
import PhotoGallery from '../components/PhotoGallery'
import WeddingDetails from '../components/WeddingDetails'
import MapSection from '../components/MapSection'
import SignatureSection from '../components/SignatureSection'
import BottomActions from '../components/BottomActions'
import ImageModal from '../components/ImageModal'

export default function Home() {
  const [modalImage, setModalImage] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (imageSrc: string | string[]) => {
    setModalImage(imageSrc as string)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalImage('')
  }

  return (
    <>
      <Head>
        <title>婚礼请柬 - 柯剑烽 & 黄菲霞</title>
        <meta name="description" content="柯剑烽与黄菲霞的婚礼邀请函" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen mx-auto relative bg-background">
        {/* 首页英雄区域 */}
        <HeroSection />

        {/* 邀请卡片 */}
        <InvitationCard />

        {/* 照片画廊 */}
        <PhotoGallery onImageClick={handleImageClick} />

        {/* 新人签名和邀请文字 */}
        <SignatureSection />
        {/* 婚礼详情和倒计时 */}
        <WeddingDetails />


        {/* 底部操作按钮 */}
        <BottomActions />

        {/* 图片模态框 */}
        <ImageModal
          isOpen={isModalOpen}
          imageSrc={modalImage}
          onClose={handleCloseModal}
        />
      </main>
    </>
  )
} 