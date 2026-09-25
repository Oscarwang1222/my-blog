# 博客操作指南

本文档涵盖了博客日常维护和内容管理的常用操作。

---

## 目录

1. [项目结构](#项目结构)
2. [开发与构建](#开发与构建)
3. [添加博客文章](#添加博客文章)
4. [文章翻译](#文章翻译)
5. [文档系统（Docs）](#文档系统docs)
6. [修改页面文本](#修改页面文本)
7. [标签管理](#标签管理)
8. [作者管理](#作者管理)
9. [常见问题](#常见问题)

---

## 项目结构

```
my-website/
├── blog/                          # 博客文章（英文）
│   ├── 2024-01-01-welcome.md      # 文章文件
│   ├── authors.yml                # 作者信息
│   └── tags.yml                   # 标签定义
├── docs/                          # 文档页面
├── src/
│   ├── pages/                     # React 页面组件
│   │   ├── index.tsx              # 首页
│   │   └── about.tsx              # 关于页
│   └── css/                       # 样式文件
├── static/img/                    # 静态图片资源
├── i18n/
│   └── zh-Hans/                   # 中文翻译
│       ├── code.json              # React 组件文本翻译
│       ├── docusaurus-plugin-content-blog/
│       │   └── options.json       # 博客相关翻译
│       ├── docusaurus-plugin-content-docs/
│       │   └── current.json       # 文档翻译
│       └── docusaurus-theme-classic/
│           ├── navbar.json        # 导航栏翻译
│           └── footer.json        # 页脚翻译
├── docusaurus.config.ts           # 网站配置
└── package.json                   # 项目依赖
```

---

## 开发与构建

### 开发模式（单语言）

开发模式下只能预览一种语言，适合专注开发某一语言版本。

```bash
# 预览英文版本（默认）
npm run start

# 预览中文版本
npm run start -- --locale zh-Hans
```

- 访问地址：`http://localhost:3000/`
- 支持热更新，修改文件后自动刷新

### 开发模式（多语言）

如需测试语言切换功能，需要先构建再服务：

```bash
# 构建所有语言版本
npm run build

# 服务构建后的静态文件
npm run serve
```

- 英文：`http://localhost:3000/`
- 中文：`http://localhost:3000/zh-Hans/`
- 语言切换功能可用

### 生产构建

```bash
# 构建生产版本
npm run build

# 构建结果在 build/ 目录
# build/          - 英文版本
# build/zh-Hans/  - 中文版本
```

### 清除缓存

如果遇到奇怪的问题，可以清除缓存：

```bash
rm -rf .docusaurus
```

---

## 添加博客文章

### 文件命名规则

文件名格式：`YYYY-MM-DD-title.md` 或 `YYYY-MM-DD-title/index.md`

```
blog/
├── 2024-01-01-welcome.md          # 简单文章
└── 2024-01-15-my-post/            # 带图片的文章
    ├── index.md
    └── cover.jpg
```

### 文章基本格式

```markdown
---
title: 文章标题
authors: [作者ID]
tags: [标签1, 标签2]
---

文章开头部分，会显示在列表页...

<!-- truncate -->

这里是正文部分，点击"阅读更多"后显示...

## 标题一

正文内容...

## 标题二

正文内容...
```

### Front Matter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `authors` | 否 | 作者 ID（需在 `authors.yml` 中定义） |
| `tags` | 否 | 标签列表（需在 `tags.yml` 中定义） |
| `slug` | 否 | 自定义 URL 路径，默认为文件名 |
| `date` | 否 | 发布日期，默认从文件名提取 |

### 添加带图片的文章

1. 创建文件夹：`blog/2024-01-15-my-post/`
2. 在文件夹中创建 `index.md`
3. 图片放在同一文件夹中

```markdown
---
title: 带图片的文章
---

![封面图](./cover.jpg)

文章内容...
```

---

## 文章翻译

### 方法一：创建翻译文件

在 `i18n/zh-Hans/docusaurus-plugin-content-blog/` 目录下创建对应的翻译文件：

```
i18n/zh-Hans/docusaurus-plugin-content-blog/
├── 2024-01-01-welcome.md          # 对应 blog/2024-01-01-welcome.md
└── 2024-01-15-my-post/
    └── index.md                   # 对应 blog/2024-01-15-my-post/index.md
```

翻译文件内容示例：

```markdown
---
title: 欢迎来到我的博客
authors: [yangshun]
tags: [随笔, 博客]
---

# 欢迎来到我的博客 👋

这是我的第一篇博客文章！

<!-- truncate -->

## 为什么写博客？

1. **记录学习** - 把学到的知识记录下来
...
```

### 方法二：直接写中文文章

如果文章主要是中文读者，可以直接在 `blog/` 目录写中文文章：

```markdown
---
title: 中文文章标题
tags: [随笔]
---

中文内容...
```

---

## 文档系统（Docs）

文档系统用于创建结构化的技术文档，适合教程、API 文档、指南等内容。

### 文档目录结构

```
docs/
├── intro.md                      # 入口文档
├── tutorial-basics/              # 基础教程文件夹
│   ├── _category_.json           # 分类配置
│   ├── create-a-document.md      # 文档文件
│   └── markdown-features.mdx     # MDX 文件
└── tutorial-extras/              # 进阶教程文件夹
    ├── _category_.json
    └── manage-docs-versions.md
```

### 创建文档

#### 简单文档

在 `docs/` 目录下创建 `.md` 或 `.mdx` 文件：

```markdown
---
sidebar_position: 1
---

# 文档标题

文档内容...

## 章节一

内容...

## 章节二

内容...
```

#### 文档 Front Matter

| 字段 | 说明 |
|------|------|
| `sidebar_position` | 侧边栏排序位置 |
| `sidebar_label` | 侧边栏显示名称（默认为标题） |
| `title` | 文档标题 |
| `description` | 文档描述（用于 SEO） |
| `slug` | 自定义 URL 路径 |
| `tags` | 文档标签 |
| `draft` | 设为 `true` 则不发布 |

### 文档分类

使用 `_category_.json` 配置分类：

**文件位置**：`docs/tutorial-basics/_category_.json`

```json
{
  "label": "Tutorial - Basics",
  "position": 2,
  "link": {
    "type": "generated-index",
    "description": "5 minutes to learn the most important Docusaurus concepts."
  }
}
```

| 字段 | 说明 |
|------|------|
| `label` | 分类显示名称 |
| `position` | 分类排序位置 |
| `link.type` | `generated-index` 自动生成索引页 |
| `link.description` | 索引页描述 |

### 多级分类

支持嵌套文件夹创建多级分类：

```
docs/
├── intro.md
├── guide/                    # 一级分类
│   ├── _category_.json
│   ├── getting-started.md
│   └── advanced/             # 二级分类
│       ├── _category_.json
│       └── configuration.md
└── api/                      # 一级分类
    ├── _category_.json
    └── reference.md
```

### 文档翻译

在 `i18n/zh-Hans/docusaurus-plugin-content-docs/current/` 目录下创建对应的翻译文件：

```
i18n/zh-Hans/docusaurus-plugin-content-docs/current/
├── intro.md                          # 对应 docs/intro.md
├── tutorial-basics/
│   └── create-a-document.md          # 对应 docs/tutorial-basics/create-a-document.md
└── tutorial-extras/
    └── manage-docs-versions.md
```

翻译文件示例：

```markdown
---
sidebar_position: 1
---

# 教程介绍

让我们在 **5 分钟内了解 Docusaurus**。

## 开始使用

通过 **创建新站点** 开始...
```

### 侧边栏配置

**文件位置**：`sidebars.ts`

默认使用自动生成侧边栏：

```typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
};
```

#### 手动配置侧边栏

```typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial',
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-page',
      ],
    },
  ],
};
```

### 文档特色功能

#### 代码块语法高亮

````markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
````

支持的语言：JavaScript、TypeScript、Python、Java、Go、Rust 等。

#### 代码块添加标题和行号

````markdown
```javascript title="hello.js" showLineNumbers
function hello() {
  console.log('Hello, World!');
}
```
````

#### 代码块高亮行

````markdown
```javascript {2-3} showLineNumbers
function hello() {
  console.log('Hello, World!');  // 高亮
  return true;                    // 高亮
}
```
````

#### 提示框（Admonitions）

```markdown
:::note
这是一条备注。
:::

:::tip
这是一个提示。
:::

:::info
这是一条信息。
:::

:::warning
这是一个警告。
:::

:::danger
这是一个危险警告。
:::
```

#### Tabs 标签页

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
</Tabs>
```

#### 嵌入代码文件

```markdown
```jsx file=../../src/components/Hello.js
// 代码会从指定文件读取
```
```

### 文档链接

在文档中引用其他文档：

```markdown
[链接到其他文档](./other-doc.md)

[链接到分类下的文档](./category/doc.md)

[绝对路径链接](/docs/intro)
```

### 隐藏文档

不显示在侧边栏但仍可访问：

```markdown
---
sidebar_class_name: hidden
---

# 隐藏的文档
```

或者完全隐藏：

```markdown
---
pagination_prev: null
pagination_next: null
sidebar_class_name: hidden
---
```

---

## 修改页面文本

### React 页面翻译（首页、关于页等）

React 组件中的文本通过 `code.json` 翻译：

**文件位置**：`i18n/zh-Hans/code.json`

```json
{
  "homepage.title": {
    "message": "欢迎来到我的博客"
  },
  "homepage.readBlog": {
    "message": "阅读博客"
  },
  "about.title": {
    "message": "关于我"
  }
}
```

### 导航栏翻译

**文件位置**：`i18n/zh-Hans/docusaurus-theme-classic/navbar.json`

```json
{
  "title": {
    "message": "我的博客"
  },
  "item.label.Blog": {
    "message": "博客"
  },
  "item.label.About": {
    "message": "关于"
  }
}
```

### 页脚翻译

**文件位置**：`i18n/zh-Hans/docusaurus-theme-classic/footer.json`

```json
{
  "link.title.Docs": {
    "message": "文档"
  },
  "link.item.label.Blog": {
    "message": "博客"
  }
}
```

### 博客相关翻译

**文件位置**：`i18n/zh-Hans/docusaurus-plugin-content-blog/options.json`

```json
{
  "title": {
    "message": "博客"
  },
  "sidebar.title": {
    "message": "近期文章"
  }
}
```

### 添加新的翻译键

如果在 React 组件中添加了新文本：

1. 在组件中使用 `<Translate>` 组件：

```tsx
import Translate from '@docusaurus/Translate';

<Translate id="my.new.text">Default English Text</Translate>
```

2. 运行命令提取翻译键：

```bash
npm run write-translations -- --locale zh-Hans
```

3. 编辑 `i18n/zh-Hans/code.json` 添加中文翻译

---

## 标签管理

### 标签定义文件

**文件位置**：`blog/tags.yml`

```yaml
facebook:
  label: Facebook
  permalink: /facebook
  description: Facebook tag description

随笔:
  label: 随笔
  permalink: /suibi
  description: 生活随笔

博客:
  label: 博客
  permalink: /blog-tag
  description: 博客相关
```

### 添加新标签

在 `blog/tags.yml` 中添加：

```yaml
技术:
  label: 技术
  permalink: /tech
  description: 技术相关文章
```

然后在文章中使用：

```markdown
---
tags: [技术, 随笔]
---
```

### 标签翻译

如需翻译标签名称，在 `i18n/zh-Hans/docusaurus-plugin-content-blog/options.json` 中添加：

```json
{
  "blog.tags.tags.技术": {
    "message": "技术"
  }
}
```

---

## 作者管理

### 作者定义文件

**文件位置**：`blog/authors.yml`

```yaml
yangshun:
  name: Yangshun Tay
  title: Ex-Meta Staff Engineer
  url: https://linkedin.com/in/yangshun
  image_url: https://github.com/yangshun.png
  socials:
    github: yangshun
    linkedin: yangshun

myname:
  name: 我的名字
  title: 开发者
  url: https://github.com/myname
  image_url: https://github.com/myname.png
  socials:
    github: myname
```

### 添加新作者

1. 在 `blog/authors.yml` 中添加作者信息：

```yaml
newauthor:
  name: 新作者
  title: 职位/简介
  url: https://example.com
  image_url: https://github.com/username.png
  socials:
    github: username
    x: username
```

2. 在文章中使用：

```markdown
---
authors: [newauthor]
---
```

### 多作者文章

```markdown
---
authors: [yangshun, slorber]
---
```

---

## 常见问题

### Q: 修改翻译后没有生效？

**开发模式（单语言）**：修改后应自动热更新，如果没有，尝试刷新页面。

**多语言模式**：需要重新构建：
```bash
npm run build && npm run serve
```

### Q: 中文页面显示 Page Not Found？

开发模式下默认只服务英文。要预览中文：
```bash
npm run start -- --locale zh-Hans
```

要同时预览两种语言：
```bash
npm run build && npm run serve
```

### Q: 如何修改网站标题和标语？

编辑 `docusaurus.config.ts`：

```typescript
const config: Config = {
  title: 'My Blog',           // 网站标题
  tagline: 'Sharing tech notes and experiences',  // 标语
  // ...
};
```

中文翻译在 `i18n/zh-Hans/docusaurus-theme-classic/navbar.json`：
```json
{
  "title": {
    "message": "我的博客"
  }
}
```

### Q: 如何添加新的页面？

1. 在 `src/pages/` 创建新的 `.tsx` 文件：

```tsx
// src/pages/new-page.tsx
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';

export default function NewPage() {
  return (
    <Layout title="New Page">
      <div className="container">
        <h1>
          <Translate id="newpage.title">New Page</Translate>
        </h1>
      </div>
    </Layout>
  );
}
```

2. 提取翻译键并添加中文翻译：
```bash
npm run write-translations -- --locale zh-Hans
```

3. 在 `i18n/zh-Hans/code.json` 中编辑翻译

4. 在导航栏添加链接，编辑 `docusaurus.config.ts`：
```typescript
navbar: {
  items: [
    {to: '/new-page', label: 'New Page', position: 'left'},
    // ...
  ],
},
```

### Q: 如何部署到生产环境？

1. 构建：
```bash
npm run build
```

2. `build/` 目录就是静态文件，可以部署到任何静态托管服务：
   - GitHub Pages
   - Vercel
   - Netlify
   - 阿里云 OSS
   - 腾讯云 COS

---

## 快速参考

| 操作 | 命令 |
|------|------|
| 开发英文版 | `npm run start` |
| 开发中文版 | `npm run start -- --locale zh-Hans` |
| 构建生产版本 | `npm run build` |
| 预览构建结果 | `npm run serve` |
| 提取翻译键 | `npm run write-translations -- --locale zh-Hans` |
| 清除缓存 | `rm -rf .docusaurus` |

---

## 相关文件速查

| 内容 | 文件路径 |
|------|----------|
| 网站配置 | `docusaurus.config.ts` |
| 博客文章 | `blog/*.md` |
| 作者信息 | `blog/authors.yml` |
| 标签定义 | `blog/tags.yml` |
| 文档页面 | `docs/**/*.md` |
| 侧边栏配置 | `sidebars.ts` |
| 首页组件 | `src/pages/index.tsx` |
| 关于页组件 | `src/pages/about.tsx` |
| React 文本翻译 | `i18n/zh-Hans/code.json` |
| 导航栏翻译 | `i18n/zh-Hans/docusaurus-theme-classic/navbar.json` |
| 页脚翻译 | `i18n/zh-Hans/docusaurus-theme-classic/footer.json` |
| 博客翻译 | `i18n/zh-Hans/docusaurus-plugin-content-blog/` |
| 文档翻译 | `i18n/zh-Hans/docusaurus-plugin-content-docs/current/` |
