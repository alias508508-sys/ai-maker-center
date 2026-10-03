# 创新中心历史归档

首页 `pages-preview/data.json` 继续保留最近 200 条。每次成功的采集发布先提取封面，再把本轮公开发布的资讯保存到 `pages-preview/archive/北京时间日期/UTC时间戳.json`，最后更新网站与 GitHub 仓库。没有新资讯的成功批次保存空列表；失败批次不发布。

`archive/index.json` 是不截断的批次索引，`archive/index.html` 提供日期浏览和 JSON 下载。同一天多轮分别保存，重复处理同一批次不覆盖原内容。首次启用保存已有资讯的初始快照，不能据此恢复启用前每轮的完整历史。

每个 JSON 含 schemaVersion、collectedAt、date、timezone、kind、items。items 保存公开标题、摘要、来源、原文链接、评分和封面相对路径；封面文件位于 `assets/covers/`，不随首页淘汰而删除。归档不含未入选候选稿、原网站完整正文、API 密钥、数据库内部记录和模型调用回执。

归档没有自动过期或删除策略，持续存入 Git 仓库，不依赖 Actions 日志或临时运行文件的保存期限。迁移服务器时复制 archive 目录和 assets/covers，并按 index.json 导入各批次，按原文 URL 去重即可；未来采集需要另外保留发布批次关系。它是可迁移的内容库备份，不是完整后台数据库备份。
