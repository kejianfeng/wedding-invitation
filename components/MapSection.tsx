import React, { useRef, useEffect, useState } from 'react'

// 声明全局 AMap 类型
declare global {
  interface Window {
    AMap: any
    _AMapSecurityConfig: any
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
    const initMap = async () => {
      try {
        // 动态导入 AMapLoader，避免 SSR 问题
        const AMapLoader = (await import('@amap/amap-jsapi-loader')).default

        // 使用 AMapLoader 加载地图
        const AMap = await AMapLoader.load({
          key: "2ce7774365913f8bceeb89bfa6ca85a0", // 申请好的Web端开发者Key
          version: "2.0", // 指定要加载的 JSAPI 的版本
          plugins: ["AMap.ToolBar", "AMap.Scale", "AMap.MapType"], // 需要使用的插件列表
        })

        if (mapContainerRef.current) {
          // 创建地图实例
          const map = new AMap.Map(mapContainerRef.current, {
            viewMode: "2D", // 是否为3D地图模式
            zoom: 10, // 初始化地图级别
            center: [venueLocation.longitude, venueLocation.latitude], // 初始化地图中心点位置
            resizeEnable: true,
            dragEnable: true, // 启用拖拽
            zoomEnable: true, // 启用缩放
            doubleClickZoom: true, // 启用双击缩放
            scrollWheel: true, // 启用滚轮缩放
            touchZoom: true, // 启用触摸缩放
            keyboardEnable: false, // 禁用键盘控制
            jogEnable: true, // 启用缓动效果
            animateEnable: true, // 启用动画效果
            expandZoomRange: true, // 扩展缩放范围
            zooms: [3, 20], // 缩放级别范围
            pitch: 0, // 俯仰角
            rotation: 0, // 旋转角
          })

          setMapInstance(map)

          // 等待地图加载完成后添加控件
          map.on('complete', () => {
            console.log('高德地图加载完成')

            // 添加工具栏插件
            const toolbar = new AMap.ToolBar({
              position: 'RB' // 右下角
            })
            map.addControl(toolbar)

            // 添加比例尺插件
            const scale = new AMap.Scale({
              position: 'LB' // 左下角
            })
            map.addControl(scale)

            // 添加地图类型控件
            const mapType = new AMap.MapType({
              position: 'RT' // 右上角
            })
            map.addControl(mapType)
          })

          // 创建标记点
          const marker = new AMap.Marker({
            position: [venueLocation.longitude, venueLocation.latitude],
            title: venueLocation.name,
            icon: new AMap.Icon({
              size: new AMap.Size(60, 80), // 增大尺寸以容纳照片和图标
              image: 'https://itapis.cvte.com/cfile/c1e09cc9-a0ba-4487-a2a0-eae7d99e74b3/v2/download/e289181ce8cd41c9a03fefbe5465f8ce.jpg',
              imageSize: new AMap.Size(50, 60),
              imageOffset: new AMap.Pixel(-100, -100) // 调整偏移，使底部对齐
            }),
            offset: new AMap.Pixel(-30, -80), // 标记点偏移
            animation: 'AMAP_ANIMATION_BOUNCE'
          })

          marker.setMap(map)

          // 创建简洁的信息窗口
          const infoWindow = new AMap.InfoWindow({
            content: `
              <div style="padding: 16px; background: #FDFEFF; border-radius: 12px; box-shadow: 0 8px 32px rgba(186, 155, 138, 0.15); border: 1px solid #E8F2FF; max-width: 300px;">
                <div style="text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #2D3748; font-size: 12px; font-family: 'WeddingFont', sans-serif;">欢迎参加我们的婚礼</p>
                  <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E8F2FF;">
                    <button onclick="window.open('${getAmapNavigationUrl()}', '_blank')" style="background: #BA9B8A; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; font-family: 'WeddingFont', sans-serif; transition: all 0.2s ease;">导航到这里</button>
                  </div>
                </div>
              </div>
            `,
            offset: new AMap.Pixel(-30, -60),
            closeWhenClickMap: true,
            autoMove: true
          })

          // 点击标记点显示信息窗口
          marker.on('click', () => {
            infoWindow.open(map, marker.getPosition())
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
            className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 border-2 border-primary"
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