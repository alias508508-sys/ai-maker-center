# 全量信息源试采集记录（2026-10-04）

本轮仅试采集，不调用付费模型、不发布新内容。后台当前有 438 条来源记录，其中包含 18 条仅作引用、没有采集网址的记录。

## 验证结果

- 后端测试：574 项通过。
- 前端测试：31 项通过。
- 类型检查与前端构建：通过。
- 正文读取成功的入口：124。
- 去重的新内容候选：315；另保留已有内容 37 条供后续重新分类。

每个入口本轮最多取 3 条可读正文。读取成功不代表通过 AI 相关性判断；分类和发布尚未执行。

## 来源结果

| 状态 | 数量 |
| --- | ---: |
| reference-no-fetch-url | 18 |
| readable | 124 |
| failed-Error | 7 |
| body-unavailable | 15 |
| no-project-items | 207 |
| challenge-or-error-page | 36 |
| http-403 | 20 |
| failed-TypeError | 7 |
| http-202 | 2 |
| http-404 | 1 |
| github-http-404 | 1 |

## 逐项结果

| 来源 | 状态 | 可读正文数 |
| --- | --- | ---: |
| 个人提交 | reference-no-fetch-url | 0 |
| Raspberry Pi · 端侧 AI | reference-no-fetch-url | 0 |
| designboom | reference-no-fetch-url | 0 |
| 主题检索 · AI 硬件 | reference-no-fetch-url | 0 |
| Arduino · AI 创客硬件 | reference-no-fetch-url | 0 |
| rss-google-blog | reference-no-fetch-url | 0 |
| Yanko Design | reference-no-fetch-url | 0 |
| MIT News · AI | reference-no-fetch-url | 0 |
| 主题检索 · 创新案例 | reference-no-fetch-url | 0 |
| rss-dezeen | reference-no-fetch-url | 0 |
| Google Blog | reference-no-fetch-url | 0 |
| rss-mit-ai | reference-no-fetch-url | 0 |
| 主题检索 · AI 创客与教育硬件 | reference-no-fetch-url | 0 |
| rss-designboom | reference-no-fetch-url | 0 |
| 主题检索 · Kickstarter 设计项目报道 | reference-no-fetch-url | 0 |
| NVIDIA Blog | reference-no-fetch-url | 0 |
| 个人提交 | reference-no-fetch-url | 0 |
| 站主原创 | reference-no-fetch-url | 0 |
| AIHOT · AI 硬件（待数据再分发授权） | readable | 3 |
| Arduino · AI 创客硬件 | failed-Error | 0 |
| designboom | readable | 3 |
| Dezeen | readable | 3 |
| Google Blog | readable | 3 |
| Hugging Face | readable | 3 |
| MIT News · AI | failed-Error | 0 |
| NVIDIA Blog | readable | 3 |
| Raspberry Pi · 端侧 AI | readable | 3 |
| Yanko Design | readable | 3 |
| 主题检索 · AI 硬件 | body-unavailable | 0 |
| 主题检索 · AI 家居设备 | body-unavailable | 0 |
| 主题检索 · AI 创客与教育硬件 | body-unavailable | 0 |
| 主题检索 · AI 机器人 | body-unavailable | 0 |
| 主题检索 · AI 眼镜与可穿戴 | body-unavailable | 0 |
| 主题检索 · 设计工具 | body-unavailable | 0 |
| 主题检索 · 教育实践 | body-unavailable | 0 |
| 主题检索 · 创新案例 | body-unavailable | 0 |
| 主题检索 · Kickstarter 设计项目报道 | body-unavailable | 0 |
| 主题检索 · Kickstarter · 设计媒体 | no-project-items | 0 |
| Imperial · IDE Spring Show 2026 | no-project-items | 0 |
| CMU Robotics Institute Projects | readable | 3 |
| RCA · Showcase（学生作品总入口） | no-project-items | 0 |
| PoliMi AIRLab | no-project-items | 0 |
| KTH · kth | readable | 3 |
| Politecnico di Milano · School of Design / Dipartimento di Design | no-project-items | 0 |
| University of Washington · HCDE Capstone | no-project-items | 0 |
| Glasgow School of Art · Innovation School / Interaction Design | no-project-items | 0 |
| Goldsmiths · Degree Show listings | no-project-items | 0 |
| CCA · Student Showcase | no-project-items | 0 |
| ENSCI–Les Ateliers · Créateur Industriel 工业设计 | no-project-items | 0 |
| CCA · Interaction / Industrial / IXD / MFA Design | no-project-items | 0 |
| ENSAD · Projets 学生项目 | no-project-items | 0 |
| IT University of Copenhagen · Digital Design & Interactive Technologies | no-project-items | 0 |
| University of Washington · HCDE / MHCI+D / Division of Design | challenge-or-error-page | 0 |
| RCA · School of Design EXPO 2026 | no-project-items | 0 |
| Aarhus University · Digital Design | no-project-items | 0 |
| UC Berkeley · Student Work | http-403 | 0 |
| 高校学生 · AI硬件与可穿戴创新 | body-unavailable | 0 |
| ZHdK · zhdk | readable | 1 |
| ArtCenter · Interaction / Industrial / Product / MDP | no-project-items | 0 |
| Imperial · Dyson School 官方博客 | readable | 3 |
| Princeton · Princeton Engineers（学生档案） | challenge-or-error-page | 0 |
| UdK Berlin · Fakultät Gestaltung | no-project-items | 0 |
| ITU Copenhagen · itu-dk | no-project-items | 0 |
| Strate · Robotics Design Lab | no-project-items | 0 |
| Cranbrook · 3D Design Projects Archive | no-project-items | 0 |
| SAIC · AIADO / Art & Technology Studies | challenge-or-error-page | 0 |
| Stanford HAI News | body-unavailable | 0 |
| ZHdK · Diplom 2026 设计学位展 | no-project-items | 0 |
| Goldsmiths · BA Design / Department of Computing | no-project-items | 0 |
| University of Chicago · MS-ADS Capstone Archive | readable | 3 |
| ETH Robotic Systems Lab | readable | 3 |
| AHO (Oslo) · Master of Design | readable | 3 |
| Cranbrook · 3D Design / 4D Design / Industrial Design | readable | 3 |
| Konstfack · 工业设计 / Design Ecologies | readable | 3 |
| Responsive Environments | readable | 3 |
| UCLA · Social Software | no-project-items | 0 |
| TU München · School of CIT / School of Engineering and Design | no-project-items | 0 |
| Weißensee Berlin · Produkt-Design | no-project-items | 0 |
| IED · IED Projects 学生项目 | readable | 3 |
| EPFL DHLAB | no-project-items | 0 |
| MIT · Media Lab / CSAIL / IDM | no-project-items | 0 |
| Design Academy Eindhoven · 全校 | no-project-items | 0 |
| UC San Diego · Design Lab Research | no-project-items | 0 |
| Parsons · Design & Technology | no-project-items | 0 |
| Cincinnati · DAAP / School of Design | no-project-items | 0 |
| Design Academy Eindhoven · Projects with Collaborators | no-project-items | 0 |
| UC Berkeley · EECS Research | http-403 | 0 |
| Ravensbourne · 2026 Degree Showcase | no-project-items | 0 |
| Konstfack · Degree Exhibition 2026 | no-project-items | 0 |
| MIT · Media Lab / CSAIL / IDM | no-project-items | 0 |
| RISD · Sol Koffler 研究生画廊 | challenge-or-error-page | 0 |
| Imperial College IDE Events | no-project-items | 0 |
| Cornell · Information Science / Human Centered Design / Cornell Tech | challenge-or-error-page | 0 |
| Chalmers · Industrial Design Engineering | readable | 3 |
| SVA · MFA Interaction Design / MFA Design | no-project-items | 0 |
| Loughborough · SDCA Digital Show | http-403 | 0 |
| ZHdK · interactiondesign.zhdk.ch | readable | 3 |
| UW DUB Weekly | readable | 1 |
| MIT · SuperUROP Projects | failed-TypeError | 0 |
| Parsons · D&T Thesis Projects | no-project-items | 0 |
| ZHdK · Studienprojekte 学生项目库 | no-project-items | 0 |
| Aalto · FCAI 芬兰人工智能中心 | readable | 3 |
| ENSAD · Design Objet | no-project-items | 0 |
| ZHdK · Interaction Design / Industrial Design | failed-Error | 0 |
| IED · Interior / Product / Mobility | readable | 3 |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | http-403 | 0 |
| ENSCI · ensci | no-project-items | 0 |
| Politecnico di Torino · DAD 建筑与设计系 | readable | 3 |
| Tangible Media | readable | 3 |
| GSA · GSA Exhibitions | no-project-items | 0 |
| Berkeley Jacobs · 2025春季设计展 | http-403 | 0 |
| Columbia · Computational Design Lab | no-project-items | 0 |
| Pratt · pratt-institute | readable | 3 |
| EPFL · IC / ENAC | no-project-items | 0 |
| Weißensee Berlin · Produkt-Design | no-project-items | 0 |
| Imperial · Dyson School Research | no-project-items | 0 |
| TU München · TUM-AI | readable | 3 |
| University of Oslo · unioslo | readable | 3 |
| UCLA · Design Media Arts | readable | 3 |
| Aalto University · School of Arts, Design and Architecture | readable | 3 |
| Strate · Exalt Design Lab | no-project-items | 0 |
| Cincinnati · DAAP / School of Design | no-project-items | 0 |
| Edinburgh · Edinburgh College of Art / Design Informatics | no-project-items | 0 |
| Aalto · Art and Design Cases | no-project-items | 0 |
| TU Berlin · Design & Computation (M.A.) / Usability Lab | no-project-items | 0 |
| ZHdK · Interaction Design / Industrial Design | failed-Error | 0 |
| Bauhaus-Universität Weimar · Fakultät Medien / Kunst und Gestaltung | no-project-items | 0 |
| CMU HCII Research & Projects | no-project-items | 0 |
| Weißensee Berlin · Alle Projekte 全部项目 | no-project-items | 0 |
| RCA · Student Profiles 2025 | no-project-items | 0 |
| Umeå Institute of Design · 交互设计 / 工业设计 / 交通设计 | readable | 3 |
| SVA · MFA Interaction Design / MFA Design | no-project-items | 0 |
| RISD · Art and Computation | challenge-or-error-page | 0 |
| Weißensee Berlin · Produkt-Design Projekte | no-project-items | 0 |
| ETH Zürich · D-MAVT / D-ITET / Design++ | no-project-items | 0 |
| Ravensbourne · Design 本科 | readable | 3 |
| University of Washington · HCDE / MHCI+D / Division of Design | readable | 3 |
| TU München · tum | readable | 1 |
| Dezeen School Shows · AI专项 | body-unavailable | 0 |
| Politecnico di Milano · School of Design / Dipartimento di Design | no-project-items | 0 |
| Royal Danish Academy · Design / Visual Interaction | no-project-items | 0 |
| Princeton · Engineering / Keller Center Design Minor | challenge-or-error-page | 0 |
| Imperial College London · Dyson School of Design Engineering / Computing | no-project-items | 0 |
| PoliMi Design School | no-project-items | 0 |
| HfG Karlsruhe · Rundgang 2026 年度展 | no-project-items | 0 |
| ITU Copenhagen · Business Analytics & AI (MSc) | no-project-items | 0 |
| Princeton · Engineering / Keller Center Design Minor | challenge-or-error-page | 0 |
| TUM.ai · ✅ https://www.tum.ai/ ｜ ✅ https://github.com/TUM-AI | no-project-items | 0 |
| Columbia · columbiadesign | no-project-items | 0 |
| UC San Diego · Design Lab / Cognitive Science | no-project-items | 0 |
| Northwestern · Segal Design Institute / MMM | readable | 3 |
| Bauhaus-Universität Weimar · Fakultät Medien / Kunst und Gestaltung | no-project-items | 0 |
| ArtCenter · Spring 2026 Grad Show | challenge-or-error-page | 0 |
| TU Delft · IDE 议程 / 毕业展与 Demo Day | readable | 3 |
| Carnegie Mellon · School of Design / HCII / Robotics | readable | 3 |
| NYU ITP Shows Archive | http-202 | 0 |
| Stanford · MS Design Stories | readable | 1 |
| Dyson School of Design Engineering | readable | 3 |
| Northwestern · Segal Design Institute / MMM | no-project-items | 0 |
| Aalto · Aalto ARTS Grad Show 2026 | no-project-items | 0 |
| POLIMI · School of Design Events | no-project-items | 0 |
| ENSCI · Centre de recherche en design | no-project-items | 0 |
| CCA · Interaction / Industrial / IXD / MFA Design | no-project-items | 0 |
| Imperial · IDE Summer Show 报道 | readable | 3 |
| USC · Iovine and Young Academy / Roski | challenge-or-error-page | 0 |
| Berkeley BAIR · 研究博客 | readable | 3 |
| Brunel · Made in Brunel | readable | 3 |
| Cranbrook · 3D Design / 4D Design / Industrial Design | no-project-items | 0 |
| UIUC · Siebel School / Art + Design / Siebel Center for Design | no-project-items | 0 |
| Works in Progress | readable | 3 |
| Weißensee Berlin · Rundgang 年度展 | no-project-items | 0 |
| TU Eindhoven · Department of Industrial Design | no-project-items | 0 |
| USC · Iovine and Young Academy / Roski | no-project-items | 0 |
| Aalto · Games and Gamification | readable | 3 |
| UCL / Bartlett · Summer Show 2025 | no-project-items | 0 |
| KABK · Graduation Show | no-project-items | 0 |
| Konstfack · Degree Exhibition — Industrial Design | no-project-items | 0 |
| EPFL · IC / ENAC | no-project-items | 0 |
| Aarhus University · Digital Design | no-project-items | 0 |
| MIT · Media Lab Projects | no-project-items | 0 |
| ArtCenter · Interaction / Industrial / Product / MDP | no-project-items | 0 |
| HfG Schwäbisch Gmünd · Semesterausstellung 学期展 | no-project-items | 0 |
| Goldsmiths · goldsmiths | no-project-items | 0 |
| HfG Karlsruhe · Studierenden-Projekte 学生项目 | no-project-items | 0 |
| Jacobs Institute News | http-403 | 0 |
| RIT · Industrial Design BFA / Golisano Computing | readable | 3 |
| Loughborough · School of Design and Creative Arts | no-project-items | 0 |
| IED · Interior / Product / Mobility | readable | 3 |
| UCL (⚠️) · Bartlett Design for Performance & Interaction | no-project-items | 0 |
| EPFL · AI Center | no-project-items | 0 |
| Georgia Tech · MS-HCI Student Projects | readable | 3 |
| SVA · Featured Student Exhibitions | no-project-items | 0 |
| Domus Academy · Design 方向 | no-project-items | 0 |
| UID Degree Show | no-project-items | 0 |
| Pratt · Pratt Shows | challenge-or-error-page | 0 |
| City Science | readable | 3 |
| Dundee (⚠️) · DJCAD | no-project-items | 0 |
| Aalto Department of Design | readable | 3 |
| USC · Roski Exhibitions | challenge-or-error-page | 0 |
| Design Academy Eindhoven · Graduation Catalogues | no-project-items | 0 |
| ArtCenter · Interaction / Industrial / Product / MDP | no-project-items | 0 |
| TU Delft · TU-Delft | no-project-items | 0 |
| Cornell · BOOM Projects | no-project-items | 0 |
| University of Chicago · CS / MPCS | readable | 2 |
| TU Delft · MediSign 毕业设计展示库 | readable | 2 |
| Umeå Institute of Design · 交互设计 / 工业设计 / 交通设计 | readable | 1 |
| Carnegie Mellon · School of Design / HCII / Robotics | no-project-items | 0 |
| ENSCI · Galerie des ateliers 工作室作品廊 | no-project-items | 0 |
| KABK · Interactive/Media/Design | failed-TypeError | 0 |
| Northumbria · School of Design / Computer & Info Sciences | no-project-items | 0 |
| IT University of Copenhagen · Digital Design & Interactive Technologies | no-project-items | 0 |
| MIT · Media Lab / CSAIL / IDM | readable | 3 |
| Columbia · GSAPP-CDP/archive | readable | 1 |
| CMU · Robotics Institute Research | no-project-items | 0 |
| ETH Zürich · D-MAVT / D-ITET / Design++ | readable | 1 |
| CCA · Interaction / Industrial / IXD / MFA Design | no-project-items | 0 |
| RCA · School of Design EXPO 2025 | readable | 1 |
| Chalmers · Chalmers-University-of-Technology | no-project-items | 0 |
| UC Berkeley · Jacobs Institute Design Showcase | http-403 | 0 |
| ArtCenter · MDP Student Gallery | no-project-items | 0 |
| TU Eindhoven · tueindhoven | no-project-items | 0 |
| Konstfack · The students' homepages | no-project-items | 0 |
| Loughborough · SDCA Student Vlogs 2026 | no-project-items | 0 |
| ASU · Fulton Schools / EPICS | http-403 | 0 |
| Design Academy Eindhoven · Graduation Projects | no-project-items | 0 |
| ArtCenter · Industrial Design Student Gallery | no-project-items | 0 |
| Harvard · GSD / SEAS / metaLAB | failed-TypeError | 0 |
| UCLA · DMA People / Work Archive | no-project-items | 0 |
| ITU Copenhagen · Collaboration with students | no-project-items | 0 |
| Strate École de Design · Designer d'interactions / Transportation Design | no-project-items | 0 |
| RCA · 2021 Collections（AI 主题策展） | no-project-items | 0 |
| POLIMI · Design Week 2025 @ Dipartimento di Design | no-project-items | 0 |
| POLIMI · INTERDEPENDENCE（米兰设计周学生展） | readable | 3 |
| CCA · CCA 2026 毕业展 | no-project-items | 0 |
| Columbia · GSAPP Student Work | no-project-items | 0 |
| Cornell · Fashion + Design Expo | no-project-items | 0 |
| Aalto · AaltoUniversity | no-project-items | 0 |
| SAIC · AIADO / Art & Technology Studies | challenge-or-error-page | 0 |
| Columbia · GSAPP / CS / Computational Design Lab | readable | 1 |
| Loughborough · Design Digital Showcase | http-403 | 0 |
| UAL · Graduate Showcase | no-project-items | 0 |
| MIT Media Lab Projects | readable | 3 |
| Morphing Matter Lab | readable | 3 |
| Stanford d.school Stories | readable | 3 |
| Loughborough · School of Design and Creative Arts | readable | 3 |
| UIUC · Art + Design Student Work | challenge-or-error-page | 0 |
| ETH AI Center | no-project-items | 0 |
| UID Projects Gallery | no-project-items | 0 |
| Harvard · GSD / SEAS / metaLAB | http-403 | 0 |
| Edinburgh · ECA Graduate Show 2026 | readable | 3 |
| HfG Schwäbisch Gmünd · hfg-gmuend | readable | 3 |
| Royal Danish Academy · Design / Visual Interaction | no-project-items | 0 |
| TU Delft IDE Projects & Labs | body-unavailable | 0 |
| Ravensbourne · ravensbourne | readable | 1 |
| Goldsmiths · BA Design / Department of Computing | no-project-items | 0 |
| Fast Company Innovation by Design (Student Category) | http-403 | 0 |
| ArtCenter · Interaction Design Student Gallery | no-project-items | 0 |
| Umeå · **UID26 Project Gallery** | no-project-items | 0 |
| RISD · Grad Show 说明页 | challenge-or-error-page | 0 |
| Georgia Tech · MS-HCI / School of Industrial Design / GVU | readable | 3 |
| UC San Diego · Design Lab / Cognitive Science | no-project-items | 0 |
| UCLA · Art\ | no-project-items | 0 |
| AHO · Studentprosjekter（挪威语，条目更全） | readable | 3 |
| Domus Academy · Projects 学生项目库 | readable | 3 |
| UW MHCI+D Capstone | challenge-or-error-page | 0 |
| Dundee · Dundee Graduate Publications (Issue 11) | no-project-items | 0 |
| Stanford HCI Research | no-project-items | 0 |
| Strate · Projet étudiant 学生项目 | no-project-items | 0 |
| UAL / CSM / LCC (⚠️) · Product Design / Interaction Design | no-project-items | 0 |
| Parsons · D&T Student Work | no-project-items | 0 |
| TU Delft · tudelft | readable | 3 |
| UPenn · IPD / Weitzman / GRASP Lab | no-project-items | 0 |
| GSA · GSA Showcase | http-403 | 0 |
| ZHdK · Interaction Design / Industrial Design | failed-Error | 0 |
| SVA · MFA Interaction Design / MFA Design | no-project-items | 0 |
| ACM DIS (Designing Interactive Systems) | no-project-items | 0 |
| SVA · sva-ixd | no-project-items | 0 |
| Georgia Tech · MS-HCI / School of Industrial Design / GVU | readable | 3 |
| PoliTo · Team e progetti studenteschi | no-project-items | 0 |
| Royal Danish Academy · Graduation Bank 毕业作品库 | readable | 3 |
| Goldsmiths · BA Design / Department of Computing | no-project-items | 0 |
| CMU · HCII Capstone Projects | no-project-items | 0 |
| Pratt · 历年展览档案 | challenge-or-error-page | 0 |
| Imperial · ImperialCollegeLondon | readable | 3 |
| ETH Zürich · D-MAVT / D-ITET / Design++ | no-project-items | 0 |
| TU Delft IDE Portal | readable | 3 |
| Edinburgh · Edinburgh College of Art / Design Informatics | no-project-items | 0 |
| CMU Design Gallery | challenge-or-error-page | 0 |
| Aalto Media Lab Projects | readable | 3 |
| USC · IYA Innovation Quest | no-project-items | 0 |
| University of Washington · makeabilitylab | readable | 3 |
| Pratt · School of Design / Industrial Design | challenge-or-error-page | 0 |
| ZHdK · ZHdK Diplome 学位作品索引 | no-project-items | 0 |
| ArtCenter · Product Design Student Gallery | no-project-items | 0 |
| Goldsmiths · Degree Shows | readable | 3 |
| ENSAD · EnsadLab | no-project-items | 0 |
| ETH Zürich · ethz-asl | readable | 3 |
| Goldsmiths · Student work | readable | 3 |
| ZHdK · design.zhdk.ch 作品平台 | readable | 3 |
| TU Berlin · Design & Computation (M.A.) / Usability Lab | no-project-items | 0 |
| Designboom AI in Design 专题 | http-404 | 0 |
| TU Delft · Faculty of Industrial Design Engineering (IDE) | readable | 3 |
| TU München · School of CIT / School of Engineering and Design | failed-TypeError | 0 |
| RISD · risd | readable | 1 |
| KTH · Interactive Media Technology | readable | 1 |
| Aalto Design Research Portal | readable | 3 |
| UW–Madison · Design Studies | no-project-items | 0 |
| Imperial College London · Dyson School of Design Engineering / Computing | readable | 3 |
| CCA · cca | no-project-items | 0 |
| Design Academy Eindhoven · Graduation Show 2026 | no-project-items | 0 |
| Parsons · Design & Technology | no-project-items | 0 |
| RISD · Industrial Design / Digital + Media | challenge-or-error-page | 0 |
| TU Delft · Faculty of Industrial Design Engineering (IDE) | no-project-items | 0 |
| Berkeley Master of Design | failed-Error | 0 |
| UdK Berlin · Rundgang 年度展 | no-project-items | 0 |
| RIT · Industrial Design BFA / Golisano Computing | readable | 3 |
| UCLA · UCLA Game Lab | no-project-items | 0 |
| UC Berkeley · Graduate Exhibitions | http-403 | 0 |
| Harvard SEAS News | challenge-or-error-page | 0 |
| UIUC · Siebel School / Art + Design / Siebel Center for Design | readable | 3 |
| Chalmers · Industrial Design Engineering | no-project-items | 0 |
| Aalto · Designs for a Cooler Planet | readable | 2 |
| Edinburgh · Edinburgh College of Art / Design Informatics | readable | 3 |
| RISD · RISD Grad Show 数字出版物 | challenge-or-error-page | 0 |
| UCLA · Counterforce Lab | no-project-items | 0 |
| Northumbria · REVEAL 毕业展 | readable | 3 |
| Bauhaus Weimar · summaery 年度展 | no-project-items | 0 |
| University of Oslo · Informatics: Design, Use, Interaction | no-project-items | 0 |
| HCII News & Events | readable | 3 |
| Royal College of Art · School of Design / Design Products / IDE | readable | 3 |
| Cornell · Information Science / Human Centered Design / Cornell Tech | no-project-items | 0 |
| RISD · Industrial Design / Digital + Media | challenge-or-error-page | 0 |
| SAIC · saic | readable | 1 |
| PoliTo · polito | readable | 3 |
| HfG Karlsruhe · Ausstellung 展览总览 | no-project-items | 0 |
| Brunel · 校级 Student Showcase | no-project-items | 0 |
| Loughborough · loughborough | no-project-items | 0 |
| ASU · Fulton Schools / EPICS | http-403 | 0 |
| KABK · Interactive/Media/Design | failed-TypeError | 0 |
| Fluid Interfaces | readable | 3 |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | challenge-or-error-page | 0 |
| ArtCenter · Grad Show 聚合站 | challenge-or-error-page | 0 |
| EPFL · EPFL+ECAL Lab | readable | 2 |
| Aalto University · School of Arts, Design and Architecture | no-project-items | 0 |
| UPenn · IPD Portfolio | no-project-items | 0 |
| KTH · Interactive Media Technology | no-project-items | 0 |
| Cornell · MPS Projects | no-project-items | 0 |
| Georgia Tech · MS-HCI / School of Industrial Design / GVU | failed-TypeError | 0 |
| TU Delft · IDE Digital 研究主题 | readable | 2 |
| Harvard · GSD / SEAS / metaLAB | challenge-or-error-page | 0 |
| Harvard · AI Pedagogy Project（学生团队作品） | no-project-items | 0 |
| GSA · Degree Show 2025 | http-403 | 0 |
| Columbia · GSAPP / CS / Computational Design Lab | readable | 3 |
| RCA IDE · 2026毕业展 | no-project-items | 0 |
| Carnegie Mellon · School of Design / HCII / Robotics | challenge-or-error-page | 0 |
| Royal College of Art · School of Design / Design Products / IDE | readable | 3 |
| USC · Roski Exhibitions | challenge-or-error-page | 0 |
| Cranbrook · 学院美术馆（学位展举办地） | no-project-items | 0 |
| CMU · School of Design — Our Work | challenge-or-error-page | 0 |
| UPenn · IPD / Weitzman / GRASP Lab | challenge-or-error-page | 0 |
| Harvard MDE Student Projects | http-403 | 0 |
| Umeå · Student Work 总入口 | no-project-items | 0 |
| ETH Zürich · Student Project House | readable | 3 |
| University of Washington · HCDE / MHCI+D / Division of Design | readable | 3 |
| University of Michigan · UMSI | readable | 1 |
| Cornell · Information Science / Human Centered Design / Cornell Tech | no-project-items | 0 |
| EPFL · Living Archives | readable | 3 |
| UPenn · GRASP Lab Projects | readable | 1 |
| EPFL · Memento EPFL | no-project-items | 0 |
| Dezeen School Shows 专区 | http-403 | 0 |
| Goldsmiths · Computing Programmes | no-project-items | 0 |
| Northumbria · School of Design / Computer & Info Sciences | readable | 3 |
| TU Delft · IDE Research Labs | no-project-items | 0 |
| Umeå · UID26 Design Talks & Degree Show | no-project-items | 0 |
| Purdue · Rueff School Industrial Design | no-project-items | 0 |
| Harvard · AI Design for Ocean Solutions | no-project-items | 0 |
| UCLA · uclagamelab | readable | 3 |
| Brunel University London · Brunel Design School | readable | 3 |
| UPenn · IPD / Weitzman / GRASP Lab | readable | 3 |
| Stanford · d.school / HCI Group | readable | 3 |
| POLIMI · polimi | no-project-items | 0 |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | challenge-or-error-page | 0 |
| UdK Berlin · udk-berlin | readable | 2 |
| Core77 Awards Student Showcase | readable | 3 |
| Chalmers · chalmers-revere | readable | 3 |
| University of Chicago · CS / MPCS | no-project-items | 0 |
| ACM CHI Student Research Competition | readable | 3 |
| TU Eindhoven · TU/e Student Teams | no-project-items | 0 |
| UW–Madison · Design Studies Student Work | no-project-items | 0 |
| Stanford · d.school Community | no-project-items | 0 |
| Cranbrook · 3D Design / 4D Design / Industrial Design | readable | 3 |
| UCL / Bartlett · Bartlett Shows | no-project-items | 0 |
| KABK · kabk | no-project-items | 0 |
| 高校学生 · 交互设计与AI工具 | body-unavailable | 0 |
| Edinburgh · Inspace（DI 学生展空间） | no-project-items | 0 |
| EPFL · SIE Design Project | body-unavailable | 0 |
| Harvard · GSD Projects（可按 student work 筛选） | http-403 | 0 |
| Aarhus · aarhusuniversity | no-project-items | 0 |
| KTH · MID Research Environment | no-project-items | 0 |
| HfG Schwäbisch Gmünd · Interaktionsgestaltung / Produktgestaltung | no-project-items | 0 |
| TU/e Industrial Design | readable | 3 |
| AHO · Student Projects（英文库） | readable | 3 |
| HfG Schwäbisch Gmünd · Interaktionsgestaltung / Produktgestaltung | no-project-items | 0 |
| MIT · CSAIL Research | no-project-items | 0 |
| University of Washington · MHCI+D Capstone（SPOTLIGHT） | challenge-or-error-page | 0 |
| Aalto · Department of Computer Science | readable | 3 |
| Pratt · AI at Pratt | challenge-or-error-page | 0 |
| Konstfack · 工业设计 / Design Ecologies | no-project-items | 0 |
| KTH · Interactive Media Technology Student Projects | no-project-items | 0 |
| Core77 · 设计新闻 | readable | 3 |
| Ravensbourne · 2024 / 2023 Degree Showcase | no-project-items | 0 |
| Ravensbourne · 2024 / 2023 Degree Showcase | no-project-items | 0 |
| HfG Karlsruhe · 媒体艺术 / 产品设计 | no-project-items | 0 |
| Yanko Design 主站 | readable | 3 |
| UCLA · Conditional Studio | no-project-items | 0 |
| NYU IMA Events & Projects | http-202 | 0 |
| RISD · Gelman 本科生展览画廊 | challenge-or-error-page | 0 |
| MIT Media Lab · 新闻订阅 | readable | 3 |
| Royal College of Art · School of Design / Design Products / IDE | readable | 3 |
| Pratt · School of Design / Industrial Design | challenge-or-error-page | 0 |
| Northwestern · Segal Student Projects | readable | 3 |
| Harvard · metaLAB Projects | no-project-items | 0 |
| Parsons · Design & Technology | no-project-items | 0 |
| TU Eindhoven · ID Research Labs | no-project-items | 0 |
| SAIC · End-Year Exhibitions | challenge-or-error-page | 0 |
| KABK · Graduation Show（官网页） | failed-TypeError | 0 |
| Strate École de Design · Designer d'interactions / Transportation Design | no-project-items | 0 |
| ETH Zürich · Computer Vision Lab | no-project-items | 0 |
| Harvard MDE Official Site | http-403 | 0 |
| UChicago · uchicago-cs | no-project-items | 0 |
| UC Berkeley · MDes / Jacobs Institute / CED / CDSS | http-403 | 0 |
| UCLA · DMA MFA Students | no-project-items | 0 |
| Design Academy Eindhoven · All Projects | no-project-items | 0 |
| Stanford · d.school / HCI Group | no-project-items | 0 |
| UIUC · Siebel School / Art + Design / Siebel Center for Design | readable | 3 |
| Design Academy Eindhoven · designacademyeindhoven | github-http-404 | 0 |
| Parsons · parsonsdt | readable | 3 |
| Kickstarter · Design | failed-Error | 0 |
