# 婚礼邀请函

一个基于 Next.js 的美观婚礼邀请函页面，专为柯剑烽与黄菲霞的婚礼打造。

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库
- **Framer Motion** - 动画库（可选）

## 功能特点

- 📱 移动优先的响应式设计
- 🖼️ 多种布局的照片画廊
- 🔍 图片点击放大预览
- 🗺️ 地图导航集成
- 🎵 音乐播放控制
- 📤 分享功能
- ✅ 出席确认

## 项目结构

```
wedding-invitation/
├── components/
│   ├── HeroSection.tsx      # 英雄区域
│   ├── InvitationCard.tsx   # 邀请卡片
│   ├── PhotoGallery.tsx     # 照片画廊
│   ├── WeddingDetails.tsx   # 婚礼详情
│   ├── MapSection.tsx       # 地图区域
│   ├── BottomActions.tsx    # 底部操作栏
│   ├── ImageModal.tsx       # 图片预览弹窗
│   └── SignatureSection.tsx # 签名区域
├── pages/
│   ├── _app.tsx            # App 组件
│   ├── _document.tsx       # Document 组件
│   └── index.tsx           # 主页面
├── styles/
│   └── globals.css         # 全局样式
└── ...
```

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 构建和部署

1. 构建项目：
```bash
npm run build
```

2. 启动生产服务器：
```bash
npm start
```

## 自定义配置

### 修改新人信息
在 `components/HeroSection.tsx` 和 `components/SignatureSection.tsx` 中修改新人姓名。

### 修改邀请对象
在 `components/InvitationCard.tsx` 中修改被邀请人的姓名。

### 修改婚礼详情
在 `components/WeddingDetails.tsx` 中修改婚礼时间、地点等信息。

### 更换照片
在 `components/PhotoGallery.tsx` 中更换图片 URL。

### 主题色彩
在 `tailwind.config.js` 中修改主题色彩：

```javascript
colors: {
  primary: '#A78295',    // 主色调
  secondary: '#F7E6E0',  // 辅助色
  background: '#FAFAFA'  // 背景色
}
```

## 注意事项

- 页面设计为移动优先，基础宽度为 375px
- 所有图片都使用了 Next.js Image 组件进行优化
- 支持图片懒加载和占位符
- 使用了 Google Fonts 中的中文字体 "Ma Shan Zheng"

## 许可证

MIT License 