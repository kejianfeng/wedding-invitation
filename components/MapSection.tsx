import React, { useRef, useEffect, useState } from 'react'

// 声明全局 AMap 类型
declare global {
  interface Window {
    AMap: any
  }
}

export default function MapSection() {
  // 婚礼地点坐标（茂名市化州官桥镇读田村文化广场）
  const venueLocation = {
    name: '读田村文化广场',
    address: '茂名市化州官桥镇读田村文化广场',
    // 110.53732,21.711983
    latitude: 21.711983,
    longitude: 110.53732
  }

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)

  // 初始化高德地图
  useEffect(() => {
    // 动态加载高德地图脚本
    const loadAMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.AMap) {
          resolve()
          return
        }

        const script = document.createElement('script')
        script.src = `https://webapi.amap.com/maps?v=2.0&key=2ce7774365913f8bceeb89bfa6ca85a0&plugin=AMap.MapType`
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load AMap script'))
        document.head.appendChild(script)
      })
    }

    const initMap = async () => {
      try {
        await loadAMapScript()

        if (mapContainerRef.current && window.AMap) {
          // 创建地图实例
          const map = new window.AMap.Map(mapContainerRef.current, {
            zoom: 16,
            center: [venueLocation.longitude, venueLocation.latitude],
            dragEnable: true,
            zoomEnable: true,
            doubleClickZoom: true,
            scrollWheel: true,
            touchZoom: true,
            keyboardEnable: false,
            jogEnable: true,
            animateEnable: true,
            resizeEnable: true,
            expandZoomRange: true,
            zooms: [3, 20],
            pitch: 0,
            rotation: 0,
            viewMode: '2D'
          })

          setMapInstance(map)

          // 设置地图样式 - 使用正确的方式
          // map.setMapStyle('amap://styles/hybrid')

          // 创建标记点
          const marker = new window.AMap.Marker({
            position: [venueLocation.longitude, venueLocation.latitude],
            title: venueLocation.name,
            icon: new window.AMap.Icon({
              size: new window.AMap.Size(60, 80), // 增大尺寸以容纳照片和图标
              image: 'https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/e289181ce8cd41c9a03fefbe5465f8ce.jpg',
              imageSize: new window.AMap.Size(50, 60),
              imageOffset: new window.AMap.Pixel(-100, -100) // 调整偏移，使底部对齐
            }),
            offset: new window.AMap.Pixel(-30, -80), // 标记点偏移
            animation: 'AMAP_ANIMATION_BOUNCE'
          })

          marker.setMap(map)

          // 创建导航按钮标记点
          // const navMarker = new window.AMap.Marker({
          //   position: [venueLocation.longitude + 0.0001, venueLocation.latitude + 0.0001], // 稍微偏移位置
          //   title: '导航',
          //   // icon: new window.AMap.Icon({
          //   //   size: new window.AMap.Size(32, 32),
          //   //   image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRjZCNkIiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNOSAyMGwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOC4xN2wtOSA5eiIvPgo8L3N2Zz4KPC9zdmc+',
          //   //   imageSize: new window.AMap.Size(32, 32),
          //   //   imageOffset: new window.AMap.Pixel(-16, -16)
          //   // }),
          //   offset: new window.AMap.Pixel(-16, -16),
          //   animation: 'AMAP_ANIMATION_BOUNCE'
          // })

          // navMarker.setMap(map)

          // 点击导航按钮标记点
          // navMarker.on('click', () => {
          //   handleNavigationClick()
          // })

          // 创建信息窗口
          // const infoWindow = new window.AMap.InfoWindow({
          //   content: `
          //     <div style="padding: 15px;background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          //       <div style="display: flex; align-items: center; margin-bottom: 8px;">
          //         <div style="width: 8px; height: 8px; background: #FF6B6B; border-radius: 50%; margin-right: 8px;"></div>
          //         <h3 style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">${venueLocation.name}</h3>
          //       </div>
          //       <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.4;">${venueLocation.address}</p>
          //     </div>
          //   `,
          //   offset: new window.AMap.Pixel(0, -30),
          //   closeWhenClickMap: true,
          //   autoMove: true
          // })

          // 点击标记点显示信息窗口
          marker.on('click', () => {
            // 移除导航功能，避免重复调用
            // handleNavigationClick()
          })

          // 点击地图其他地方隐藏信息窗口
          // map.on('click', () => {
          //   infoWindow.close()
          // })

          // 添加地图加载完成事件
          map.on('complete', () => {
            console.log('高德地图加载完成')
          })

          // 添加地图错误事件
          map.on('error', (error: any) => {
            console.error('高德地图加载错误:', error)
          })
        }
      } catch (error) {
        console.error('Failed to initialize AMap:', error)
      }
    }

    initMap()

    // 清理函数
    return () => {
      if (mapInstance) {
        mapInstance.destroy()
      }
    }
  }, [])

  // 高德地图导航链接
  const getAmapNavigationUrl = () => {
    return `https://uri.amap.com/navigation?to=${venueLocation.longitude},${venueLocation.latitude},${encodeURIComponent(venueLocation.name)}&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`
  }

  // 微信地图链接（备用）
  const getWeChatMapUrl = () => {
    return `https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${encodeURIComponent(venueLocation.name)}&tocoord=${venueLocation.latitude},${venueLocation.longitude}&referer=wedding-invitation`
  }

  // 检测是否在微信环境
  const isWeChat = () => {
    if (typeof window !== 'undefined') {
      return /MicroMessenger/i.test(navigator.userAgent)
    }
    return false
  }

  // 处理导航按钮点击
  const handleNavigationClick = () => {
    if (isWeChat()) {
      // 微信环境使用微信地图
      window.location.href = getWeChatMapUrl()
    } else {
      // 非微信环境使用高德地图
      window.open(getAmapNavigationUrl(), '_blank')
    }
  }

  return (
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* 地图容器 */}
        <div className="rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <div
              ref={mapContainerRef}
              className="w-full h-full"
              style={{ minHeight: '384px' }}
            />
          </div>
        </div>

        {/* 装饰性文字 */}
        <div className="flex justify-center">
          <button
            onClick={handleNavigationClick}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 border-2 border-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            导航到婚礼地点
          </button>
        </div>
      </div>
    </section>
  )
} 