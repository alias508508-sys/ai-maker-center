# 自动内容安全审核（专业服务接入，待配置后启用）

此功能是内容治理措施，不代表网络安全认证、等保认证或法律合规保证。参考《网络信息内容生态治理规定》第六条、第七条及阿里云内容安全官方接入文档：

- https://www.cac.gov.cn/2019-12/20/c_1578375159509309.htm
- https://www.alibabacloud.com/help/en/content-moderation/latest/access-guide
- https://www.alibabacloud.com/help/en/content-moderation/latest/image-review-enhanced-api

## 自动流程

采集原始文字 → 专业文字审核 → AI 分类/整理 → 原始材料、生成标题摘要理由及翻译共同审核 → 配图转换后的实际字节审核 → 通过内容进入公开发布层 → 首页、排行榜、RSS。

高风险自动拦截；中低风险自动复查一次，仍有风险或结果相互矛盾则不发布，不建立人工待办。未知结果、无权限、网络超时、额度不足均不放行。后台只显示统计。重试使用指数退避（最多一小时），使用原付费回执保护，未知结果遵循现有回执恢复机制，避免重复计费。

文字完整分段审核，不静默截断；每段最多 600 个字符，相邻重叠 40 个字符。超过 20 万字符的输入不发布。图片通过内容安全临时 OSS 授权上传私有文件，按实际字节审核；临时凭证不保存、不打印。图片中的文字也需检查。缓存由版本与内容 SHA256 绑定；正文、标题、摘要、修改、翻译或实际缩略图更改后需重新审核。图片/文字的审核记录和付费回执均保存在数据库并进入完整加密备份。

首页和榜单使用私有 `.data/maker-safety.json` 放行记录，不信任公开 JSON 中的“通过”字段。排行榜使用当前已通过的文字和缩略图。API 未审核正文、X媒体与完整 RSS 内容在启用审核时不公开，摘要 RSS 正常使用；站主原创静态文章的正文和每张配图必须审核后再发布。

## 开通与配置

1. 阿里云控制台开通“内容安全／AI Guardrails”（按量付费）。创建专用 RAM 用户，授予内容安全调用权限，切勿使用主账号 AccessKey。
2. 在该产品控制台配置审核策略，开启色情、政治敏感风险、暴力恐怖、违法引导、辱骂仇恨、欺诈、隐私等所需风险标签；以语义和上下文判断，普通技术、政策研究不因单词出现就自动判违规。具体可用标签取决于所开通的地域和服务。模板服务名需要按控制台实际支持的服务确认。
3. 在服务器 `/home/admin/ai-maker-center/.env` 中配置以下变量，文件保持权限 600。不要在聊天中发送密钥：

```dotenv
CONTENT_SAFETY_ACCESS_KEY_ID=专用RAM的AccessKeyID
CONTENT_SAFETY_ACCESS_KEY_SECRET=专用RAM的AccessKeySecret
CONTENT_SAFETY_ENDPOINT=green-cip.ap-southeast-1.aliyuncs.com
CONTENT_SAFETY_TEXT_SERVICE=text_multilingual_pro_global
CONTENT_SAFETY_IMAGE_SERVICE=postImageCheckByVL_global
CONTENT_SAFETY_ENABLED=false
```

4. 先使用合成安全样本和合成拦截样本测试真实服务，包括图片、图片内文字、敏感语义、边界结果、超时、预算和错误服务名；不能仅以代码单元测试代替实际验证。
5. 保留现有站点的加密备份；以 `CONTENT_SAFETY_ENABLED=true` 在隔离副本运行存量审核、归档过滤及静态页面生成。所有公开图片/原创页面/历史归档都应检查，不把未审核文件留在可访问的静态目录。成功后再将已审核的副本替换上线。
6. 服务确认工作后，将 `.env` 中 `CONTENT_SAFETY_ENABLED=true`，重建 api/web/worker 环境，启用 `maker-moderate.timer`。采集任务在封面生成后、归档与页面生成前执行 `maker-moderate.ts`。

**当前默认关闭**：专业审核凭证还没有配置，因此没有对真实内容声称“审核通过”。后台显示“待启用”。默认设置不会让现有网站突然全部变空。启用前必须完成上述真实服务验证和存量审核。

## 后续维护

审核服务按调用计费，独立预算 `content-safety` 默认每分钟 60、每小时 1000、每天 10000 次，可在后台设置调整。规则/服务/控制台风险阈值变更时升级 `SAFETY_POLICY` 并重新审核，旧缓存不能代替新规则审核。保留已有反馈入口用于漏检报告；有问题及时下架并更新规则，不要求管理员逐篇确认。
