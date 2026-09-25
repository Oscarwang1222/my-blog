# Blog

个人博客，基于 [Docusaurus 3](https://docusaurus.io/)。

部署到 `https://blog.oscarstudio.cn`，与 Oscar Studio 主站同服务器、同子域，但本目录是**独立项目**（自含 `.git`、`package.json`、`docusaurus.config.ts`），与 Oscar Studio 业务无耦合。

## 本地开发

```bash
npm install         # 首次需要
npm start           # 本地开发服务器（含热更新）
```

## 构建

```bash
npm run build       # 生成 build/ 目录（仅本地，不发布）
```

## 部署

**构建 + 上线 一条命令**：

```bash
npm run deploy      # docusaurus build + rsync 到 /www/wwwroot/blog.oscarstudio.cn
```

**只重新上传，不重建**（已存在 `build/` 时）：

```bash
npm run deploy:rsync
```

底层脚本是仓库根目录的 `sync-blog.sh`（仿 `sync-docs.sh`），通过 rsync 推到 `ya@119.23.64.153:/www/wwwroot/blog.oscarstudio.cn/`。服务器端 `.user.ini`、`.htaccess`、`.well-known` 不会被 `--delete` 清掉。

不要直接用 `docusaurus deploy`（默认是 GitHub Pages 推送，已禁用）。**所有发布走 `npm run deploy`。**

## 关键配置

| 配置项 | 文件 | 说明 |
|--------|------|------|
| `url` / `baseUrl` | `docusaurus.config.ts` | `https://blog.oscarstudio.cn` + `/` |
| 多语言 | `i18n/zh-Hans/` | 默认 `zh-Hans`，附带 `en` |
| 内容 | `blog/`（文章）、`docs/`（文档） | 标准 Docusaurus 内容目录 |

## 写作指南

更详细的写作 / 翻译 / 标签 / 作者管理见 [`BLOG_GUIDE.md`](./BLOG_GUIDE.md)。
