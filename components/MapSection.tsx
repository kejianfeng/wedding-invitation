import React from 'react'
import Image from 'next/image'

export default function MapSection() {
  return (
    <section className="py-12 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-wedding text-black mb-4">婚礼地点</h2>
        <p className="text-sm text-gray-600">Wedding Venue</p>
      </div>
      
      <div className="px-6">
        {/* 地图容器 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-64">
            <Image
              src="https://h.hunlihu.com/sysma/1_74e3b4aeb82e762de4acd3a6f.png"
              alt="婚礼地点地图"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <p className="text-lg font-wedding">幸福大酒店</p>
                <p className="text-sm opacity-90">北京市朝阳区幸福路123号</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 地点信息 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-wedding text-black mb-4">交通指南</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-xs">🚇</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-black">地铁</p>
                  <p className="text-xs text-gray-600">地铁6号线幸福路站A出口，步行5分钟</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-xs">🚌</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-black">公交</p>
                  <p className="text-xs text-gray-600">123路、456路幸福路站下车</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-xs">🚗</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-black">自驾</p>
                  <p className="text-xs text-gray-600">酒店提供免费停车位</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-wedding text-black mb-4">酒店信息</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">联系电话：010-12345678</p>
              <p className="text-sm text-gray-600">营业时间：24小时</p>
              <p className="text-sm text-gray-600">设施：免费WiFi、停车场、餐厅</p>
            </div>
          </div>
        </div>
        
        {/* 装饰性文字 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-black leading-relaxed">
            "希望春风能对你温柔点<br/>
            拂去烦躁，满目皆是柔情"
          </p>
        </div>
      </div>
    </section>
  )
} 