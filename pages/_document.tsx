import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Pacifico&display=swap" rel="stylesheet" />
        
        {/* 微信JS-SDK */}
        <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
        
        {/* 微信分享基础meta标签 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        {/* Open Graph 标签 - 微信分享使用 */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="婚礼邀请函" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="好久不见，期待婚礼上能见到你" />
        <meta property="og:image" content="https://www.hunlihu.com/userphoto/194774_293b84739997b14ad0d4de69b.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* 微信分享专用标签 */}
        <meta name="wechat:title" content="" />
        <meta name="wechat:description" content="好久不见，期待婚礼上能见到你" />
        <meta name="wechat:image" content="https://www.hunlihu.com/userphoto/194774_293b84739997b14ad0d4de69b.jpg" />
        
        {/* 其他分享平台 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="好久不见，期待婚礼上能见到你" />
        <meta name="twitter:image" content="https://www.hunlihu.com/userphoto/194774_293b84739997b14ad0d4de69b.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 