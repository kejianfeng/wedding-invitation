import React from 'react'
import Image from 'next/image'

export default function MapSection() {
  // 婚礼地点坐标（茂名市化州官桥镇读田村文化广场）
  const venueLocation = {
    name: '读田村文化广场',
    address: '茂名市化州官桥镇读田村文化广场',
    latitude: 21.6633,
    longitude: 110.9253
  }

  // 微信地图链接
  const getWeChatMapUrl = () => {
    return `https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${encodeURIComponent(venueLocation.name)}&tocoord=${venueLocation.latitude},${venueLocation.longitude}&referer=wedding-invitation`
  }

  // 高德地图链接（备用）
  const getAmapUrl = () => {
    return `https://uri.amap.com/navigation?to=${venueLocation.longitude},${venueLocation.latitude},${encodeURIComponent(venueLocation.name)}&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`
  }

  // 百度地图链接（备用）
  const getBaiduMapUrl = () => {
    return `https://api.map.baidu.com/marker?location=${venueLocation.latitude},${venueLocation.longitude}&title=${encodeURIComponent(venueLocation.name)}&content=${encodeURIComponent(venueLocation.address)}&output=html&src=webapp.baidu.openAPIdemo`
  }

  // 检测是否在微信环境
  const isWeChat = () => {
    if (typeof window !== 'undefined') {
      return /MicroMessenger/i.test(navigator.userAgent)
    }
    return false
  }

  // 处理地图点击
  const handleMapClick = () => {
    if (isWeChat()) {
      // 微信环境使用微信地图
      window.location.href = getWeChatMapUrl()
    } else {
      // 非微信环境使用高德地图
      window.open(getAmapUrl(), '_blank')
    }
  }

  return (
    <section className=" bg-background">
      {/* <div className="text-center mb-12">
        <h2 className="text-2xl font-wedding text-black mb-4">交通指南</h2>
        <p className="text-sm text-gray-600">Wedding Venue</p>
      </div> */}

      <div className="px-6">
        {/* 地图容器 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div
            className="relative h-64 cursor-pointer"
            onClick={handleMapClick}
          >
            {/* 背景图片 - 透明度60% */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://www.hunlihu.com/userphoto/194774_0d58c4489bae873bfd44cdeeb.jpg"
                alt=""
                fill
                className="object-cover opacity-80"
              />
            </div>

            {/* 使用真实地图图片 */}
            <div className="relative z-10 h-full">
              <Image
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(110.9253,21.6633)/110.9253,21.6633,12,0/600x300@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                fill
                alt=""
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 z-20">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <p className="text-lg  mb-2">读田村文化广场</p>
                <p className="text-sm opacity-90 mb-3">茂名市化州官桥镇</p>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <p className="text-xs">点击查看地图导航</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* 装饰性文字 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-black leading-relaxed">
            "希望春风能对你温柔点<br />
            拂去烦躁，满目皆是柔情"
          </p>
        </div>
      </div>
    </section>
  )
} 