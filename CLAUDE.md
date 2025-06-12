# 项目部署配置

## 基本信息
- **项目名称**: travel-to-china (中国旅游网站)
- **项目路径**: /Users/luxiang/Cursor/AI-project/travel-to-china
- **自定义域名**: https://explorechina.top
- **技术栈**: Next.js 14, TypeScript, Tailwind CSS

## GitHub 配置
- **仓库地址**: https://github.com/evox327/travel-to-china.git
- **用户名**: evox327
- **主分支**: main
- **推送命令**:
  ```bash
  git add .
  git commit -m "更新内容"
  git push origin main
  ```

### 快速 Git 操作
```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "描述更改内容"

# 推送到 GitHub
git push origin main

# 检查状态
git status
```

## Cloudflare Pages 部署配置

### 项目信息
- **项目名称**: travel-to-china
- **生产域名**: explorechina.top
- **临时域名**: travel-to-china.pages.dev

### 部署流程
1. **构建项目**:
   ```bash
   npm run build
   ```

2. **准备部署文件**:
   ```bash
   rm -rf deploy && mkdir -p deploy/_next
   cp -r .next/server/app/* deploy/
   cp -r .next/static deploy/_next/
   cp -r public/* deploy/
   ```

3. **部署到 Cloudflare Pages**:
   ```bash
   wrangler pages deploy deploy --project-name=travel-to-china --commit-dirty=true
   ```

### 部署配置文件
- **wrangler.toml**: 已配置
- **缓存控制**: _headers 文件已配置
- **路由重定向**: _redirects 文件已配置

### 关键配置
- **兼容性日期**: 2023-10-02
- **Node.js 兼容**: 已启用
- **静态资源路径**: /_next/static/
- **HTML 文件路径**: deploy/ 根目录

## 完整部署工作流

### 1. 推送到 GitHub
```bash
git add .
git commit -m "描述更改内容"
git push origin main
```

### 2. 部署到 Cloudflare Pages
```bash
# 一键部署命令 (按顺序执行)
npm run build
rm -rf deploy && mkdir -p deploy/_next
cp -r .next/server/app/* deploy/
cp -r .next/static deploy/_next/
cp -r public/* deploy/
wrangler pages deploy deploy --project-name=travel-to-china --commit-dirty=true
```

### 3. 完整工作流 (GitHub + Cloudflare)
```bash
# 步骤1: 推送到 GitHub
git add .
git commit -m "更新网站内容"
git push origin main

# 步骤2: 部署到 Cloudflare
npm run build
rm -rf deploy && mkdir -p deploy/_next
cp -r .next/server/app/* deploy/
cp -r .next/static deploy/_next/
cp -r public/* deploy/
wrangler pages deploy deploy --project-name=travel-to-china --commit-dirty=true
```

## 验证部署
- **检查最新部署**: `wrangler pages deployment list --project-name=travel-to-china`
- **测试访问**: https://explorechina.top
- **CSS 验证**: https://explorechina.top/_next/static/css/[hash].css

## Google Analytics 配置
- **状态**: ✅ 已成功集成
- **追踪 ID**: G-BBBBVNMHG4
- **组件位置**: components/GoogleAnalytics.tsx
- **实现方式**: 直接在 HTML head 中嵌入 gtag 代码
- **访问统计**: https://analytics.google.com/
- **数据流ID**: 11333326603
- **验证**: 网站首页已包含 Google Analytics 代码

## Google Search Console 配置
- **URL**: https://search.google.com/search-console
- **用途**: 监控搜索表现、索引状态、SEO问题
- **验证方法**: 
  1. 添加 explorechina.top 作为资源
  2. 使用 Google Analytics 验证或 HTML 标签验证
  3. 提交网站地图: https://explorechina.top/sitemap.xml

## 注意事项
1. **API 路由限制**: 静态部署无法运行 API，已添加静态数据备用方案
2. **缓存清理**: 部署后可能需要 5-15 分钟域名同步
3. **文件大小限制**: 单文件不超过 25MB
4. **构建输出**: 使用 standalone 模式，然后手动组织文件结构
5. **Analytics**: 需要设置 Google Analytics 追踪 ID 才能查看访问数据

## 故障排除
- **404 错误**: 检查文件路径和部署结构
- **CSS 不加载**: 确认 /_next/static/ 路径正确
- **域名不同步**: 等待 CDN 缓存更新或强制刷新浏览器
- **构建失败**: 检查 search 页面和 API 路由问题

## 版本发布记录
- **v0.13** (2025-06-11): 添加网站图标和PWA应用图标
- **v0.12** (2025-06-11): 修复构建错误，成功部署到 Cloudflare Pages
- **v0.11** (2025-06-10): 图片本地化完成
- **v0.10** (2025-06-10): 修复构建错误，成功集成 Google Analytics
- **v0.9** (2025-06-10): 添加 Google Analytics 支持  
- **v0.8** (2025-06-10): 更新部署配置文件
- **v0.7** (2025-06-10): 添加 Cloudflare Pages 部署配置和静态数据备用方案

## 当前部署信息
- **Cloudflare Pages URL**: https://b1911040.travel-to-china.pages.dev
- **自定义域名**: https://explorechina.top
- **GitHub 版本**: v0.13 (待推送)
- **Google Analytics**: ✅ 已激活 (G-BBBBVNMHG4)
- **网站图标**: ✅ 已添加 SVG 格式图标

---
*最后更新: 2025-06-11*
*当前版本: v0.13*
*部署状态: ✅ 正常运行*