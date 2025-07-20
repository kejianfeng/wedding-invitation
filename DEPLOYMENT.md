# 婚礼邀请应用部署指南

## 自动部署配置

本项目使用 GitHub Actions 进行自动构建和部署。当代码推送到 `main` 分支时，会自动触发构建和部署流程。

### 部署流程

1. **代码推送** → 推送到 `main` 分支
2. **自动构建** → GitHub Actions 在 Ubuntu 环境中构建应用
3. **代码检查** → 运行 ESLint 检查代码质量
4. **构建应用** → 执行 `npm run build` 生成生产版本
5. **部署到服务器** → 将构建产物传输到服务器
6. **重启应用** → 使用 PM2 重启应用

### 服务器要求

- Node.js 18.x 或更高版本
- PM2 进程管理器
- 足够的磁盘空间用于应用部署

### GitHub Secrets 配置

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中配置以下密钥：

- `SERVER_IP`: 服务器IP地址
- `SERVER_USER`: 服务器用户名
- `SERVER_PASSWORD`: 服务器密码
- `SERVER_PORT`: SSH端口（通常是22）

### 服务器目录结构

```
/data/wedding-invitation/
├── .next/           # Next.js 构建产物
├── public/          # 静态资源
├── package.json     # 项目配置
├── package-lock.json # 依赖锁定文件
├── ecosystem.config.js # PM2 配置文件
└── logs/           # 应用日志目录
```

### 手动部署

如果需要手动部署，可以在服务器上执行：

```bash
cd /data/wedding-invitation
npm ci --only=production
pm2 restart ecosystem.config.js
```

### 查看应用状态

```bash
# 查看 PM2 进程状态
pm2 status

# 查看应用日志
pm2 logs wedding-invitation

# 重启应用
pm2 restart wedding-invitation
```

### 故障排除

1. **构建失败**: 检查 GitHub Actions 日志
2. **部署失败**: 检查服务器连接和权限
3. **应用无法启动**: 检查 PM2 日志和端口占用
4. **内存不足**: 调整 PM2 配置中的内存限制 