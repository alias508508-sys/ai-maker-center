# AI maker. 创新中心：本地验证版

基于 https://github.com/KKKKhazix/AIHOT 的真实源码定制，保留 MIT LICENSE 和 NOTICE。

## 访问

- 网站：http://localhost:3000
- 后台：http://localhost:3000/admin
- 管理员密码：本地 `.env` 的 `ADMIN_PASSWORD`，不要上传或公开该文件。
- 项目：`/Users/des/Desktop/codex/ai-maker-center`

本机使用 Node.js 24 与 PostgreSQL 17。没有 Docker，所以采用原项目支持的本机部署方式；Docker Compose 文件也已保留并设置独立项目名。

## 已实现

- 品牌“AI maker. 创新中心”，独立 M 图标。
- 设计工具、创新案例、教育实践等栏目；保留原分类 key 以兼容上游接口与测试。
- 行业预筛、评分与摘要写作提示词定制；保留原五轴权重和入选门槛，门槛需后续用人工样本校准。
- 5 个定向 RSS 信源和 3 个按主题查询的 Google News RSS 入口。
- 手动采集、真实入库、判重与后续任务排队。
- 6 条从真实采集摘要人工整理的首版内容；不是自动模型评分结果。
- 原站搜索、收藏、主题、RSS、API、MCP、后台与报告页面。

## 启动、停止和采集

在项目目录执行：

```sh
./scripts/maker-start.sh
./scripts/maker-stop.sh
node --env-file=.env scripts/maker-collect.ts          # 实际联网，仅保存预览
node --env-file=.env scripts/maker-collect.ts --ingest # 实际联网并入库
```

本地数据库位于 `.data/postgres`，仅监听 `127.0.0.1:55432`，使用本机信任认证，不能直接搬到公网服务器。停止不会删除数据库。

采集记录：`.data/maker-collection.json`。首批每个源限制 8 条；历史资料按原发布时间归档，不能当作当天新闻。

## 自己调整主题

编辑 `industry/search-queries.json`，然后执行：

```sh
node --env-file=.env scripts/maker-search-config.ts --sync
node --env-file=.env scripts/seed.ts
```

Google News RSS 是按查询发现新闻的入口，不等于完整全网搜索；链接可能是 Google News 中转链接，不能视为已经提取原文。搜索结果仍需后续模型或人工审核。可从后台增删定向信源，全文默认关闭。

## 启用自动精选与日报

当前 `.env` 的 `COLLECT_ENABLED=false` 和 `MODEL_CALLS_ENABLED=false`，没有配置大模型密钥，没有运行 worker，避免空密钥失败和未经确认的付费调用。

准备好 OpenAI 兼容模型服务后，在 `.env` 填写 `LLM_BASE_URL`、`LLM_API_KEY`、`LLM_MODEL`，检查服务商是否支持默认 `LLM_EXTRA_JSON`，必要时删除该参数；确认后台预算，再将两个开关改为 `true`，启动：

```sh
node --env-file=.env apps/worker/src/main.ts
```

worker 按原项目机制完成正文提取、两次评分、中文摘要、归组、热点与日报。读者访问页面不会触发付费模型调用。首版人工整理内容的规则分析与自动模型结果有明确记录，后续同一文章重新分析可产生新结果。

如需 Exa、Tavily 等通用网页搜索，可后续通过外部采集接口接入；当前没有实现这些服务，也没有验证付费模型调用。

## Docker 部署

```sh
docker compose up -d --build
```

本机 `.env` 的 `DATABASE_URL` 与 `API_BASE_URL` 会由 Compose 的容器环境覆盖。新机器使用 `.env.example` 初始化独立密钥，不复制本地数据库信任认证配置。域名、HTTPS、备份与长期运行方式参见 `docs/deploy.md`。本站条款和隐私说明仍为上游模板，公开上线前按实际运营情况确认。

## 验证记录

日志在 `.data/logs/`，包括类型检查、网站构建、前端测试、后端测试与 smoke 检查。浏览器截图位于 `output/playwright/`。

## GitHub Pages 静态测试预览

`pages-preview/index.html` 展示首版人工整理资讯，支持分类和搜索，不运行采集、模型、数据库或后台。修改人工整理内容后，执行 `node scripts/maker-pages.ts` 更新快照。GitHub Pages 使用 Actions 部署，见 `.github/workflows/pages.yml`，不需要自购域名。
