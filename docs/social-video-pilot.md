# X 与 YouTube 小规模试采集

当前为私有测试入口，不注册生产信源、不发布、不触发网站定时任务。

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
长视频暂只送入前24000字符，后续接入自动任务前需分段总结，不能声称完整覆盖。

## 自动接入前的条件

X 配置凭证后完成真实试采集；YouTube 在服务器验证字幕获取稳定性。
之后才接入既有材料入口、链接/视频ID去重、分类和评分、文字与图片审核、发布及榜单。
没有字幕的内容暂跳过；语音转写和视频截图不属于当前测试，不默认增加费用。
