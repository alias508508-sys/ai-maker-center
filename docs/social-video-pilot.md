# X 与 YouTube 小规模试采集

检索和字幕探针默认只保存私有资料；明确授权的单条发布测试通过 `maker-social-publish.ts` 进入原有分类、评分、内容安全与公开读取层。X 已接入定时自主搜索，详见 `maker-discovery.md`。

## X

复用现有 SocialData 搜索、帖子转换、付费回执和预算。
服务器需在私有配置中设置 `SOCIALDATA_API_KEY`，不要将凭证发到聊天或提交到 Git。
建议第一轮限定一条查询，例如 `from:huggingface -filter:replies`，最多保存三条真实帖子。

```sh
node scripts/maker-social-probe.ts x 'from:huggingface -filter:replies'
```

未配置凭证时明确失败，不使用搜索引擎摘要充当帖子正文。
测试输出 `.data/social-probe/x.json`，保留作者、原文链接和帖子媒体。

## YouTube

在隔离 Python 环境安装 yt-dlp，然后只获取单个视频字幕和元数据，不下载视频。

```sh
python3 -m venv .data/video-probe-venv
.data/video-probe-venv/bin/pip install yt-dlp
.data/video-probe-venv/bin/python scripts/maker-youtube-probe.py 'https://www.youtube.com/watch?v=2YHa1vhnmK0'
node scripts/maker-social-probe.ts summarize .data/social-probe/youtube.json
```

摘要调用必须在已有数据库、模型凭证和预算的环境执行，测试授权时才开启 `MODEL_CALLS_ENABLED`。
当前选择英文字幕；无字幕、正文过短或平台限流时停止，不根据标题猜测视频内容。
保存字幕来源、是否自动字幕、视频日期及封面链接。封面不是视频画面截图。
私有总结探针最长送入前24000字符，不能声称完整覆盖。正式发布测试只接受5000字符以内的字幕（完整交给当前分析流程）；更长的视频明确拒绝，需要先接入分段总结。

## 自动接入前的条件

X 配置凭证后完成真实试采集；YouTube 在服务器验证字幕获取稳定性。
之后才接入既有材料入口、链接/视频ID去重、分类和评分、文字与图片审核、发布及榜单。
没有字幕的内容暂跳过；语音转写和视频截图不属于当前测试，不默认增加费用。

## YouTube 发布验证

```sh
node scripts/maker-social-publish.ts .data/social-probe/youtube.json
node scripts/maker-moderate.ts
node scripts/maker-archive.ts
node scripts/maker-pages.ts
```

保留视频原始日期；单条历史视频可通过同一公开门槛读取，不伪造为今日视频。卡片使用原始视频缩略图，不能标成视频画面截图。首页新公开内容置前，自动刷新保持已有卡片顺序。

2026-10-07 实测：本机能搜索视频并读取公开字幕；新加坡服务器直连字幕接口被要求登录确认机器人身份。未配置认证或可靠字幕服务前，不启用服务器 YouTube 自动采集，不能声称服务器独立流程已跑通。

已完成本机取字幕、服务器 AI 分类总结、文字与缩略图审核、公开发布：OpenAI 的 `https://www.youtube.com/watch?v=2YHa1vhnmK0`，完整英文人工字幕 2347 字符，中文标题「OpenAI 发布 Agents API，托管 Codex harness」，分类「AI与设计」，评分 67。首页展示视频原始缩略图和原文入口。
