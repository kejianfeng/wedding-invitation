# 微信分享功能配置指南

## 🔧 完整配置要求

### 1. **微信服务号要求**
- ✅ 必须是**已认证的服务号**
- ❌ 未认证的服务号无法使用分享接口
- ❌ 订阅号无法使用分享接口

### 2. **域名配置**
在微信公众平台配置JS接口安全域名：
1. 登录微信公众平台 → 服务号设置 → 功能设置
2. 填写"JS接口安全域名"
3. 最多可填写5个合法域名
4. 域名需通过ICP备案验证
5. 新备案域名需24小时后才可配置

### 3. **环境变量配置**
创建 `.env.local` 文件并配置以下参数：

```bash
# 微信服务号AppID
WECHAT_APP_ID=your_app_id_here

# 微信服务号AppSecret  
WECHAT_APP_SECRET=your_app_secret_here

# 网站域名
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. **后端接口实现**
需要完善 `pages/api/wechat-signature.ts` 文件中的以下函数：

#### 获取access_token
```typescript
async function getAccessToken(appId: string, appSecret: string): Promise<string> {
  const response = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
  )
  const data = await response.json()
  return data.access_token
}
```

#### 获取jsapi_ticket
```typescript
async function getJsapiTicket(accessToken: string): Promise<string> {
  const response = await fetch(
    `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
  )
  const data = await response.json()
  return data.ticket
}
```

### 5. **缓存机制**
由于access_token和jsapi_ticket都有有效期限制，建议实现缓存机制：

- access_token: 有效期为2小时
- jsapi_ticket: 有效期为2小时

建议使用Redis或内存缓存来存储这些值。

### 6. **测试步骤**

1. **配置域名**：确保域名已在微信公众平台配置
2. **设置环境变量**：配置AppID和AppSecret
3. **实现后端接口**：完善签名生成逻辑
4. **微信内测试**：在微信中打开链接测试分享功能

### 7. **常见问题**

#### Q: 为什么分享不生效？
A: 检查以下几点：
- 服务号是否已认证
- 域名是否已配置
- AppID和AppSecret是否正确
- 签名是否正确生成

#### Q: 如何调试？
A: 在微信开发者工具中：
- 开启调试模式：`debug: true`
- 查看控制台错误信息
- 检查网络请求是否成功

#### Q: 分享图片不显示？
A: 确保图片URL：
- 可以正常访问
- 支持HTTPS
- 图片大小适中（建议小于32KB）

### 8. **分享效果**
配置成功后，用户分享时显示：
- **标题**：`{name}，邀请你参加我们的婚礼`
- **描述**：`好久不见，期待婚礼上能见到你`
- **图片**：婚礼主图
- **链接**：当前页面URL

### 9. **注意事项**
- 分享功能仅在微信内有效
- 需要HTTPS域名
- 图片需要支持HTTPS访问
- 建议对分享内容进行A/B测试优化 