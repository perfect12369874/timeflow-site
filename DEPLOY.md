# TimeFlow 官网 — 部署说明（给 Claude Code）

这是 **seetimeflow.com** 的全新静态网站。纯 HTML / CSS / JS，无构建步骤，可直接部署到 GitHub Pages（或任何静态托管）。

---

## 📁 文件结构（`site/` 目录就是网站根目录）

```
site/
├── index.html          首页（Hero · 核心价值 · 真机截图 · 隐私 · 价格）
├── help.html           帮助 / 常见问题（FAQ）
├── feedback.html       反馈表单（Formspree）
├── privacy.html        隐私政策
├── changelog.html      更新日志 / Roadmap
├── support.html        旧链接重定向 → help.html（防止 404）
├── styles.css          共享设计系统（所有页面引用）
├── site.js             共享脚本：中英切换 + 移动端菜单 + 滚动动画
├── CNAME               seetimeflow.com（GitHub Pages 自定义域名）
└── assets/
    ├── app-icon.png    App 图标
    ├── calendar.png    真机截图 · 日历
    ├── insights.png    真机截图 · 洞察
    ├── projects.png    真机截图 · 项目
    └── settings.png    真机截图 · 设置
```

---

## ⚙️ 部署前必须改 2 处

### 1. 反馈表单的 Formspree endpoint
打开 `feedback.html`，找到顶部脚本里的：
```js
var FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```
- 去 https://formspree.io 用 `timeflow.app@gmail.com` 注册并新建一个 form
- 把它给的 endpoint（形如 `https://formspree.io/f/abcdwxyz`）替换上面这行
- 没替换时，表单会提示用户改用邮件 —— 不会静默失败

### 2.（上架后）App Store 下载链接
现在首页是「即将上架」状态。上架后，把 `index.html` 里的「上架通知我」按钮和那个灰色的
`App Store · 即将上架` 徽章换成真实的 App Store 下载链接 / 徽章即可（搜索 `#notify` 和 `soon-badge`）。

---

## 🚀 部署到 GitHub Pages（推荐）

1. 把 `site/` 里的**所有文件**放到目标仓库（仓库根目录，或 `/docs`）。
   - `CNAME` 文件已包含 `seetimeflow.com`，保持在根目录即可。
2. 仓库 Settings → Pages → Source 选 `main` 分支（根目录或 `/docs`）。
3. DNS：把 `seetimeflow.com` 的 DNS 按 GitHub Pages 文档配置
   （A 记录指向 GitHub Pages IP，或 `www` 用 CNAME 指向 `<user>.github.io`）。
4. 等 Pages 生效 + HTTPS 证书签发即可。

> 也可直接拖到 Netlify / Vercel / Cloudflare Pages —— 静态站，零配置。

---

## 📋 给 Claude Code 的一句话 prompt（可直接粘贴）

```
这是 TimeFlow 官网 seetimeflow.com 的新版静态站，在 site/ 目录里（纯 HTML/CSS/JS，无构建）。
请帮我：
1. 把 feedback.html 顶部的 FORMSPREE_ENDPOINT 换成我的真实 endpoint：<贴这里>
2. 把整个 site/ 部署到 GitHub Pages，CNAME 已是 seetimeflow.com，配好自定义域名 + HTTPS
3. 部署后给我预览链接
```

---

## 设计说明
- **深色为主**，品牌绿 `#30d158`，7 类别色沿用 App（见 `styles.css` 顶部 tokens）。
- **中英双语**：每段文案有 `.zh` / `.en` 两份，靠 `html[lang]` 切换；右上角按钮切换并记住选择（localStorage）。新增文案时记得两份都写。
- **导航 / 页脚** 在每个页面里是独立 HTML（5 份），改导航时 5 个文件都要同步。
- 真机截图来自 App 真实界面；如截图更新，替换 `assets/` 里同名文件即可。
```
```
