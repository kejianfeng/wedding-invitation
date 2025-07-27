import React from 'react'
import { X } from 'lucide-react'

interface ImageModalProps {
  isOpen: boolean
  imageSrc: string | string[]
  onClose: () => void
}

export default function ImageModal({ isOpen, imageSrc, onClose, }: ImageModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-2xl hover:opacity-80 z-50"
      >
        <X size={24} />
      </button>
      {Array.isArray(imageSrc) ? (
        <div className="flex flex-wrap justify-center gap-4">
          {imageSrc.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="预览图片"
              className="max-w-[90%] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ))}
        </div>
      ) : (
        <img
          src={imageSrc}
          alt="预览图片"
          className="max-w-[90%] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  )
} 