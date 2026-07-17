# Astro Blog Style

这是 `Minyaako/blog` 的独立视觉实验仓库。它保存可复用的 Astro 页面结构、组件、样式、交互与视觉检查，不保存真实文章、个人图片、生产域名、部署密钥或服务器配置。

## 本地运行

需要 Node.js 24（最低 22.12）和 pnpm 11.7：

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

完整检查：

```powershell
pnpm build
pnpm test:e2e
pnpm test:visual
```

`src/content/posts/` 和 `public/images/` 中的内容均为中性 fixture，用于保证主题能够独立构建并覆盖四个领域、长文目录、代码、公式、敏感内容确认、归档卡片与首页轮播。

## 固定标签注册表

标签定义位于 `src/content/tags/<id>.json`，文章 frontmatter 的 `tags` 只保存稳定 ID。`id` 创建后不因显示名称变化而修改，文件名必须与 `id` 一致；未知引用、重复名称或大小写归一化后重复的别名都会使构建失败。

站内统一通过 `src/lib/tags.ts` 的 `getTag(id)`、`getAllTags()` 和 `getPostTags(post)` 读取标签。标签页、归档筛选、相关文章、搜索关键词和 RSS 元数据不得自行解释自由文本。

Sveltia 配置位于 `public/admin/config.yml`。文章的标签字段是指向 `tags` collection 的多选 relation，可按 `label`、`id` 与 `aliases` 搜索，但写入文章的值始终是 `id`。

## 双仓工作流

1. 所有页面视觉、布局、组件交互和动效变更先在本仓库完成。
2. 在本仓库运行类型、单元、浏览器和视觉检查。
3. 每个可同步改动保持为边界清晰的独立提交。
4. 在博客仓库添加本仓库为 `style` remote，获取后 cherry-pick 对应提交。
5. 在博客仓库解决站点身份与真实内容产生的预期差异，再运行完整检查并发布。

```powershell
git remote add style https://github.com/Minyaako/blog-style.git
git fetch style
git cherry-pick <style-commit>
```

不得从 style 仓库覆盖到 blog 的内容包括：

- `src/content/posts/**`
- 真实头像、首页图和文章图片
- `src/config/site.ts` 中的站点身份与生产域名
- `src/pages/about.astro` 与真实项目内容
- `deploy/**`、Docker/反向代理配置和生产工作流

如果一个样式提交同时改动了上述文件，应拆分提交或在博客仓库使用 `git cherry-pick --no-commit` 后只暂存可复用部分。

## 视觉基线

`pnpm test:e2e` 运行功能与可访问性检查；`pnpm test:visual` 单独运行像素回归。确认变更符合预期后，才可使用：

```powershell
pnpm exec playwright test tests/e2e/visual.spec.ts --update-snapshots
```

视觉基线属于 style 仓库，不应使用博客中的私人图片生成。
