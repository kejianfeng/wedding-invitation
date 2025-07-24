import React from 'react'

export default function BottomActions() {
  const handleAction = (action: string) => {
    switch (action) {
      case 'call':
        window.location.href = 'tel:13800138000'
        break
      case 'message':
        window.location.href = 'sms:13800138000'
        break
      case 'map':
        // 打开地图导航
        const address = encodeURIComponent('北京市朝阳区幸福路123号')
        window.open(`https://uri.amap.com/navigation?to=${address}&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`)
        break
      default:
        break
    }
  }

  return (
    <section className="py-8 bg-background">
      <div className="px-6">
        {/* 联系信息 */}
        {/* <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-lg font-wedding text-black mb-4 text-center">联系我们</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">新郎电话</span>
              <span className="text-sm font-medium text-black">138-0013-8000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">新娘电话</span>
              <span className="text-sm font-medium text-black">139-0013-9000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">婚礼时间</span>
              <span className="text-sm font-medium text-black">2025.10.02 11:58</span>
            </div>
          </div>
        </div> */}

        {/* 操作按钮 */}
        {/* <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleAction('call')}
            className="bg-primary text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>拨打电话</span>
          </button>

          <button
            onClick={() => handleAction('message')}
            className="bg-secondary text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-secondary/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
            <span>发送短信</span>
          </button>

          <button
            onClick={() => handleAction('map')}
            className="bg-accent text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-accent/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>导航前往</span>
          </button>
        </div> */}

        {/* 底部装饰 */}
        <div className="mt-8 text-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4"></div>
          <p className="text-xs text-gray-600">
            柯剑烽 & 黄菲霞<br />
            2025年10月02日
          </p>
        </div>
      </div>
    </section>
  )
} 