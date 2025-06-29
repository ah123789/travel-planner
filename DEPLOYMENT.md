# 部署指南 - 让你的旅行计划应用上线

## 🚀 快速部署方案

### 方案一：Vercel（推荐 - 免费且简单）

1. **注册 Vercel 账号**
   - 访问 https://vercel.com
   - 使用 GitHub、GitLab 或邮箱注册

2. **连接代码仓库**
   - 将代码推送到 GitHub/GitLab
   - 在 Vercel 中点击 "New Project"
   - 选择你的代码仓库

3. **自动部署**
   - Vercel 会自动检测到 Vite 项目
   - 点击 "Deploy" 即可完成部署
   - 获得类似 `https://your-app.vercel.app` 的网址

### 方案二：Netlify（免费且功能丰富）

1. **注册 Netlify 账号**
   - 访问 https://netlify.com
   - 使用 GitHub 账号登录

2. **部署步骤**
   - 点击 "New site from Git"
   - 选择你的代码仓库
   - 构建命令：`npm run build`
   - 发布目录：`dist`
   - 点击 "Deploy site"

3. **自定义域名**
   - 在 Netlify 中可以设置自定义域名
   - 支持 HTTPS 证书自动配置

### 方案三：GitHub Pages（免费）

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

2. **配置 GitHub Pages**
   - 在仓库设置中找到 "Pages"
   - 选择 "Deploy from a branch"
   - 选择 `main` 分支和 `/docs` 目录

3. **修改构建配置**
   ```bash
   # 修改 vite.config.js
   export default defineConfig({
     base: '/你的仓库名/',
     // ... 其他配置
   })
   ```

## 📱 移动端优化

为了让应用在手机上更好用，可以添加 PWA 支持：

### 安装 PWA 插件
```bash
npm install vite-plugin-pwa
```

### 配置 PWA
在 `vite.config.js` 中添加：
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

## 🌐 自定义域名

### 购买域名
- 阿里云、腾讯云、GoDaddy 等
- 价格约 50-100 元/年

### 配置 DNS
1. 在域名提供商处添加 CNAME 记录
2. 指向你的部署平台提供的域名
3. 在部署平台中绑定自定义域名

## 📊 性能优化

### 代码分割
```javascript
// 在路由组件中使用懒加载
const TripDetail = React.lazy(() => import('./components/TripDetail'))
```

### 图片优化
- 使用 WebP 格式
- 压缩图片大小
- 使用 CDN 加速

## 🔒 安全考虑

### HTTPS
- 现代部署平台都自动提供 HTTPS
- 确保所有资源都通过 HTTPS 加载

### 数据安全
- 当前使用 localStorage，数据只存储在用户本地
- 如需云端存储，建议添加用户认证

## 📈 监控和分析

### 添加 Google Analytics
```html
<!-- 在 index.html 中添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 常见问题

### 1. 路由问题
- 确保配置了正确的重定向规则
- SPA 应用需要将所有路由指向 index.html

### 2. 构建失败
- 检查 Node.js 版本兼容性
- 确保所有依赖都正确安装

### 3. 性能问题
- 使用浏览器开发者工具分析
- 考虑代码分割和懒加载

## 📞 获取帮助

- Vercel 文档：https://vercel.com/docs
- Netlify 文档：https://docs.netlify.com
- GitHub Pages 文档：https://pages.github.com

## 🎯 推荐部署流程

1. **选择 Vercel**（最简单）
2. **将代码推送到 GitHub**
3. **在 Vercel 中导入项目**
4. **自动部署完成**
5. **分享你的网址给朋友**

你的旅行计划应用就可以被全世界访问了！🎉 