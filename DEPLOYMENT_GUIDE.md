# 🚀 Discover China - 部署指南

## 📋 部署前检查清单

### ✅ 环境要求
- **Node.js**: 18.0.0 或更高版本
- **MongoDB**: 5.0+ (本地或 MongoDB Atlas)
- **域名**: 用于生产环境部署
- **SSL证书**: HTTPS 访问

### ✅ 依赖服务
- **邮件服务**: SMTP 配置 (Gmail/SendGrid/阿里云邮件)
- **社交登录**: Facebook/Twitter API 密钥
- **地图服务**: 高德地图/百度地图 API (可选)

## 🌐 部署平台选择

### 1. Vercel (推荐)
**优势**: 
- 与 Next.js 完美集成
- 自动部署和扩展
- 免费 SSL 证书
- 全球 CDN

**步骤**:
```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 配置环境变量 (在 Vercel Dashboard)
# 5. 设置自定义域名
```

### 2. Netlify
**优势**:
- 简单易用
- 表单处理
- 静态站点优化

### 3. AWS/阿里云
**优势**:
- 完全控制
- 高性能
- 企业级安全

## 🔧 环境变量配置

### 必需环境变量
```env
# 数据库
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-to-china

# 认证
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secret-key-here

# 邮件服务 (Gmail 示例)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@your-domain.com
```

### 可选环境变量
```env
# 社交登录
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# 地图服务
AMAP_API_KEY=your-amap-api-key
BAIDU_MAP_API_KEY=your-baidu-map-api-key

# 分析工具
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

## 📊 数据库设置

### MongoDB Atlas (推荐)
1. **创建集群**
   - 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - 创建免费集群
   - 配置网络访问 (允许所有 IP: 0.0.0.0/0)

2. **创建数据库用户**
   ```
   用户名: travel-china-user
   密码: 生成强密码
   权限: Read and write to any database
   ```

3. **获取连接字符串**
   ```
   mongodb+srv://travel-china-user:<password>@cluster0.xxxxx.mongodb.net/travel-to-china?retryWrites=true&w=majority
   ```

### 数据初始化
```bash
# 部署后运行数据种子脚本
npm run seed
```

## 🔐 安全配置

### 1. 环境变量安全
- ❌ 永远不要将 `.env` 文件提交到 Git
- ✅ 使用平台环境变量管理
- ✅ 定期轮换密钥

### 2. 数据库安全
- ✅ 启用 MongoDB 认证
- ✅ 限制网络访问
- ✅ 定期备份数据

### 3. 应用安全
- ✅ 使用 HTTPS
- ✅ 设置安全头部
- ✅ 输入验证和清理

## 📧 邮件服务配置

### Gmail SMTP (个人/小型项目)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password  # 需要开启两步验证并生成应用密码
```

### SendGrid (企业级)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### 阿里云邮推 (中国用户)
```env
SMTP_HOST=smtpdm.aliyun.com
SMTP_PORT=80
SMTP_USER=your-account@your-domain.com
SMTP_PASS=your-smtp-password
```

## 🔑 社交登录配置

### Facebook 登录
1. 访问 [Facebook Developers](https://developers.facebook.com/)
2. 创建应用 → 添加 Facebook 登录产品
3. 配置重定向 URI: `https://your-domain.com/api/auth/callback/facebook`
4. 获取 App ID 和 App Secret

### Twitter 登录
1. 访问 [Twitter Developer](https://developer.twitter.com/)
2. 创建应用 → 启用 OAuth 2.0
3. 配置回调 URL: `https://your-domain.com/api/auth/callback/twitter`
4. 获取 Client ID 和 Client Secret

## 🗺️ 地图服务集成

### 高德地图 (推荐中国用户)
1. 访问 [高德开放平台](https://lbs.amap.com/)
2. 创建应用 → 获取 API Key
3. 配置域名白名单

### 百度地图
1. 访问 [百度地图开放平台](https://lbsyun.baidu.com/)
2. 创建应用 → 获取 AK
3. 配置服务类型

## 📈 性能优化

### 1. 图片优化
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### 2. CDN 配置
- 使用 Vercel Edge Network (自动)
- 或配置 CloudFlare CDN
- 优化静态资源缓存

### 3. 数据库优化
- 创建适当索引
- 使用连接池
- 实施查询缓存

## 🔍 SEO 优化

### 1. 搜索引擎优化
```javascript
// app/layout.tsx 中已配置
export const metadata = {
  title: 'Discover China - Your Ultimate Travel Guide',
  description: '...',
  // 完整的 SEO 配置
}
```

### 2. Sitemap 生成
```bash
# 添加到 package.json
"scripts": {
  "postbuild": "next-sitemap"
}
```

### 3. 结构化数据
- 景点信息的 JSON-LD
- 面包屑导航
- 评论和评分标记

## 📊 监控和分析

### 1. Vercel Analytics
```bash
npm i @vercel/analytics
```

### 2. Google Analytics
```javascript
// 在 layout.tsx 中集成 GA4
```

### 3. 错误监控
```bash
npm i @sentry/nextjs
```

## 🚀 部署流程

### 自动化部署 (推荐)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

### 手动部署步骤
```bash
# 1. 构建项目
npm run build

# 2. 测试构建
npm run start

# 3. 部署到 Vercel
vercel --prod

# 4. 验证部署
curl -I https://your-domain.com
```

## ✅ 部署后检查

### 功能测试
- [ ] 主页加载正常
- [ ] 用户注册/登录
- [ ] 景点浏览和搜索
- [ ] 攻略阅读
- [ ] 评论系统
- [ ] 管理后台 (仅管理员)
- [ ] 多语言切换
- [ ] 移动端响应式
- [ ] 邮件发送
- [ ] 社交登录

### 性能测试
- [ ] 页面加载速度 < 3秒
- [ ] Core Web Vitals 达标
- [ ] 移动端性能优化
- [ ] 图片懒加载工作

### SEO 检查
- [ ] Meta 标签正确
- [ ] Sitemap 生成
- [ ] 结构化数据
- [ ] 页面标题唯一

## 🛠️ 维护和更新

### 定期任务
- **每周**: 检查系统日志和错误
- **每月**: 更新依赖包
- **每季度**: 安全漏洞扫描
- **每年**: SSL 证书更新

### 备份策略
- **数据库**: 自动每日备份
- **文件**: Git 版本控制
- **配置**: 环境变量备份

### 监控指标
- **性能**: 响应时间、错误率
- **用户**: 活跃用户、转化率
- **业务**: 新用户注册、内容访问

## 📞 技术支持

### 常见问题
1. **构建失败**: 检查 Node.js 版本和依赖
2. **数据库连接**: 验证 MongoDB URI 和网络
3. **邮件不发送**: 检查 SMTP 配置和防火墙
4. **社交登录失败**: 验证回调 URL 和密钥

### 获取帮助
- **文档**: [Next.js Docs](https://nextjs.org/docs)
- **社区**: [GitHub Issues](https://github.com/your-repo/issues)
- **支持**: contact@your-domain.com

---

**🎉 恭喜！您的中国旅行攻略网站已准备就绪！**

按照这个指南，您将拥有一个完全功能的、生产级的旅游网站。记住定期更新和维护以确保最佳性能和安全性。