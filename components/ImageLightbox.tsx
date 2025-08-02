import React from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ImageLightboxProps {
  isOpen: boolean
  images: string[]
  initialIndex: number
  onClose: () => void
}

export default function ImageLightbox({
  isOpen,
  images,
  initialIndex,
  onClose
}: ImageLightboxProps) {
  // 将图片URL转换为lightbox需要的格式
  const slides = images.map((src, index) => ({
    src,
    alt: `图片 ${index + 1}`,
  }))

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={initialIndex}
      slides={slides}
      carousel={{
        finite: true,
      }}
      animation={{
        fade: 300,
        swipe: 300,
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      render={{
        buttonPrev: images.length <= 1 ? () => null : undefined,
        buttonNext: images.length <= 1 ? () => null : undefined,
      }}
    />
  )
} 