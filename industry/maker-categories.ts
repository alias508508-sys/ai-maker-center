// 首页、自动采集与管理员投稿共用的四类。
export const MAKER_CATEGORY_KEYS = ['hardware', 'ai-products', 'industry', 'tip'] as const;
export const MAKER_CATEGORY_GUIDE = `必须根据实际内容四选一：
hardware（AI 与硬件）：AI 机器人、智能实体、可穿戴、传感器、边缘智能、物理交互设备及相关硬件研究；
ai-products（AI与设计）：AI 辅助视觉、工业、交互、三维、产品设计，生成式设计工具、方法和工作流；
industry（AI创新案例）：以 AI 为核心的具体创新设计项目与应用案例，说明问题、过程、成果；
tip（AI教育实践）：AI 教育的发展趋势、教学课程、学习研究、教学工具、教育政策与实践。
交叉内容按文章主要贡献归一类：教育目标优先 tip；核心成果是智能实体则 hardware；主要介绍设计工具方法则 ai-products；其余具体 AI 创新案例为 industry。不能仅凭含有“设备”“学生”等词判断。历史非 AI 设计作品按最接近的设计/案例类保留，但新采集无 AI 关联的泛设计、学校简介、招生导航应标为不相关。`;
