# 游戏客户端开发作品集

阿卜杜瓦日斯的个人作品集网站，用于集中展示 Unity 游戏项目、嵌入式系统项目、技术文档和公开视频。

## 技术栈

- React
- TypeScript
- Vite
- GitHub Pages

## 本地运行

```bash
pnpm install
pnpm dev
```

## 构建校验

```bash
pnpm build
pnpm lint
```

## 内容维护

项目卡内容统一维护在 `src/data/projects.ts`。新增项目时复用现有数据结构，避免直接复制页面组件。

## 自动部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会构建并发布到 GitHub Pages。首次使用时，需要在仓库设置的 Pages 页面选择 GitHub Actions 作为部署源。

## 公开边界

- 不提交手机号、身份证件、账号密钥或私人文件。
- 原创网站代码后续采用 MIT License。
- 图片、字体、音频与游戏素材在公开前逐项记录来源和许可证。
