# 高校 AI 与工业交互设计信源导入报告

核验日期：2026-10-04。从实际服务器检查入口，两份原始文档均保留。

两份文档合并得到 403 个唯一入口；4 个已配置，新增 399 个。新增入口中 39 个已启用，360 个保留为参考或暂停，后台总计 420 个信源。第二份文档表格提取出 353 个唯一入口，服务器 HTTP 检查为 331 个 200、22 个失败；HTTP 200 不代表正文可采集。

**自动采集**：39 个新入口接入每 6 小时的现有采集流程，由 DeepSeek 进行相关性筛选、分类、摘要和保存，再更新展示页面。分类沿用工具产品、创新案例、教育实践、观点；每批最多处理 12 条，不保证所有文章入选。网页列表每批最多读取 12 次详情，材料不足时跳过。无图片时仅展示文字。

**参考/暂停**：院系专业主页、代码组织、验证页、失效链接及尚未适配的动态作品库不会自动发布。GitHub 组织不能一概当作学生项目仓库；需结合具体仓库内容再适配。固定年度作品展不视作持续更新的新闻列表。所有参考链接已存入后台，可按标签查看。

**验证**：服务器读到了 MIT、Stanford、ETH 等项目正文；第二批 14 个启用入口均通过列表及至少一篇正文读取检查。类型检查、572 个后端测试、31 个前端测试、前端构建和站点 smoke 均通过。

| 名称 | 链接 | 状态 | 说明 |
|---|---|---|---|
| MIT Media Lab Projects | https://www.media.mit.edu/research/?filter=projects | 启用 | 启用：订阅或项目/新闻列表已核验 |
| MIT Media Lab · 新闻订阅 | https://www.media.mit.edu/feed.rss | 启用 | 启用：订阅或项目/新闻列表已核验 |
| 麻省理工学院 MIT (Massachusetts Institute of Technology) | https://news.mit.edu/rss/topic/artificial-intelligence2 | 已有 | 已存在，保持后台原配置 |
| Tangible Media | https://www.media.mit.edu/groups/tangible-media/projects/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Fluid Interfaces | https://www.media.mit.edu/groups/fluid-interfaces/projects/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Responsive Environments | https://www.media.mit.edu/groups/responsive-environments/projects/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| City Science | https://www.media.mit.edu/groups/city-science/projects/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Stanford d.school Stories | https://dschool.stanford.edu/about/stories | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Works in Progress | https://dschool.stanford.edu/about/stories/works-in-progress | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Stanford HCI Research | https://hci.stanford.edu/research/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| Stanford HAI News | https://hai.stanford.edu/news | 启用 | 启用：订阅或项目/新闻列表已核验 |
| CMU HCII Research & Projects | https://hcii.cmu.edu/research | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| HCII News & Events | https://hcii.cmu.edu/news | 启用 | 启用：订阅或项目/新闻列表已核验 |
| CMU Design Gallery | https://design.cmu.edu/gallery | 参考/暂停 | 访问验证页面，暂停采集 |
| Morphing Matter Lab | https://morphingmatter.cs.cmu.edu/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| CMU Robotics Institute Projects | https://www.ri.cmu.edu/research/projects/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Berkeley Jacobs · 2025春季设计展 | https://jacobsinstitute.berkeley.edu/spring-2025-design-showcase/ | 参考/暂停 | 暂停：固定年度归档，待核验项目入口 |
| Jacobs Institute News | https://jacobsinstitute.berkeley.edu/news-events/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Berkeley Master of Design | https://mds.berkeley.edu/ | 参考/暂停 | 访问失败：<urlopen error [Errno -2] Name or service not known> |
| Berkeley BAIR · 研究博客 | https://bair.berkeley.edu/blog/feed.xml | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Harvard MDE Student Projects | https://www.gsd.harvard.edu/offices-and-facilities/advanced-studies-programs/programs/design-engineering/mde-student-projects/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Harvard MDE Official Site | https://mde.harvard.edu/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Harvard SEAS News | https://seas.harvard.edu/news | 参考/暂停 | 访问验证页面，暂停采集 |
| NYU ITP Shows Archive | https://itp.nyu.edu/shows/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| NYU IMA Events & Projects | https://itp.nyu.edu/ima/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| UW MHCI+D Capstone | https://mhcid.washington.edu/capstone/ | 参考/暂停 | 访问验证页面，暂停采集 |
| UW DUB Weekly | https://dub.washington.edu/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| RCA IDE · 2026毕业展 | https://2026.rca.ac.uk/school/innovation-design-engineering-ma-msc/ | 参考/暂停 | 暂停：年度作品展，待核验项目入口 |
| Imperial College IDE Events | https://www.imperial.ac.uk/events/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| Dyson School of Design Engineering | https://www.imperial.ac.uk/design-engineering/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| TU Delft IDE Portal | https://www.tudelft.nl/en/ide | 启用 | 启用：订阅或项目/新闻列表已核验 |
| TU Delft IDE Projects & Labs | https://www.tudelft.nl/en/ide/about-ide/departments/sustainable-design-engineering/knowledge-and-intelligence-design/projects-labs/projects | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| UID Degree Show | https://www.umu.se/en/umea-institute-of-design/collaborate/design-talks--degree-show/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| UID Projects Gallery | https://www.umu.se/en/umea-institute-of-design/uid26/public-exhibition/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| TU/e Industrial Design | https://www.tue.nl/en/our-university/departments/industrial-design | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Aalto Department of Design | https://www.aalto.fi/en/department-of-design | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Aalto Media Lab Projects | https://medialab.aalto.fi/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Aalto Design Research Portal | https://research.aalto.fi/en/organisations/department-of-design/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| PoliMi Design School | https://www.design.polimi.it/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| PoliMi AIRLab | https://airlab.deib.polimi.it/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| ETH AI Center | https://ai.ethz.ch/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| ETH Robotic Systems Lab | https://rsl.ethz.ch/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| EPFL DHLAB | https://www.epfl.ch/labs/dhlab/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| Dezeen School Shows 专区 | https://www.dezeen.com/schoolshows/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| 瑞士联邦理工 ETH Zurich & EPFL | https://www.dezeen.com/feed/ | 已有 | 已存在，保持后台原配置 |
| Core77 Awards Student Showcase | https://designawards.core77.com/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| Core77 · 设计新闻 | https://feeds.feedburner.com/core77/blog | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Designboom AI in Design 专题 | https://www.designboom.com/tag/ai-in-design/ | 参考/暂停 | 访问失败：HTTP Error 404: Not Found |
| 瑞士联邦理工 ETH Zurich & EPFL | https://www.designboom.com/feed/ | 已有 | 已存在，保持后台原配置 |
| Yanko Design 主站 | https://www.yankodesign.com/ | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Yanko Design · 新闻订阅 | https://www.yankodesign.com/feed/ | 已有 | 已存在，保持后台原配置 |
| ACM CHI Student Research Competition | https://chi2026.acm.org/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| ACM DIS (Designing Interactive Systems) | https://dis.acm.org/ | 参考/暂停 | 暂停：需要项目列表规则或入口跳转验证 |
| Fast Company Innovation by Design (Student Category) | https://www.fastcompany.com/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| 高校学生 · AI硬件与可穿戴创新 | https://news.google.com/rss/search?q=(%22MIT%22+OR+%22CMU%22+OR+%22Stanford%22+OR+%22RCA%22+OR+%22TU+Delft%22)+AND+(%22student%22+OR+%22degree+show%22)+AND+(%22hardware%22+OR+%22wearable%22+OR+%22robotics%22)+when:14d&hl=en-US&gl=US&ceid=US:en | 启用 | 启用：订阅或项目/新闻列表已核验 |
| 高校学生 · 交互设计与AI工具 | https://news.google.com/rss/search?q=(%22interaction+design%22+OR+%22industrial+design%22)+AND+(%22artificial+intelligence%22+OR+%22generative+AI%22)+AND+(%22showcase%22+OR+%22student+project%22)+when:14d&hl=en-US&gl=US&ceid=US:en | 启用 | 启用：订阅或项目/新闻列表已核验 |
| Dezeen School Shows · AI专项 | https://news.google.com/rss/search?q=site:dezeen.com+%22school+shows%22+(%22AI%22+OR+%22robot%22+OR+%22interaction%22)&hl=en-US&gl=US&ceid=US:en | 启用 | 启用：订阅或项目/新闻列表已核验 |
| MIT · Media Lab / CSAIL / IDM | https://www.media.mit.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| MIT · Media Lab / CSAIL / IDM | https://www.csail.mit.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| MIT · Media Lab / CSAIL / IDM | https://idm.mit.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Stanford · d.school / HCI Group | https://dschool.stanford.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Stanford · d.school / HCI Group | https://hci.stanford.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Carnegie Mellon · School of Design / HCII / Robotics | https://design.cmu.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| Carnegie Mellon · School of Design / HCII / Robotics | https://hcii.cmu.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Carnegie Mellon · School of Design / HCII / Robotics | https://www.ri.cmu.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Harvard · GSD / SEAS / metaLAB | https://www.gsd.harvard.edu/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Harvard · GSD / SEAS / metaLAB | https://seas.harvard.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| Harvard · GSD / SEAS / metaLAB | https://metalab.harvard.edu/projects/ | 参考/暂停 | 访问失败：<urlopen error timed out> |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | https://design.berkeley.edu/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | https://jacobsinstitute.berkeley.edu/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | https://ced.berkeley.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | https://cdss.berkeley.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| Cornell · Information Science / Human Centered Design / Cornell Tech | https://www.infosci.cornell.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Cornell · Information Science / Human Centered Design / Cornell Tech | https://human.cornell.edu/design | 参考/暂停 | 参考入口：院系专业门户 |
| Cornell · Information Science / Human Centered Design / Cornell Tech | https://tech.cornell.edu/studio/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| UPenn · IPD / Weitzman / GRASP Lab | https://ipd.me.upenn.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| UPenn · IPD / Weitzman / GRASP Lab | https://www.design.upenn.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| UPenn · IPD / Weitzman / GRASP Lab | https://grasp.upenn.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Columbia · GSAPP / CS / Computational Design Lab | https://www.arch.columbia.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Columbia · GSAPP / CS / Computational Design Lab | https://www.cs.columbia.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Princeton · Engineering / Keller Center Design Minor | https://engineering.princeton.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| Princeton · Engineering / Keller Center Design Minor | https://kellercenter.princeton.edu/teaching/minor-design | 参考/暂停 | 验证页或错误页，暂停采集 |
| University of Chicago · CS / MPCS | https://www.cs.uchicago.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| University of Chicago · CS / MPCS | https://masters.cs.uchicago.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| RISD · Industrial Design / Digital + Media | https://www.risd.edu/academics/industrial-design | 参考/暂停 | 验证页或错误页，暂停采集 |
| RISD · Industrial Design / Digital + Media | https://www.risd.edu/academics/digital-media | 参考/暂停 | 验证页或错误页，暂停采集 |
| ArtCenter · Interaction / Industrial / Product / MDP | https://www.artcenter.edu/academics/graduate-degrees/interaction-design/overview.html | 参考/暂停 | 参考入口：院系专业门户 |
| ArtCenter · Interaction / Industrial / Product / MDP | https://www.artcenter.edu/academics/graduate-degrees/industrial-design/overview.html | 参考/暂停 | 参考入口：院系专业门户 |
| ArtCenter · Interaction / Industrial / Product / MDP | https://www.artcenter.edu/academics/graduate-degrees/media-design-practices/overview.html | 参考/暂停 | 参考入口：院系专业门户 |
| Parsons · Design & Technology | https://dt.parsons.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Parsons · Design & Technology | https://dt.parsons.edu/ms/ | 参考/暂停 | 参考入口：院系专业门户 |
| Parsons · Design & Technology | https://dt.parsons.edu/bfa/ | 参考/暂停 | 参考入口：院系专业门户 |
| Pratt · School of Design / Industrial Design | https://www.pratt.edu/design/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| Pratt · School of Design / Industrial Design | https://www.pratt.edu/design/industrial-design/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| SVA · MFA Interaction Design / MFA Design | https://www.sva.edu/graduate/mfa-interaction-design | 参考/暂停 | 参考入口：院系专业门户 |
| SVA · MFA Interaction Design / MFA Design | https://interactiondesign.sva.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| SVA · MFA Interaction Design / MFA Design | https://design.sva.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| CCA · Interaction / Industrial / IXD / MFA Design | https://www.cca.edu/design/interaction-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| CCA · Interaction / Industrial / IXD / MFA Design | https://www.cca.edu/design/industrial-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| CCA · Interaction / Industrial / IXD / MFA Design | https://www.cca.edu/design/ixd/ | 参考/暂停 | 参考入口：院系专业门户 |
| UCLA · Design Media Arts | https://dma.ucla.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| USC · Iovine and Young Academy / Roski | https://iovine-young.usc.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| USC · Iovine and Young Academy / Roski | https://roski.usc.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| SAIC · AIADO / Art & Technology Studies | https://www.saic.edu/aiado | 参考/暂停 | 验证页或错误页，暂停采集 |
| SAIC · AIADO / Art & Technology Studies | https://www.saic.edu/atsp | 参考/暂停 | 验证页或错误页，暂停采集 |
| Cranbrook · 3D Design / 4D Design / Industrial Design | https://cranbrookart.edu/departments/3d-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| Cranbrook · 3D Design / 4D Design / Industrial Design | https://cranbrookart.edu/departments/4d-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| Cranbrook · 3D Design / 4D Design / Industrial Design | https://cranbrookart.edu/programs/industrial-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| University of Washington · HCDE / MHCI+D / Division of Design | https://www.hcde.washington.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| University of Washington · HCDE / MHCI+D / Division of Design | https://mhcid.washington.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| University of Washington · HCDE / MHCI+D / Division of Design | https://art.washington.edu/division-design | 参考/暂停 | 参考入口：院系专业门户 |
| UIUC · Siebel School / Art + Design / Siebel Center for Design | https://cs.illinois.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| UIUC · Siebel School / Art + Design / Siebel Center for Design | https://art.illinois.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| UIUC · Siebel School / Art + Design / Siebel Center for Design | https://design.illinois.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Georgia Tech · MS-HCI / School of Industrial Design / GVU | https://mshci.gatech.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Georgia Tech · MS-HCI / School of Industrial Design / GVU | https://id.gatech.edu/ | 参考/暂停 | 访问失败：<urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1000)> |
| Georgia Tech · MS-HCI / School of Industrial Design / GVU | https://gvu.gatech.edu/ | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| Northwestern · Segal Design Institute / MMM | https://design.northwestern.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Northwestern · Segal Design Institute / MMM | https://design.northwestern.edu/mmm-program/ | 参考/暂停 | 参考入口：院系专业门户 |
| Purdue · Rueff School Industrial Design | https://cla.purdue.edu/academic/rueffschool/ad/industrial | 参考/暂停 | 参考入口：院系专业门户 |
| Cincinnati · DAAP / School of Design | https://daap.uc.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| Cincinnati · DAAP / School of Design | https://daap.uc.edu/academic-programs/school-of-design/industrial-design.html | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| RIT · Industrial Design BFA / Golisano Computing | https://www.rit.edu/study/industrial-design-bfa | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| RIT · Industrial Design BFA / Golisano Computing | https://www.rit.edu/computing/ | 参考/暂停 | 参考入口：院系专业门户 |
| UC San Diego · Design Lab / Cognitive Science | https://designlab.ucsd.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| UC San Diego · Design Lab / Cognitive Science | https://cogsci.ucsd.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| UW–Madison · Design Studies | https://sohe.wisc.edu/academics/design-studies/ | 参考/暂停 | 参考入口：院系专业门户 |
| ASU · Fulton Schools / EPICS | https://engineering.asu.edu/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| ASU · Fulton Schools / EPICS | https://epics.engineering.asu.edu/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Royal College of Art · School of Design / Design Products / IDE | https://www.rca.ac.uk/schools/school-of-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| Royal College of Art · School of Design / Design Products / IDE | https://www.rca.ac.uk/schools/school-of-design/design-products/ | 参考/暂停 | 参考入口：院系专业门户 |
| Royal College of Art · School of Design / Design Products / IDE | https://www.rca.ac.uk/schools/school-of-design/innovation-design-engineering/ | 参考/暂停 | 参考入口：院系专业门户 |
| Imperial College London · Dyson School of Design Engineering / Computing | https://www.imperial.ac.uk/computing/ | 参考/暂停 | 参考入口：院系专业门户 |
| Imperial College London · Dyson School of Design Engineering / Computing | https://www.imperial.ac.uk/design-engineering/study/ | 参考/暂停 | 参考入口：院系专业门户 |
| Goldsmiths · BA Design / Department of Computing | https://www.gold.ac.uk/ug/ba-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| Goldsmiths · BA Design / Department of Computing | https://www.gold.ac.uk/computing/ | 参考/暂停 | 参考入口：院系专业门户 |
| Goldsmiths · BA Design / Department of Computing | https://sites.gold.ac.uk/ma-mfa-computationalarts/ | 参考/暂停 | 参考入口：院系专业门户 |
| Brunel University London · Brunel Design School | https://www.brunel.ac.uk/brunel-design-school/ | 参考/暂停 | 参考入口：院系专业门户 |
| Loughborough · School of Design and Creative Arts | https://www.lboro.ac.uk/schools/design-creative-arts/ | 参考/暂停 | 参考入口：院系专业门户 |
| Loughborough · School of Design and Creative Arts | https://www.lboro.ac.uk/arts/ | 参考/暂停 | 参考入口：院系专业门户 |
| Edinburgh · Edinburgh College of Art / Design Informatics | https://www.eca.ed.ac.uk/ | 参考/暂停 | 参考入口：院系专业门户 |
| Edinburgh · Edinburgh College of Art / Design Informatics | https://www.eca.ed.ac.uk/programme/design-informatics-ma | 参考/暂停 | 参考入口：院系专业门户 |
| Edinburgh · Edinburgh College of Art / Design Informatics | https://designinformatics.org/ | 参考/暂停 | 参考入口：院系专业门户 |
| Glasgow School of Art · Innovation School / Interaction Design | https://www.gsa.ac.uk/study/ | 参考/暂停 | 参考入口：院系专业门户 |
| Northumbria · School of Design / Computer & Info Sciences | https://www.northumbria.ac.uk/about-us/academic-departments/northumbria-school-of-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| Northumbria · School of Design / Computer & Info Sciences | https://www.northumbria.ac.uk/about-us/academic-departments/computer-and-information-sciences/ | 参考/暂停 | 参考入口：院系专业门户 |
| Ravensbourne · Design 本科 | https://www.ravensbourne.ac.uk/study/undergraduate/design | 参考/暂停 | 参考入口：院系专业门户 |
| UCL (⚠️) · Bartlett Design for Performance & Interaction | https://www.bartlettarchucl.com/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UAL / CSM / LCC (⚠️) · Product Design / Interaction Design | https://ualshowcase.arts.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Dundee (⚠️) · DJCAD | https://sites.dundee.ac.uk/library/djcad-2026-dissertation-publication | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| TU Delft · Faculty of Industrial Design Engineering (IDE) | https://ide.tudelft.nl/ | 参考/暂停 | 参考入口：院系专业门户 |
| TU Delft · Faculty of Industrial Design Engineering (IDE) | https://www.tudelft.nl/en/ide/education/ide-masters-programmes/design-for-interaction | 参考/暂停 | 参考入口：院系专业门户 |
| TU Eindhoven · Department of Industrial Design | https://www.tue.nl/en/education/graduate-school/master-industrial-design | 参考/暂停 | 参考入口：院系专业门户 |
| Design Academy Eindhoven · 全校 | https://www.designacademy.nl/ | 参考/暂停 | 参考入口：院系专业门户 |
| KABK · Interactive/Media/Design | https://www.kabk.nl/en | 参考/暂停 | 访问失败：<urlopen error [Errno 101] Network is unreachable> |
| KABK · Interactive/Media/Design | https://www.kabk.nl/en/programmes/bachelor/interactive-media-design | 参考/暂停 | 访问失败：<urlopen error [Errno 101] Network is unreachable> |
| Aalto University · School of Arts, Design and Architecture | https://www.aalto.fi/en/school-of-arts-design-and-architecture | 参考/暂停 | 参考入口：院系专业门户 |
| Aalto University · School of Arts, Design and Architecture | https://designfactory.aalto.fi/ | 参考/暂停 | 参考入口：院系专业门户 |
| Umeå Institute of Design · 交互设计 / 工业设计 / 交通设计 | https://www.umu.se/en/umea-institute-of-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| Umeå Institute of Design · 交互设计 / 工业设计 / 交通设计 | https://www.umu.se/en/umea-institute-of-design/education/programmes/masters-programme-in-interaction-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| Konstfack · 工业设计 / Design Ecologies | https://www.konstfack.se/en/ | 参考/暂停 | 参考入口：院系专业门户 |
| Konstfack · 工业设计 / Design Ecologies | https://www.konstfack.se/en/Education/Bachelors-Degree-Programmes/Industridesign-180-hp/ | 参考/暂停 | 参考入口：院系专业门户 |
| KTH · Interactive Media Technology | https://www.kth.se/en | 参考/暂停 | 参考入口：院系专业门户 |
| KTH · Interactive Media Technology | https://www.kth.se/en/studies/master/interactive-media-technology | 参考/暂停 | 参考入口：院系专业门户 |
| Chalmers · Industrial Design Engineering | https://www.chalmers.se/en/ | 参考/暂停 | 参考入口：院系专业门户 |
| Chalmers · Industrial Design Engineering | https://www.chalmers.se/en/education/programmes/masters/industrial-design-engineering/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| AHO (Oslo) · Master of Design | https://www.aho.no/english/studies/programmes/master-of-design/ | 参考/暂停 | 参考入口：院系专业门户 |
| University of Oslo · Informatics: Design, Use, Interaction | https://www.uio.no/english/studies/programmes/inf-design-master/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Aarhus University · Digital Design | https://bachelor.au.dk/digitaldesign | 参考/暂停 | 参考入口：院系专业门户 |
| Aarhus University · Digital Design | https://kandidat.au.dk/digitaldesign | 参考/暂停 | 参考入口：院系专业门户 |
| IT University of Copenhagen · Digital Design & Interactive Technologies | https://en.itu.dk/Programmes/MSc-Programmes/Digital-Design-and-Interactive-Technologies | 参考/暂停 | 参考入口：院系专业门户 |
| IT University of Copenhagen · Digital Design & Interactive Technologies | https://en.itu.dk/Programmes/BSc-Programmes/Digital-Design-and-Interactive-Technologies | 参考/暂停 | 参考入口：院系专业门户 |
| Royal Danish Academy · Design / Visual Interaction | https://royaldanishacademy.com/en/design-education | 参考/暂停 | 参考入口：院系专业门户 |
| Royal Danish Academy · Design / Visual Interaction | https://royaldanishacademy.com/en/institute-design-visual-interaction | 参考/暂停 | 参考入口：院系专业门户 |
| HfG Schwäbisch Gmünd · Interaktionsgestaltung / Produktgestaltung | https://www.hfg-gmuend.de/studium/interaktionsgestaltung | 参考/暂停 | 参考入口：院系专业门户 |
| HfG Schwäbisch Gmünd · Interaktionsgestaltung / Produktgestaltung | https://www.hfg-gmuend.de/studium/produktgestaltung | 参考/暂停 | 参考入口：院系专业门户 |
| HfG Karlsruhe · 媒体艺术 / 产品设计 | https://www.hfg-karlsruhe.de/studium/ | 参考/暂停 | 参考入口：院系专业门户 |
| UdK Berlin · Fakultät Gestaltung | https://www.udk-berlin.de/universitaet/fakultaet-gestaltung/ | 参考/暂停 | 参考入口：院系专业门户 |
| Weißensee Berlin · Produkt-Design | https://www.kh-berlin.de/design | 参考/暂停 | 参考入口：院系专业门户 |
| Weißensee Berlin · Produkt-Design | https://www.kh-berlin.de/design/ba/ma-produkt-design | 参考/暂停 | 参考入口：院系专业门户 |
| Bauhaus-Universität Weimar · Fakultät Medien / Kunst und Gestaltung | https://www.uni-weimar.de/de/medien/start/ | 参考/暂停 | 参考入口：院系专业门户 |
| Bauhaus-Universität Weimar · Fakultät Medien / Kunst und Gestaltung | https://www.uni-weimar.de/de/kunst-und-gestaltung/start/ | 参考/暂停 | 参考入口：院系专业门户 |
| TU Berlin · Design & Computation (M.A.) / Usability Lab | https://www.tu.berlin/studieren/studienangebot/gesamtes-studienangebot/studiengang/design-computation-m-a | 参考/暂停 | 参考入口：院系专业门户 |
| TU Berlin · Design & Computation (M.A.) / Usability Lab | https://www.qu.tu-berlin.de/ | 参考/暂停 | 参考入口：院系专业门户 |
| TU München · School of CIT / School of Engineering and Design | https://www.cit.tum.de/ | 参考/暂停 | 参考入口：院系专业门户 |
| TU München · School of CIT / School of Engineering and Design | https://www.ed.tum.de/en/ed/ | 参考/暂停 | 参考入口：院系专业门户 |
| Politecnico di Milano · School of Design / Dipartimento di Design | https://www.design.polimi.it/en/ | 参考/暂停 | 参考入口：院系专业门户 |
| Politecnico di Milano · School of Design / Dipartimento di Design | https://dipartimentodesign.polimi.it/ | 参考/暂停 | 参考入口：院系专业门户 |
| Politecnico di Torino · DAD 建筑与设计系 | https://www.dad.polito.it/ | 参考/暂停 | 参考入口：院系专业门户 |
| IED · Interior / Product / Mobility | https://www.ied.edu/ | 参考/暂停 | 参考入口：院系专业门户 |
| IED · Interior / Product / Mobility | https://www.ied.it/aree-tematiche/interior-product-mobility | 参考/暂停 | 参考入口：院系专业门户 |
| Domus Academy · Design 方向 | https://www.domusacademy.com/courses/design/ | 参考/暂停 | 参考入口：院系专业门户 |
| ENSCI–Les Ateliers · Créateur Industriel 工业设计 | https://www.ensci.com/formations/createur-industriel | 参考/暂停 | 参考入口：院系专业门户 |
| Strate École de Design · Designer d'interactions / Transportation Design | https://www.strate.design/formation/formation-designer-interactions | 参考/暂停 | 参考入口：院系专业门户 |
| Strate École de Design · Designer d'interactions / Transportation Design | https://www.strate.design/formation/transportation-design-english | 参考/暂停 | 参考入口：院系专业门户 |
| ENSAD · Design Objet | https://www.ensad.fr/fr/design-objet | 参考/暂停 | 参考入口：院系专业门户 |
| ETH Zürich · D-MAVT / D-ITET / Design++ | https://mavt.ethz.ch/ | 参考/暂停 | 参考入口：院系专业门户 |
| ETH Zürich · D-MAVT / D-ITET / Design++ | https://ee.ethz.ch/ | 参考/暂停 | 参考入口：院系专业门户 |
| ETH Zürich · D-MAVT / D-ITET / Design++ | https://designplusplus.ethz.ch/ | 参考/暂停 | 参考入口：院系专业门户 |
| EPFL · IC / ENAC | https://ic.epfl.ch/ | 参考/暂停 | 参考入口：院系专业门户 |
| EPFL · IC / ENAC | https://enac.epfl.ch/ | 参考/暂停 | 参考入口：院系专业门户 |
| ZHdK · Interaction Design / Industrial Design | https://www.zhdk.ch/design | 参考/暂停 | 参考入口：院系专业门户 |
| ZHdK · Interaction Design / Industrial Design | https://www.zhdk.ch/studium/design/ba-design-interaction-design | 参考/暂停 | 参考入口：院系专业门户 |
| ZHdK · Interaction Design / Industrial Design | https://www.zhdk.ch/studium/design/ba-design-industrial-design | 参考/暂停 | 参考入口：院系专业门户 |
| MIT · Media Lab Projects | https://www.media.mit.edu/projects/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| MIT · SuperUROP Projects | https://superurop-apply.mit.edu/searches/searches-2025.tcl?dept=eecs | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Stanford · d.school Community | https://dschool.stanford.edu/about/our-community | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Stanford · MS Design Stories | https://dschool.stanford.edu/stories/designing-a-ritual-for-transformation-a-2026-personal-statement-project | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| CMU · School of Design — Our Work | https://design.cmu.edu/our-work | 参考/暂停 | 验证页或错误页，暂停采集 |
| CMU · HCII Capstone Projects | https://www.hcii.cmu.edu/hcii-capstone-projects | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Harvard · GSD Projects（可按 student work 筛选） | https://www.gsd.harvard.edu/projects/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Harvard · AI Pedagogy Project（学生团队作品） | https://aipedagogy.org/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Harvard · AI Design for Ocean Solutions | https://oceans.aipedagogy.org/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UC Berkeley · Graduate Exhibitions | https://design.berkeley.edu/graduate-exhibitions | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| UC Berkeley · Student Work | https://design.berkeley.edu?p=28 | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| UC Berkeley · Jacobs Institute Design Showcase | https://jacobsinstitute.berkeley.edu/winter-2024-design-showcase | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Cornell · MPS Projects | https://infosci.cornell.edu/masters/mps/curriculum/project/recent | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Cornell · BOOM Projects | https://www.cis.cornell.edu/about/outreach-events/boom-bits-our-minds/awards | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Cornell · Fashion + Design Expo | https://human.cornell.edu/design/about/events/expo | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UPenn · IPD Portfolio | https://ipd.me.upenn.edu/portfolio | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Columbia · GSAPP Student Work | https://www.arch.columbia.edu/student-work | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Princeton · Princeton Engineers（学生档案） | https://engineering.princeton.edu/graduate-studies/princeton-engineers | 参考/暂停 | 验证页或错误页，暂停采集 |
| University of Chicago · MS-ADS Capstone Archive | https://datascience.uchicago.edu/education/masters-programs/ms-in-applied-data-science/capstone-project-archive/ | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| RISD · RISD Grad Show 数字出版物 | https://risdgrad.show/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| RISD · Grad Show 说明页 | https://www.risd.edu/news/annual-events/risd-grad-show | 参考/暂停 | 验证页或错误页，暂停采集 |
| RISD · Sol Koffler 研究生画廊 | https://www.risd.edu/academics/campus-resources/sol-koffler-graduate-student-gallery | 参考/暂停 | 验证页或错误页，暂停采集 |
| RISD · Gelman 本科生展览画廊 | https://www.risd.edu/academics/campus-resources/gelman-student-exhibitions-gallery | 参考/暂停 | 验证页或错误页，暂停采集 |
| ArtCenter · Grad Show 聚合站 | https://gradshow.artcenter.edu/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| ArtCenter · Spring 2026 Grad Show | https://gradshow.artcenter.edu/spring-2026-grad-show | 参考/暂停 | 验证页或错误页，暂停采集 |
| ArtCenter · Interaction Design Student Gallery | https://www.artcenter.edu/academics/undergraduate-degrees/interaction-design/student-gallery.html | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ArtCenter · Industrial Design Student Gallery | https://www.artcenter.edu/academics/graduate-degrees/industrial-design/student-gallery.html | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ArtCenter · MDP Student Gallery | https://www.artcenter.edu/academics/graduate-degrees/media-design-practices/student-gallery.html | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ArtCenter · Product Design Student Gallery | https://www.artcenter.edu/academics/undergraduate-degrees/product-design/student-gallery.html | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Parsons · D&T Student Work | https://dt.parsons.edu/student-work/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Parsons · D&T Thesis Projects | https://dt.parsons.edu/projects.html | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Pratt · Pratt Shows | https://www.pratt.edu/pratt-shows/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| Pratt · 历年展览档案 | https://www.pratt.edu/about/exhibitions/pratt-manhattan-gallery/past-exhibitions/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| SVA · Featured Student Exhibitions | https://sva.edu/featured-student-exhibitions | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| CCA · CCA 2026 毕业展 | https://2026.cca.edu/thesis/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| CCA · Student Showcase | https://cca.edu/showcase/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UCLA · DMA People / Work Archive | https://dma.ucla.edu/people/work | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UCLA · DMA MFA Students | https://dma.ucla.edu/people/mfa | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| USC · IYA Innovation Quest | https://iovine-young.usc.edu/iya-innovation-quest-2025 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| USC · Roski Exhibitions | https://roski.usc.edu/exhibitions/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| USC · Roski Exhibitions | https://roski.usc.edu/past-exhibitions/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| SAIC · End-Year Exhibitions | https://www.saic.edu/news/end-year-exhibitions | 参考/暂停 | 验证页或错误页，暂停采集 |
| Cranbrook · 3D Design Projects Archive | https://cranbrook3dprojects.com/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Cranbrook · 学院美术馆（学位展举办地） | https://cranbrookartmuseum.org/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| University of Washington · HCDE Capstone | https://www.hcde.washington.edu/capstone | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| University of Washington · MHCI+D Capstone（SPOTLIGHT） | https://mhcid.washington.edu/inspire/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| UIUC · Art + Design Student Work | https://art.illinois.edu/academics/student-work.html | 参考/暂停 | 验证页或错误页，暂停采集 |
| Georgia Tech · MS-HCI Student Projects | https://mshci.gatech.edu/work-research-student-projects | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| Northwestern · Segal Student Projects | https://design.northwestern.edu/projects/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UW–Madison · Design Studies Student Work | https://sohe.wisc.edu/design-studies-student-work/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| RCA · Showcase（学生作品总入口） | https://www.rca.ac.uk/showcase/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| RCA · Student Profiles 2025 | https://www.2025.rca.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| RCA · 2021 Collections（AI 主题策展） | https://2021.rca.ac.uk/collections | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| RCA · School of Design EXPO 2026 | https://www.rca.ac.uk/news-and-events/events/rca2026-school-of-design-expo/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| RCA · School of Design EXPO 2025 | https://www.rca.ac.uk/news-and-events/news/rca2025-school-of-design-expo | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Imperial · IDE Summer Show 报道 | https://www.imperial.ac.uk/news/articles/engineering/design-engineering/2026/ide-show-article/ | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| Imperial · IDE Spring Show 2026 | https://www.imperial.ac.uk/events/207214/ide-spring-show-2026 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Imperial · Dyson School 官方博客 | https://blogs.imperial.ac.uk/design-engineering/ | 参考/暂停 | 访问失败：IncompleteRead(24498 bytes read) |
| UCL / Bartlett · Bartlett Shows | https://shows.bartlettarchucl.com/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UCL / Bartlett · Summer Show 2025 | https://summer2025.bartlettarchucl.com/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UAL · Graduate Showcase | https://graduateshowcase.arts.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Goldsmiths · Degree Shows | https://www.gold.ac.uk/degree-shows/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| Goldsmiths · Student work | https://www.gold.ac.uk/degree-shows/student-work | 启用 | 启用：列表与正文读取已通过服务器实测 |
| Goldsmiths · Degree Show listings | https://www.gold.ac.uk/degree-shows/listings | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Brunel · Made in Brunel | https://www.brunel.ac.uk/brunel-design-school/why-study-at-design-school/made-in-brunel | 启用 | 启用：列表与正文读取已通过服务器实测 |
| Brunel · 校级 Student Showcase | https://brunel.ac.uk/about/public-engagement/student-showcase | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Loughborough · SDCA Student Vlogs 2026 | https://www.lboro.ac.uk/arts/features/sdca-student-vlogs-2026 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Loughborough · Design Digital Showcase | https://designshow.lboro.ac.uk/students | 参考/暂停 | 访问失败：HTTP Error 401: Unauthorized |
| Loughborough · SDCA Digital Show | https://sdcashow2021.lboro.ac.uk/about | 参考/暂停 | 访问失败：HTTP Error 401: Unauthorized |
| Edinburgh · ECA Graduate Show 2026 | https://www.graduateshow.eca.ed.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Edinburgh · Inspace（DI 学生展空间） | https://inspace.ed.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| GSA · GSA Showcase | https://gsashowcase.net/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| GSA · GSA Exhibitions | https://gsaexhibitions.co.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| GSA · Degree Show 2025 | https://www.gsa.ac.uk/degreeshow25 | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Dundee · Dundee Graduate Publications (Issue 11) | https://dundeegraduatepubs.dundee.ac.uk/dundeegraduatepubs/issue/view/11 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Northumbria · REVEAL 毕业展 | https://www.northumbria.ac.uk/about-us/news-events/events/reveal | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Ravensbourne · 2026 Degree Showcase | https://2026.ravensbourne.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Ravensbourne · 2024 / 2023 Degree Showcase | https://2024.ravensbourne.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Ravensbourne · 2024 / 2023 Degree Showcase | https://2023.ravensbourne.ac.uk/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| TU Delft · MediSign 毕业设计展示库 | https://medisigntudelft.nl/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| TU Delft · IDE 议程 / 毕业展与 Demo Day | https://www.tudelft.nl/en/ide/current/agenda | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| TU Eindhoven · TU/e Student Teams | https://www.tue.nl/en/our-university/tue-student-teams/student-teams | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Design Academy Eindhoven · Graduation Show 2026 | https://www.designacademy.nl/page/10108/graduation-show-2026 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Design Academy Eindhoven · All Projects | https://www.designacademy.nl/page/5411/all-projects | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Design Academy Eindhoven · Graduation Projects | https://www.designacademy.nl/page/6871/graduation-projects | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Design Academy Eindhoven · Graduation Catalogues | https://www.designacademy.nl/page/5963/graduation-catalogues | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Design Academy Eindhoven · Projects with Collaborators | https://www.designacademy.nl/page/5412/projects-with-collaborators | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| KABK · Graduation Show | https://graduation.kabk.nl | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| KABK · Graduation Show（官网页） | https://www.kabk.nl/en/graduation-show | 参考/暂停 | 访问失败：<urlopen error [Errno 101] Network is unreachable> |
| Aalto · Aalto ARTS Grad Show 2026 | https://www.aalto.fi/en/aalto-arts-grad-show-2026 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Aalto · Art and Design Cases | https://www.aalto.fi/en/aalto-art-and-design-cases | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Aalto · Designs for a Cooler Planet | https://www.aalto.fi/en/designs-for-a-cooler-planet | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Umeå · **UID26 Project Gallery** | https://www.umu.se/en/umea-institute-of-design/uid26/uid26-project-gallery | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Umeå · UID26 Design Talks & Degree Show | https://www.umu.se/en/umea-institute-of-design/uid26 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Umeå · Student Work 总入口 | https://www.umu.se/en/umea-institute-of-design/education/student-work/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Konstfack · Degree Exhibition 2026 | https://konstfack2026.se/en/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| Konstfack · Degree Exhibition — Industrial Design | https://konstfack2026.se/en/category/bachelor/ba-id | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| KTH · Interactive Media Technology Student Projects | https://play.kth.se/channel/Interactive%2BMedia%2BTechnology%2BStudent%2BProjects/233306 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| AHO · Student Projects（英文库） | https://www.aho.no/english/student-projects/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| AHO · Studentprosjekter（挪威语，条目更全） | https://www.aho.no/studentprosjekter/ | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| ITU Copenhagen · Collaboration with students | https://en.itu.dk/Collaboration/Collaboration-with-students | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Royal Danish Academy · Graduation Bank 毕业作品库 | https://royaldanishacademy.com/en/graduationbank | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| HfG Schwäbisch Gmünd · Semesterausstellung 学期展 | https://www.hfg-gmuend.de/hochschule/semesterausstellung | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| HfG Karlsruhe · Studierenden-Projekte 学生项目 | https://www.hfg-karlsruhe.de/studierenden-projekte/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| HfG Karlsruhe · Rundgang 2026 年度展 | https://www.hfg-karlsruhe.de/aktuelles/rundgang-2026 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| HfG Karlsruhe · Ausstellung 展览总览 | https://www.hfg-karlsruhe.de/aktuelles/ausstellung | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UdK Berlin · Rundgang 年度展 | https://rundgang.udk-berlin.de/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Weißensee Berlin · Alle Projekte 全部项目 | https://www.kh-berlin.de/alle-projekte | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Weißensee Berlin · Produkt-Design Projekte | https://www.kh-berlin.de/design/ba/ma-produkt-design/projekte | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Weißensee Berlin · Rundgang 年度展 | https://rundgang.kh-berlin.de/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Bauhaus Weimar · summaery 年度展 | https://www.uni-weimar.de/summaery/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| POLIMI · School of Design Events | https://www.design.polimi.it/la-scuola/eventi | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| POLIMI · INTERDEPENDENCE（米兰设计周学生展） | https://www.design.polimi.it/en/school/news/news-detail/interdependence-2025-exploring-opposites | 参考/暂停 | 参考入口：匹配到导航、其它新闻或重复目录，待项目列表适配 |
| POLIMI · Design Week 2025 @ Dipartimento di Design | https://dipartimentodesign.polimi.it/en/magazine/design-week-2025 | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| PoliTo · Team e progetti studenteschi | https://www.polito.it/didattica/servizi-e-vita-al-politecnico/vivere-il-politecnico/team-e-progetti-studenteschi | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| IED · IED Projects 学生项目 | https://www.ied.edu/projects | 启用 | 启用：列表与正文读取已通过服务器实测 |
| Domus Academy · Projects 学生项目库 | https://www.domusacademy.com/projects/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| ENSCI · Galerie des ateliers 工作室作品廊 | https://www.ensci.com/galerie-des-ateliers | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Strate · Projet étudiant 学生项目 | https://www.strate.design/projet-etudiant | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ENSAD · Projets 学生项目 | https://www.ensad.fr/fr/actualites-projets/projets | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ETH Zürich · Student Project House | https://sph.ethz.ch/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| EPFL · Living Archives | https://livingarchives.epfl.ch/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| EPFL · Memento EPFL | https://memento.epfl.ch/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| EPFL · SIE Design Project | https://www.epfl.ch/schools/enac/education/sciences-et-ingenierie-de-lenvironnement/master-sie-en/projects/design-project/design-project-2008-en | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ZHdK · design.zhdk.ch 作品平台 | https://design.zhdk.ch/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| ZHdK · interactiondesign.zhdk.ch | https://interactiondesign.zhdk.ch/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| ZHdK · Studienprojekte 学生项目库 | https://www.zhdk.ch/studienprojekte | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ZHdK · Diplom 2026 设计学位展 | https://design.zhdk.ch/diplom-2026/about/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ZHdK · ZHdK Diplome 学位作品索引 | https://www.zhdk.ch/diplome | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Konstfack · The students' homepages | https://www.konstfack.se/en/Education/The-students-homepages/ | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Columbia · GSAPP-CDP/archive | https://github.com/GSAPP-CDP/archive | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Columbia · columbiadesign | https://github.com/columbiadesign/columbiadesign.github.io | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| UChicago · uchicago-cs | https://github.com/uchicago-cs | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| RISD · risd | https://github.com/risd | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Parsons · parsonsdt | https://github.com/parsonsdt | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Pratt · pratt-institute | https://github.com/pratt-institute | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| SVA · sva-ixd | https://github.com/sva-ixd | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| CCA · cca | https://github.com/cca | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| SAIC · saic | https://github.com/saic | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| UCLA · uclagamelab | https://github.com/uclagamelab | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| University of Michigan · UMSI | https://github.com/UMSI | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| University of Washington · makeabilitylab | https://github.com/makeabilitylab | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Imperial · ImperialCollegeLondon | https://github.com/ImperialCollegeLondon | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Goldsmiths · goldsmiths | https://github.com/goldsmiths | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Loughborough · loughborough | https://github.com/loughborough | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Ravensbourne · ravensbourne | https://github.com/ravensbourne | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Aalto · AaltoUniversity | https://github.com/AaltoUniversity | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| TU Delft · tudelft | https://github.com/tudelft | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| TU Delft · TU-Delft | https://github.com/TU-Delft | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| TU Eindhoven · tueindhoven | https://github.com/tueindhoven | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Design Academy Eindhoven · designacademyeindhoven | https://github.com/designacademyeindhoven | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| KABK · kabk | https://github.com/kabk | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| KTH · kth | https://github.com/kth | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Chalmers · Chalmers-University-of-Technology | https://github.com/Chalmers-University-of-Technology | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Chalmers · chalmers-revere | https://github.com/chalmers-revere | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| University of Oslo · unioslo | https://github.com/unioslo | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| Aarhus · aarhusuniversity | https://github.com/aarhusuniversity | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| ITU Copenhagen · itu-dk | https://github.com/itu-dk | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| HfG Schwäbisch Gmünd · hfg-gmuend | https://github.com/hfg-gmuend | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| UdK Berlin · udk-berlin | https://github.com/udk-berlin | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| TU München · TUM-AI | https://github.com/TUM-AI | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| TU München · tum | https://github.com/tum | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| POLIMI · polimi | https://github.com/polimi | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| PoliTo · polito | https://github.com/polito | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| ENSCI · ensci | https://github.com/ensci | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| ETH Zürich · ethz-asl | https://github.com/ethz-asl | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| ZHdK · zhdk | https://github.com/zhdk | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| TUM.ai · ✅ https://www.tum.ai/ ｜ ✅ https://github.com/TUM-AI | https://www.tum.ai/ | 参考/暂停 | 参考入口：作品索引/代码，需专门适配 |
| MIT · CSAIL Research | https://www.csail.mit.edu/research | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| CMU · Robotics Institute Research | https://www.ri.cmu.edu/research/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Harvard · metaLAB Projects | https://mlml.io/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UC Berkeley · EECS Research | https://www.eecs.berkeley.edu/research/ | 参考/暂停 | 访问失败：HTTP Error 403: Forbidden |
| UPenn · GRASP Lab Projects | https://grasp.upenn.edu/projects/ | 启用 | 启用：列表与正文读取已通过服务器实测 |
| Columbia · Computational Design Lab | https://www.cs.columbia.edu/~chilton/chilton.html | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| RISD · Art and Computation | https://www.risd.edu/academics/art-computation | 参考/暂停 | 验证页或错误页，暂停采集 |
| Pratt · AI at Pratt | https://www.pratt.edu/academics/ai-at-pratt/ | 参考/暂停 | 验证页或错误页，暂停采集 |
| UCLA · Conditional Studio | https://dma.ucla.edu/initiatives/conditional-studio | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UCLA · Counterforce Lab | https://dma.ucla.edu/initiatives/counterforce-lab | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UCLA · UCLA Game Lab | https://dma.ucla.edu/initiatives/ucla-game-lab | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UCLA · Social Software | https://dma.ucla.edu/initiatives/social-software | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UCLA · Art\ | https://dma.ucla.edu/initiatives/art-sci-center | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| UC San Diego · Design Lab Research | https://designlab.ucsd.edu/research/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Imperial · Dyson School Research | https://www.imperial.ac.uk/design-engineering/research/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Goldsmiths · Computing Programmes | https://www.doc.gold.ac.uk/programmes | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| TU Delft · IDE Research Labs | https://www.tudelft.nl/en/ide/research/research-labs | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| TU Delft · IDE Digital 研究主题 | https://www.tudelft.nl/en/ide/research/digital | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| TU Eindhoven · ID Research Labs | https://www.tue.nl/en/our-university/departments/industrial-design/research/our-research-labs | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Aalto · Department of Computer Science | https://www.aalto.fi/en/department-of-computer-science | 启用 | 启用：列表与正文读取已通过服务器实测 |
| Aalto · FCAI 芬兰人工智能中心 | https://fcai.fi | 启用 | 启用：列表与正文读取已通过服务器实测 |
| Aalto · Games and Gamification | http://digi.aalto.fi/en/games_and_gamification | 启用 | 启用：列表与正文读取已通过服务器实测 |
| KTH · MID Research Environment | https://www.kth.se/mid/research/research-environment | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ETH Zürich · Computer Vision Lab | https://vision.ee.ethz.ch/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| EPFL · AI Center | https://ai.epfl.ch/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| EPFL · EPFL+ECAL Lab | https://epfl-ecal-lab.ch/ | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Strate · Robotics Design Lab | https://www.strate.design/pole-recherche/robotics-design-lab | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| Strate · Exalt Design Lab | https://www.strate.design/pole-recherche/exalt-design-lab-research | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ENSCI · Centre de recherche en design | https://www.ensci.com/recherche/le-centre-de-recherche-en-design | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ENSAD · EnsadLab | https://www.ensad.fr/fr/ensadlab-le-laboratoire-de-recherche-art-design | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
| ITU Copenhagen · Business Analytics & AI (MSc) | https://en.itu.dk/Programmes/MSc-Programmes/Business-Analytics-and-Artificial-Intelligence | 参考/暂停 | 暂停：尚未匹配可靠项目列表 |
