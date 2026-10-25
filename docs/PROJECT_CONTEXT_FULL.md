# 故事岛大冒险 · AI 前端开发上下文

> 快照日期：2026-10-24（Asia/Shanghai）。
> 本文件依据用户手动调整后的当前 Figma 新版设计重新只读提取，并结合本对话中明确的产品意图编写。此次没有修改、重命名、缩放、清理或验收 Figma 画布。
> 接手目标：根据现有设计开发**可交互的前端演示**。不是重新设计，也不是先继续整理 Figma。
> 阅读优先级：**当前 Figma 新版画面与实例实际属性 > 本文的“当前读取”记录 > 历史需求 > 标为“实现建议”的映射**。本文是快照，后续 Figma 如有更新，以更新后的设计为准。

## 阅读导航

1. 项目目标、边界与来源
2. 产品概念、视觉与设计方法
3. 页面地图与用户流程
4. 组件、变量、样式和嵌套逻辑
5. 自动布局与前端适配映射
6. 交互、状态、数据和资源规则
7. 动效与团团动画要求
8. 资产来源、导出和文件组织
9. 演示实现范围、未定义项与交接指令
10. 附录：当前全部页面、变量、组件、原型连线、动效参数、图片索引与滚动容器

主文可作为首次接手说明；附录用于实现时查值、定位节点和追踪来源。无需从历史聊天重新推断已明确的设计。

## 1. 项目配置与范围

### 1.1 设计源

- 项目名称：**儿童叙事——故事岛大冒险**；产品画面标题为“故事岛大冒险”。
- Figma fileKey：`l7Z5Nfkjt2wUKhatOdZvK0`。
- 当前美术页面：`ui/art`，page ID `3:3`。
- 唯一新版页面区域：`ui/newVersion`，section ID `2399:13537`。
- 新版主画面：19 个，基准画板均为 **1920 × 1080 横屏**。
- 当前新版起点：`2020:4451`，Figma prototype flow 名“故事岛大冒险 - 新”。
- 目标设备：**横屏平板和电脑**，覆盖 16:9、16:10、4:3 的设计意图；没有竖屏手机方案。
- 本轮只输出上下文，不复测适配；用户已自行完成画布调整。不要把此前审计中的失败项当作当前页面结论。

设计入口：
[新版区域](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2399-13537) ·
[首页](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-4451)

### 1.2 明确排除的旧版

用户明确表示旧版已有存档，不需要旧版变量，并要求忽略所有旧版相关设计。以下不作为实现规格：

- `archive/original`（`2063:5750`）；
- `library/legacy` 页面（`3:2`）；
- `ui/wireframe` 页面（`3:4`）；
- 旧主题、旧版原型入口、此前的审计和适配测试副本。
- `assets/source`（`0:1`）只可作为当前新版确实复用的素材来源，不能据此把旧 UI 重新实现。
- 新版区域下还有少量散落 icon/vector/group，并非额外路由或页面。

当前 17 个 `library/...` 区域位于 `ui/art` 中，是新版组件来源；不要误把名称含 library 的新版区域都视为旧版。

### 1.3 已知与未知的工程配置

本次工作目录为 `E:/02-Projects/02-儿童叙事/Output`，主要是设计资产和导出清单；本次没有读取到或确定一个现成前端工程的 package、构建脚本、框架版本、部署方式、API 服务或数据库配置。

因此：

- 下文的组件名、类型定义、目录结构均为**实现映射建议**，不是已有代码。
- 如接手时已有仓库，先读其 README、AGENTS.md、依赖和运行命令，沿用仓库约定。
- 如需从零开发，先明确演示技术栈，再建立最小可运行工程；不应凭本文宣称项目已使用某个框架或库。
- 没有要求接真实支付、账号、云端语音识别、图片生成、文本评测或视频渲染服务；演示可以通过可替换的 mock adapter 驱动。

## 2. 产品概念与设计方法

### 2.1 产品在做什么

这是一个中文儿童叙事引导游戏：孩子在“故事岛”中进入章节和关卡，选场景、用贴纸搭建故事画面，与侦探小浣熊“团团”说话，补齐故事要素，查看并修改整理好的故事，再把故事变成小电影，获取贴纸及资源奖励。

叙事目标不是只完成按钮点击，而是帮助孩子讲清楚：

1. 谁、在哪里；
2. 先后和为什么；
3. 后来怎么样。

故事岛被“一句话大王”的灰雾笼罩，孩子通过讲更完整的故事驱散灰雾。这是鼓励式的冒险包装，不应被改造成严肃考试或文字密集的评分后台。年龄段没有在当前资料中明确，不要擅自填写具体年龄。

### 2.2 核心设计方法

- **先搭画面再讲述**：选择场景和贴纸降低空白叙述的难度。
- **分步引导**：顶部五步进度对应场景、拼贴、讲述、修改、拍摄，末端宝箱表达奖励。
- **即时可见反馈**：故事本要素、星星、团团表情、语音按钮状态承接孩子的输入。
- **实体书隐喻**：奶油纸张、木质封边、银色装订环、左右页和书脊是主要信息容器，不应替换为通用后台卡片。
- **高频组件复用**：同一按钮、木牌、星级行、贴纸槽、麦克风、资源条在不同状态复用；页面差异应由数据与状态控制。
- **文字与插画分层**：用户曾要求木牌素材不含文字和按钮。正式 UI 中的木牌标题、按钮文案、资源数量应尽量保持活文本；不要将整张页面烘焙成图片。
- **简洁优先**：用户多次要求简约、减少文字、避免过多装饰；主要动作突出，辅助动作保持清楚。

### 2.3 视觉语言

- 明亮天空蓝、草地绿、蜂蜜橙/金黄、奶油白，正文以深蓝为主。
- 木牌、木板、木质边框、柔软圆角、白色厚描边、轻微高光和偏移阴影，具有儿童游戏的触感。
- 场景底图使用简洁插画，角色和木质 UI 素材更细致、带柔和体积感；不要把所有内容统一重画为纯线性图标或完全无阴影的平面 UI。
- 主按钮常见黄橙渐变和白色文字；辅助按钮多为白底蓝色描边/文字；录音按钮为大号蓝色圆形。
- 团团特征：棕色侦探格纹帽、棕黄色外套、蓝色领巾、蓝色星星背包、棕白环纹大尾巴。各状态必须保持角色一致。
- 中文字体：展示标题以 `KeinannMaruPOP / Black` 为主；正文以 `LXGW 975 Yuan SC / 700W` 为主；实际使用还包含该字体 400W 和 `Noto Sans SC / Bold`。完整样式见附录。
- 不要为主角、木牌、章节插画随意换一套网络图标或 emoji；emoji 仅可出现在开发说明中，不替代正式资产。

## 3. 页面与流程

### 3.1 主线

```text
标题首页
  → 故事岛地图
  → 我的小镇章节地图
  → 选中“快乐的一天”并查看木牌说明
  → 选择场景
  → 拼贴纸/布置画面
  → 讲故事（等待输入 ↔ 正在听）
  → 故事本完成展示
  → 查看并修改团团记录的故事
  → 拍摄电影
  → 配音提示（先不配 / 开始配音）
  → 电影预览与分幕
  → 关卡奖励
  → 回到地图 / 保存作品并查看图鉴

旁支：
拼贴页或贴纸图鉴 → “说一说，变贴纸”弹层
资源条 → 资源钱包
图鉴电影列表 → 电影播放器 → 返回图鉴
```

这是一条产品语义主线；Figma 中存在用于演示的超时跳转、点击画面继续、点击第四幕进入结算等便捷连线，不能直接当成真实业务触发条件。实际读取到的连线列在附录。

### 3.2 页面说明与应有行为

| 页面 | 当前画面及主要用途 | 演示实现重点 |
|---|---|---|
| 首页 | 故事岛背景、Logo、团团、“开始冒险”，右上资源和图鉴入口 | 开始按钮进入地图；背景与交互文字分层 |
| 故事岛 | 多个主题岛屿及虚线路径，锁定状态、星数、团团对白 | 开放“我的小镇”主线；其他章节保留设计状态 |
| 小镇概览 | 我的周末、快乐的一天、第一次……、下雨天、大王挑战、自由故事等节点 | 选中关卡显示说明，不把锁定关卡默认为可进入 |
| 关卡选中 | 屏幕下方居中、扁矩形告示牌式木框，标题、三条目标、掉落和“出发！” | 与地图背景同页呈现；不是单独营销页 |
| 场景选择 | 公园、小河边、我的家、学校四张卡，团团提问；选中卡显示确认按钮 | 单选，保留场景 ID；家的图为房屋室内 |
| 拼贴 | 左侧场景预览，右侧分类书签、贴纸网格、变贴纸、拼好啦 | 选择/放置贴纸，保留结果供后续讲述与拍摄使用 |
| 拼贴中的贴纸生成 | 在拼贴背景上增加遮罩和木质生成弹层 | 打开、按住录音、生成、重试、接受、关闭；关闭回原上下文 |
| 讲述 idle | 左侧场景和团团，中间对话历史及麦克风，右侧故事本 | 按住说话，显示已有输入和故事要素 |
| 讲述 listening | 同一布局，麦克风变为收听状态，显示“正在听你说话”和占位气泡 | 松开结束输入，接收一段文本；不能每次录音重置页面数据 |
| storyExpanded | 更多对话/故事信息的演示状态，团团说“我知道啦！” | 是同一叙事流程状态，不应另建一套无关联的数据 |
| 讲述 complete | **展开的实体双页故事本**；左页场景与团团，右页分类故事要素和星星，按钮“看看团团记下的故事” | 与最终关卡奖励页区分；继续到故事修改 |
| 故事修改 | 左页场景，右页故事正文、“我还想加一句”、右下“改好啦，开拍电影”及宝石成本 | 文本可编辑/补充，保留编辑内容；不要把右页替换成评分列表 |
| 拍摄 | 剧场帷幕、舞台、男孩/小猫/红风筝、就绪标识、“第2幕”和拍摄进度 | 角色、风筝、背景分层；用可确定的分幕数据驱动演示 |
| 配音提示 | 拍摄背景上有遮罩，麦克风图标、说明、“先不配”“开始配音” | 两条路径都可继续；“先不配”不能阻塞通关 |
| 预览 | 舞台预览、重播、第一至第四幕时间线 | 可选分幕/重播；Figma 第四幕连到结算是演示连线 |
| 关卡结算 | 故事岛背景、木框结果板、三颗展示星、新贴纸、目标、保存给爸爸妈妈、回到地图、颜料奖励飞往资源条 | 这是领取/展示奖励页，不是故事本完成页；保存与返回均可操作 |
| 贴纸图鉴和电影 | 打开的书：左贴纸收藏及进度、右电影列表，下方变贴纸入口 | 两边列表分别滚动；已拥有和未解锁样式不同 |
| 图鉴中的贴纸生成 | 图鉴保持在遮罩后，共用生成组件 | 接受新贴纸后回图鉴，不应硬跳回拼贴 |
| 电影播放器 | 电影大画面、播放控制、进度/时间、返回 | 演示时支持播放/暂停、进度和关闭；不要把背景列表滚动当播放器滚动 |

### 3.3 当前示例文案和数据

- 当前演示关卡：“快乐的一天”，稳定业务 ID 建议 `happyDay`；章节 ID `myTown`。
- 场景选项：“公园 / 小河边 / 我的家 / 学校”。
- 团团开场：“快乐的一天……那天，你在哪里呀？”。
- 拼贴提示：“那天都有谁？他们在干什么？摆出来给我看看！”。
- 当前示例整理文本：

> 有一天，男孩和小猫来到了公园里。男孩先跑来跑去地玩，然后一口气跑回了家。因为男孩玩得太累啦。天快黑了，小猫和男孩开开心心地说了再见。

- 作品示例名还包括：温馨的夜晚、冒险的旅程、静谧的早晨、激动的时刻、创意的碰撞。
- 资源条示例：颜料 6、宝石 2；图鉴进度示例：21 / 34；播放器时间示例：0:28 / 1:32。这些是种子数据，不是永久常量。
- 页面中的 `Info` 是当前故事要素行的占位文本；实现时应预留真实要素内容字段。不要把它理解成英文功能名、路由或后台模块。

## 4. 变量、样式与组件逻辑

### 4.1 当前规模与命名

本次读取：

- 2 个本地可列举变量集合：`color`、`dimension`；均为单一 `default` mode。
- 可列举变量 108 个；另在实际引用中解析到 `numeric/px2`（值 2），因此附录记录 **108 + 1 个**，不把可列举数量误当完整引用闭包。
- 5 个 Text Styles、2 个 Paint Styles、4 个 Effect Styles。
- 77 个组件家族（包含单组件和组件集；具体变体为家族内部子项）。
- 图片填充去重得到 57 个 imageHash；这是“当前新版及组件变体”的图片引用集合，不等于已导出的图片文件数。
- 多用 `/` 分组，每一段采用 camelCase。Figma 的 `/` 既是设计系统分类，也方便导出创建目录。

规范映射示例：

```text
screen/story/happyDay/narration/listening
character/tuantuan/animation
control/storyButton
story/storybookPage
semantic/background/orange/3
typography/fontSize/px36

前端可映射为：
screens/story/happyDay/NarrationScreen
components/control/StoryButton
tokens.semantic.background.orange[3]
```

不要擅自重命名 Figma。代码中的组件类型按代码库惯例可用 PascalCase；Figma 名称与代码名的映射应单独保留。`label#2389:14` 一类带 `#` 的键是 Figma 属性内部 ID，代码 API 可叫 `label`，无需照抄内部后缀。

### 4.2 变量层级

```text
primitive/...         原始颜色
semantic/...          文本、图标、边框、背景、遮罩、状态
effect/...            阴影/高光颜色等
typography/...        字体族、字重、字号、行高
spacing/...           间距
size/...              图标/控件尺寸
radius/...            圆角
strokeWidth/...       描边
numeric/px2          额外解析出的描边和效果数值引用
```

使用原则：

1. 语义变量通过 alias 指向基础颜色；不要将“alias ID 字符串”当 CSS 值。
2. 保留语义层，即使几个 token 目前解析成相同颜色，也不要因同色而合并文本色、图标色、描边色。
3. `scopes` 是 Figma 属性面板可用范围，不是运行时主题模式。
4. 颜色从 0–1 RGBA 换算；alpha 必须保留。数字变量按实际使用决定 px 或无单位，不能统一全部加 px。
5. 字号/行高同样存在变量与 Text Style 双层关系；当前实例可以有本地覆盖。还原页面时读最终实例值，不只看 style 名。
6. 本次没有读到新版的 light/dark、多品牌或 art/wire 主题需求，不创建这些模式。
7. 全部变量的 ID、类型、alias、解析值见附录；禁止只凭“橙3”等名称猜颜色。

### 4.3 组件的分层与依赖

```text
页面 / feature 状态
  ├─ navigation/topBar（页面布局组织）
  │   ├─ control/storyButton
  │   ├─ progress/storyStepProgress
  │   └─ resource/statusBar → dialog/resourceWallet
  ├─ 业务组件
  │   ├─ navigation/sidebar
  │   │   ├─ navigation/storyBookmark → control/iconSlot → icon/*
  │   │   ├─ sticker/stickerSlot → sticker/rainbow（可替换）
  │   │   └─ control/storyButton → resource/costBadge
  │   ├─ story/openStorybook
  │   │   └─ story/storybookPage
  │   │       ├─ navigation/woodenTitle → surface/woodenTitle
  │   │       ├─ story/elementRow → iconSlot → icon/star 等
  │   │       └─ story/editableContent → dialog/sentenceEditSuggestion
  │   └─ dialog/modalOverlay → dialog/stickerGenerator
  └─ character/tuantuan/scene
      ├─ character/tuantuan/animation
      └─ 团团对白和提示图标
```

上图是语义化组织说明，不代表每个路径都已经是 Figma 主组件；例如 topBar 常是页面 Frame，不能仅因命名就当作可 import 的组件。主组件精确列表在附录。

嵌套重点：

- `surface/woodenTitle` 是木牌表面视觉，`navigation/woodenTitle` 是含导航语境/文字的包装，二者不是多余重复项。
- `character/tuantuan/animation` 是表情/姿势图；`scene` 是人物、对白组合；`avatar` 用于对话/地图头像。不要将整组对白一起导成一张不可编辑图片。
- `artwork/map/island` 与 `map/islandMarker`、`artwork/map/chapter` 与 `map/chapterNode` 分别负责插画与状态化交互容器。
- `control/iconSlot` 负责尺寸/图标替换；被换进去的 `icon/*` 保持独立资产。
- `resource/costBadge` 主组件默认图标并不等于页面实际货币；**实例可把内部图标换成 droplet 或 diamond**。当前读取证实变贴纸用 droplet，开拍电影用 diamond。
- 同样，默认彩虹贴纸是示例插槽内容，不意味着全部贴纸都是彩虹。图鉴里的重复彩虹属于当前占位资产。
- 对多个相似页面，应复用一个有状态组件，而不是复制出 19 套独立实现。

### 4.4 主要变体维度

| 家族 | 轴及值 | 运行时意义 |
|---|---|---|
| control/storyButton | variant：compact / heroSmall / hero / icon / standard / blue / blueWhiteFill；state：default / active / disabled；size：default / sm | 视觉外观、交互状态和尺寸是独立概念；不是任意组合都有对应设计 |
| control/micButton | state：idle / listening；size：lg / md | 同一个录音控件的待机和收听 |
| scene/locationSelectionCard | state：selected / default | 场景单选 |
| progress/storyStepProgress | step：scene / composition / narration / storyEdit / filming | 顶部五步业务进度 |
| progress/storyStepIndicator | tone：accent / completed / neutral / muted | 单个步骤的颜色表达 |
| map/chapterNode | state：available / completed / locked / current；variant：standard / free | 关卡状态与关卡类型 |
| artwork/map/island | island + state：active / disabled / default | 主题岛插画变体 |
| sticker/stickerSlot | state：default / selected / disabled | 正常、选中、未获得等视觉态 |
| navigation/storyBookmark | state：default / selected | 贴纸分类 |
| story/storybookPage | mode：collect / edit / complete | 收集要素、修改正文、完成展示 |
| story/openStorybook | mode：summary | 展开书本组合 |
| story/elementRow | state：filled / empty | 行的信息填充情况；星级需另用数据描述 |
| story/editableContent | state：default / editing / selected | 原文、编辑和选中提示 |
| dialog/stickerGenerator | state：idle / listening / generated | 贴纸生成流程；尚无显式 error/loading 变体 |
| dialogue/speechBubble | role：guide / player / placeholder | 气泡说话方/占位 |
| resource/statusBar | state：default / walletOpen | 钱包收起/展开 |
| media/sceneTimelineItem | state：active / default | 当前分幕 |
| character/tuantuan/animation | 9 个状态 | 见动效章节；包含一个 directingAlternate |

组件集尺寸是变体展览板的包围范围，**不是单个控件尺寸**。附录同时列各个具体变体的尺寸。

## 5. 自动布局与适配映射

### 5.1 当前读取到的结构

所有画板基准为 1920×1080，但不是所有根 Frame 都启用了 Auto Layout：

- 首页、地图、场景选择：根布局为 `NONE`，内部相关元素仍有 Auto Layout，空间性场景/地图使用约束和坐标。
- 拼贴及其生成弹层：根 `VERTICAL`；主体 `HORIZONTAL`，左场景预览、右侧栏；顶栏绝对定位。
- 讲述：根 `VERTICAL`，顶内边距约 144；主体三列分别为场景、对话、故事本，横纵 `FILL`；团团和顶栏为绝对定位。
- 讲述完成/故事修改：主体装入展开书本，左右页按书本内容组织。
- 拍摄/预览：主体纵向，舞台吃剩余高度，进度/分幕时间线 `HUG`。
- 图鉴：主体横向打开的书，两页；贴纸和电影列表各自滚动。
- 结算：根 `VERTICAL`，paddingTop 192，左右/下 24；resultStage 横向占满主体；结果板、奖励效果和人物按当前层叠呈现。
- 弹层/播放器：跨屏覆盖，与底层业务状态分离。

上面的数值描述设计坐标中的当前快照，不要求所有 CSS 视口都原样写死 144px。精确根层/子层布局值在附录；部分手动新增 Frame 名仍为 Frame 81/83 等，保留当前名称，不将其视作新的设计语义。

### 5.2 从 Figma 到 DOM/CSS 的规则（实现建议）

| Figma | 前端映射 |
|---|---|
| HORIZONTAL / VERTICAL | flex row / column；相关子项仍形成容器，不拆成全屏绝对坐标 |
| HUG | intrinsic content / auto 尺寸，由内容决定；按钮 label 改变时能增长 |
| FILL | 分配剩余空间，常用 flex:1 或网格分数列；需要 min-width:0 / min-height:0 才能正确收缩 |
| FIXED | 控件或插画的设计尺寸；按容器与设计比例映射，不等于所有设备均固定同一 CSS 像素 |
| WRAP | flex-wrap / 自适应 grid，保留原顺序和间距 |
| 垂直 overflow | 对应区域 overflow-y:auto；不要只设置 overflow:hidden 让内容消失 |
| constraints MIN / MAX / CENTER / STRETCH / SCALE | 分别近似起边、终边、居中、两边锚定、按父容器相对位置/尺寸；结合 actual hierarchy 实现 |
| layoutPositioning ABSOLUTE | 装饰、团团、木板背景、覆盖层等局部定位；其坐标属于所属容器，不直接当成页面全局坐标 |
| clipsContent | 明确的图片/内容裁切边界；不能用于掩盖漏排的按钮 |

**关键区别**：地图路径、节点、场景贴纸坐标可以使用局部绝对定位；正文、标题、目标列表、按钮行应该保留流式布局。不要把整个页面展平成一张图或把全部文本套一个 transform 缩小。

### 5.3 推荐的运行时分层

```text
GameViewport
  BackgroundLayer（场景图，可裁切）
  ScreenLayout
    Hud（返回 / 当前标题 / 五步进度 / 资源）
    MainContent（flex/grid，自适应内容区）
  CharacterLayer（团团，点击穿透/仅交互区域可点击）
  FeedbackLayer（星星、资源飞行动效）
  OverlayLayer（遮罩、弹窗、播放器）
```

这是代码架构建议；具体 z-index 及当前视觉覆盖顺序需按 Figma 画面读取。图鉴播放器等画面可能仍保留顶栏；不要让一套全局 z-index 规则覆盖所有页面的设计差异。

### 5.4 必须保留的适配含义

- 横屏电脑/平板，不新增未经设计的竖屏重排。
- 背景可以 cover；人物、贴纸、木牌边缘和可读内容应保留比例、完整轮廓及触控区域。
- 木牌边框宜采用可伸缩边框/分片策略或明确的背景裁切配置；不能简单 cover 导致木边被裁掉。
- 书页背景/装订环是装饰层，正文、星级行、按钮是内容层；书页尺寸变化不应改变数据。
- 对话历史、故事要素、长正文、贴纸网格、电影列表各自滚动；操作区不要随着列表内容无限向下挤出。
- 当前叙事三列在 1920 下约为 601 / 621 / 601 的主体列宽，不应直接当成每个视口的固定宽度。
- 一些角色容器很大并有透明区域/超出纸张的尾巴，节点边界并不等于实际可见人物轮廓。定位时参考 alpha 可见区域和画面，不凭总高度裁切。
- 如果采用统一设计坐标缩放容器，屏幕点击、拖拽坐标需逆变换；弹层和正文适配仍要按内容处理，不能把“等比缩放”当所有布局要求的替代方案。

## 6. 交互、评分与状态数据

### 6.1 五类“进度”不要混淆

1. **五步流程**：场景、拼贴、讲述、修改、拍摄。
2. **故事要素填充**：当前故事本分组行包括“谁、在哪里、发生了什么、做了什么/先后、为什么、后来呢？”等。当前完成画面是 6 行，不是简单五行旧原型。
3. **逐要素星级**：行内以星星表达质量或进展，不能只用是否填满替代。
4. **关卡结算展示星**：结算页大号三颗星，是结果层的呈现；与要素行的星星不应未经规则就直接相加。
5. **章节/收藏进度**：地图上的 2/15 和图鉴 21/34 属各自上下文，不可套用为单关的分数分母。

历史曾出现“五项、每项三颗星、9/15 已达通关”的概念图要求；**当前六行设计、三项目标和地图分母不能据此硬编码成统一 15 分规则**。正式阈值、星级累计、可否重复领取等都没有完整业务配置。演示用单独的配置/fixture 控制。

### 6.2 已明确的产品意图

- 达到通关标准后，可以进入故事修改；不应要求满星才允许继续。
- 玩家可以返回继续集星，进度应保存，不把返回变成重开清空。
- “故事本记满啦”需要**书本展开**的效果，为后续动画保留书脊、左右页和内容层。
- 当前画面的完成态主要显示“看看团团记下的故事”，返回箭头连回前一叙事态；历史“双按钮继续集星/修改故事”是产品意图记录，不应未经确认强行添加到当前画面。
- 当前正式关卡结果页按钮是“保存给爸爸妈妈”“回到地图”，不是历史示意图里的“去下一关”。

### 6.3 资源规则

| 视觉符号 | 当前钱包用名 | 当前读到的用途/数值 | 需要参数化的部分 |
|---|---|---|---|
| 水滴图标 icon/droplet | 颜料 | 资源条示例6；变贴纸成本1；结算可见 +3；钱包“变贴纸、改一改要用” | 生成何时扣除、失败退还、改写成本、每日领取规则 |
| 粉紫钻石 icon/diamond | 宝石 | 资源条示例2；“改好啦，开拍电影”成本1；钱包“拍电影用，可换颜料” | 汇率、兑换、获取、重复拍摄是否扣费 |
| 金色星星 | 故事/章节进度和评分 | 不是颜料/宝石余额 | 总分、等级和解锁阈值 |
| 彩虹等贴纸 | 收藏/创作资产 | 关卡掉落，当前多个槽用彩虹占位 | 奖池、唯一ID、去重和重复获得策略 |

钱包还包含“领今天的 +5”和“问问爸爸妈妈”。这是当前设计文案，不代表已接入签到接口、家长验证或付费系统。演示可提供可配置的本地行为，但不能假称已经完成支付或真实家长授权。

### 6.4 状态机与共享数据（实现建议）

```ts
type FlowStep = 'scene' | 'composition' | 'narration' | 'storyEdit' | 'filming';
type SceneId = 'park' | 'riverside' | 'homeInterior' | 'school';
type RecorderState = 'idle' | 'listening' | 'processing' | 'error';
type GeneratorState = 'idle' | 'listening' | 'processing' | 'generated' | 'error';
type TuantuanState =
  | 'idle' | 'talking' | 'wink' | 'directing' | 'directingAlternate'
  | 'celebrating' | 'thinking' | 'surprised' | 'nervous';

interface StorySession {
  sessionId: string;
  chapterId: string;                // 当前演示 myTown
  levelId: string;                  // 当前演示 happyDay
  sceneId: SceneId;
  placedStickers: PlacedSticker[];
  messages: { id: string; role: 'guide' | 'player'; text: string }[];
  criteria: {
    id: string;
    label: string;
    text: string;
    stars: number;
    maxStars: number;              // 配置来源，勿由行数猜测总分
    filled: boolean;
  }[];
  transcript: string;
  draftText: string;
  passed: boolean;                 // 与满星区分
  step: FlowStep;
  movieId?: string;
}
interface PlacedSticker {
  instanceId: string;              // 同一贴纸允许多次放置时使用独立实例ID
  stickerId: string;
  x: number; y: number;            // 建议相对画布归一化坐标
  scale: number;
  rotation: number;
  zIndex: number;
}
interface Wallet { pigment: number; gems: number }
interface MovieScene {
  id: string;
  title: string;
  durationMs: number;
  backgroundAssetId: string;
  actors: { assetId: string; x: number; y: number; scale: number }[];
  narrationText: string;
  audioUrl?: string;
}
```

以上是待开发接口示例，不是项目现有 API。业务上还应独立保存：

- `selectedLevelId` 与 `unlockedLevelIds`；
- `ownedStickerIds`、生成结果、当前贴纸分类；
- `movies`、当前分幕、播放状态与音轨；
- 当前 overlay 及其来源 `composition | collection`；
- 已发放奖励的 session/level 标记，避免重复打开结算就反复加资源。

### 6.5 必要交互细节

- **场景选择**：只激活一个选项；选中与进入是两种动作。
- **拼贴**：当前静态稿表达了分类与选择；拖拽、缩放、删除、最大数量、图层前后等完整手势没有全部定义。演示至少实现贴纸加入/放置和所见即所得状态，扩展手势标为实现补充。
- **录音**：采用按住开始、松开结束。桌面鼠标与平板触摸应统一处理 pointerdown/up/cancel，避免拖出控件或切后台后一直录音。
- **语音识别**：无后端时可以用预设转写片段推进，但要把识别 adapter 隔离；不能要求儿童在 UI 上配置 API key。
- **生成贴纸**：idle → listening →（processing，为代码需要补充的过程态）→ generated；支持重新生成、接受、关闭。共享同一组件，返回生成入口的来源上下文。
- **故事修改**：正文、选中句子、补充语音/编辑建议是状态，不是每次进入重新生成默认文本；返回继续讲时也保留内容。
- **电影**：将舞台背景、男孩、小猫、红风筝与对白/字幕、音频分开组织。原型中“第2幕”与四个时间线项目是示例，不要把播放器做成只能播放一张静态截图的死页面。
- **保存给爸爸妈妈**：当前连线通向图鉴，表示作品保存/进入收藏的演示路径；没有系统分享或视频文件导出的既定 API。演示可保存本地作品条目；真实文件导出另行定义。
- **关闭弹层**：恢复底层状态，不重置当前场景/文本；Back 需要明确来源，避免浏览器历史为空时退出整个演示。
- **资源不足/录音权限拒绝/生成失败**：没有完整视觉稿，可用与现有组件风格一致的最小反馈，并标为补充状态，而非新增复杂流程。

## 7. 动效上下文

### 7.1 当前 Figma 中确实存在的内容

本次读取到：

- 19 个页面的 timeline 元数据；
- 23 个实际节点挂载了 Motion animation styles，共 60 条样式实例；
- 在本次扫描的非实例派生节点上，未读到手工 keyframe tracks；
- 普通页面 timeline 多为约 0.999055 秒；首页 2.5 秒；最终关卡结算 8 秒。
- 因此不能把“未有 manual tracks”写成“没有动效”。当前真实信息主要在 animation styles 和 prototype reactions 中。

prototype 常见参数：

- `SMART_ANIMATE` 或 `DISSOLVE`，时长约 0.3 秒，`EASE_OUT`；
- 原型按钮 `ON_PRESS` 与 `ON_CLICK` 分别承担按压和跳转；
- 讲述展开、编辑句子等存在 0.8 秒超时示范；
- 按住收听与松开结束分别为 `ON_PRESS`、`MOUSE_UP`。
- 时间单位：Figma 读取值为**秒**；代码的 ms 需显式乘1000。

### 7.2 当前结算 8 秒序列

下表为直接读取的样式语义概括，完整 easing、amount、offset、duration 见附录，不以此替代设计预览：

| 时间点（秒） | 节点/内容 | 动作 |
|---|---|---|
| 0.000 | 中间大星星 2540:24123 | 0.3s 内位移、80%缩放进入、旋转和快速显现 |
| 0.739 | 左星 2540:24143 | 同组进入 |
| 1.190 | 右星 2540:24154 | 同组进入 |
| 3.000 | 保存给爸爸妈妈 2540:28631 | 位移20、60%缩放进入、淡入；各轨道时长不同 |
| 3.380 | 回到地图 2540:24554 | 与保存按钮错峰进入 |
| 4.004 起 | 奖励/宝箱效果层 2542:28666 | 位移、缩小、淡出组合 |
| 4.423 | 新贴纸 2542:31130 | 从0缩放进入，约0.9s，带超调 cubic 曲线 |
| 4.544 | 颜料 +3 2542:31137 | 位移30、淡入 |
| 5.496 | “新贴纸!”标签 2542:31399 | 位移、缩放、旋转与显现组合 |
| 5.720 起 | 颜料 +3 | 向上移动60，随后缩小/淡出，语义为飞向资源条 |
| 5.970 | 三项目标说明 2542:32984 | 0.5s 淡入 |

奖励动效只负责呈现，资源到账由业务事件控制一次。不要把一帧坐标或某个动画结束回调作为唯一账务依据。跳过/减少动效时仍应能得到最终内容和可用按钮。

其他当前样式包括岛屿 marker 的105%脉冲、头像/对话提示上下移动10、星星120%强调、彩虹贴纸轻微旋转弹性效果，以及播放器的位移/缩放/透明进入。节点名相同并不意味着动画参数相同，应按 ID 查附录。

### 7.3 故事本展开：历史明确要求

用户明确希望故事本展开，之后制作动画；当前完成画面也已采用双页书本。实现时保留：

- 左页、右页、封面/木质外沿、书脊、装订环、纸面内容、人物、按钮各自层级；
- 翻页/展开的轴心在书脊附近；
- 固定镜头，背景只做需要的遮罩/明暗变化；
- 书页展开完成后再让内容进入，且保持可读；
- 当前未据此读取到一段已完整制作的“3D翻书”动画，**不要宣称该动画资产已经存在**。

若演示需要先做简化展开，可使用局部 transform 的开合与内容淡入作为实现方案；具体时长、页曲率和音效尚未正式约定。不要为了动画把书页内容导成一张不能交互的大图。

### 7.4 团团的状态与透明底动画要求

当前 `character/tuantuan/animation` 有9个状态：

| state | 形象/用途 | 动效基本描述（历史需求对应的实现建议，非已交付帧动画） |
|---|---|---|
| idle | 拿放大镜观察 | 轻微呼吸、眨眼、放大镜小幅观察摆动；手和镜片不分离 |
| talking | 说话引导 | 嘴部轻开合、轻点头、手势小幅摆动；有声时可跟随说话节奏 |
| wink | 眨一只眼并点赞 | 一次wink加小幅点头/拇指强调，回到稳定姿势 |
| directing | 指向某处并持场记板 | 指向手轻强调，场记板可小幅开合；不变换道具、不新增文字 |
| directingAlternate | 导演姿势的补充版本 | 按对应实际变体导出和播放，不擅自当成第10个业务状态 |
| celebrating | 跳起欢呼 | 小幅蓄力、跳起、举手、落下缓冲；尾巴跟随，完整身体保持在输出画布中 |
| thinking | 手撑下巴思考 | 轻歪头、眼神上移、手指小动，呼吸循环 |
| surprised | 惊讶 | 眼睛睁大、嘴呈O、双手轻抬，一次小幅后仰再稳定 |
| nervous | 紧张 | 双手收拢、肩膀轻颤、目光微动，可保留原画汗滴；不生成夸张恐怖表情 |

**用户明确约束：像透明底 GIF 一样的角色素材，不能由 AI 自动添加背景或运镜。**

任何生成工具的提示词都应重复以下约束：

> 固定镜头、固定构图、全身角色、透明背景/alpha、不添加任何场景、无推拉摇移、无变焦、无景深变化、角色造型服饰与参考一致、无额外角色或文字、脚底基线稳定、留足尾巴和跳跃空间、首尾衔接。

当前 Figma 角色变体本身是图片填充的静态图，未因此证明已有9个可播放透明 GIF/视频。接手时先查真正的动效文件；没有时使用静态姿势与轻微前端变换回退，不能声称已经接入说话口型动画。具体透明动画封装格式在项目中未定。

### 7.5 前端动效实现边界

- 摄像机保持稳定；界面过渡与局部角色动画分离。
- 录音“听你说话”的脉冲属于 UI 动画，不等于麦克风真实已经录制。
- 页面状态重入时避免反复发奖励或重复启动多个 timer。
- 非当前页面的循环、录音可视化和媒体定时器要停止。
- 提供减少动效的降级，不让动画阻止阅读和点击。
- 未提供音效/BGM文件清单、配音录音或语音合成服务；这些不能写成已存在资产。

## 8. 资产与导出

### 8.1 当前 Figma 中的资产类型

- 大背景：故事岛、草地章节地图、创作流程背景。
- 四场景缩略图：公园、小河边、家室内、学校。要从各场景**页面实例**取图；主组件默认填充不一定等于实例填充。
- 岛屿/关卡插画：各岛3状态、各关卡主题图、自由故事书本。
- 团团：9个姿态图及头像/对话包装。
- 木质 UI：标题木牌、关卡告示牌、侧栏框、生成弹窗、结算框、按钮背景。
- 电影分层：舞台背景、透明男孩、小猫、红风筝。
- 向量：星星、禁用星、水滴、钻石、贴纸、地点、人物、播放、返回、关闭等。

本轮只读到了图片填充引用、节点 ID 和现有 exportSettings，**没有批量导出这些图片、字体或视频**。imageHash 是 Figma 内部标识，不是可供浏览器请求的 URL，也不是磁盘文件名。附录尺寸是节点当前使用尺寸，不一定是源图原生像素尺寸。

现有导出预设中，diamond / droplet / star / starDisabled / sticker 配了 SVG；奖励效果图片层配了4x PNG。这只代表节点预设，不代表目录中已经有对应导出文件。

### 8.2 资产获取方法

1. 根据本文 ID 在当前 Figma 读取目标页面和截图，确认其上下文。
2. 对主组件与页面实例分别检查最终图片填充、变体和覆盖；尤其场景卡、货币图标、贴纸和团团状态。
3. 使用可用的 Figma 资产导出能力取得 PNG/SVG/原图；不要把 Figma hash 写进 `img src`。
4. 一张背景可导图；正文、动态数字、星级状态和按钮点击区域仍用前端结构。
5. 图标可优先导 SVG；复杂角色、材质插画用带 alpha 的图片。不要人为给透明角色加白底或黑底。
6. 做资产 manifest：业务 assetId → 文件路径 → Figma nodeId/imageHash → 实际像素/裁切方式。相同 hash 共用资源，业务状态保持独立。
7. 保留归档与当前正式资产的来源差异，不直接从历史概念图中裁切低清成品替代当前素材。

### 8.3 工作目录已有文件（历史素材，不优先于当前设计）

当前工作目录可见：

- `主角小浣熊-侦探装扮-v1.png`；
- `我的小镇-关卡地图-快乐的一天-v1.png`、水滴钻石奖励v2、简约版v3及提示词；
- `说一说变贴纸-图标-v1.png` 和 prompt；
- `故事本结算弹窗-已通关未满星-v1.png`；
- `故事本结算-展开双页示意图-v2.png` 和 prompt；
- `图片拆分素材.zip`。

zip 内部已查看目录，包含：

```text
图片拆分素材/
  01-纯背景.png
  02-浣熊.png
  03-空白书本.png
  04-故事插画.png
  05-风筝.png
  06-星星.png
  07-空白气泡.png
  08-空白按钮.png
  生成提示词.txt
```

这些可作为参考或临时补齐资源；本轮未逐一确认其与当前 Figma 图像完全相同、是否真有透明通道或是否适合作正式导出，不能直接将文件名当作最终 manifest。

此前 `new-ui-*.csv`、`figma-library-audit-*.json`、`figma-library-change-manifest-*.json` 是整理过程记录，可能早于用户手动修改；不要以它们覆盖本次当前读取快照。

### 8.4 建议的代码资产目录

```text
assets/
  backgrounds/{storyIsland,myTown,storyFlow,...}
  scenes/{park,riverside,homeInterior,school}/
  character/tuantuan/{idle,talking,wink,directing,...}/
  map/{island,chapter}/
  ui/{woodenTitle,chapterPanel,storybook,button,...}/
  icons/{star,starDisabled,droplet,diamond,...}.svg
  stickers/
  movie/{stage,boy,cat,redKite}/
  fonts/
  audio/                           # 取得真实资源后再加入
```

以上为建议路径，实际文件名根据导出结果填写。代码采用语义名；不要将 `exec-...` 生成文件名传播到业务对象中。

字体文件当前未导出。不要因为系统里装有字体就假定浏览器可用；需取得允许用于演示/网页的字体文件并正确加载。未提供字体授权文件，本次也没有核验字体授权范围。

## 9. 前端演示开发交接

### 9.1 预期交付

- 可以运行的横屏中文演示，入口、完整主线和主要旁支可点通。
- 页面忠于当前稿，不沿用旧版，也不为“代码好写”换一套视觉。
- 复用组件、token、角色、资源和故事状态。
- 录音、生成、评分、电影可先用可替换的确定性 mock，功能状态与画面相符。
- 资源数、贴纸收藏、故事正文、场景与作品在回退和切换页后仍一致。
- 清楚记录运行命令、演示方式、mock范围和未接入的真实能力。
- 本地持久化是演示建议；存储模型/version/reset 可由实现定义，不推断有现成云端用户账号。

### 9.2 建议实现顺序

1. 阅读本文与当前 Figma，先做资产 manifest 和字体加载。
2. 建立 token 与基础组件：icon、按钮、资源条、文字、木牌、书页。
3. 建立 screen shell、主线状态与种子数据。
4. 完成场景选择 → 拼贴 → 讲述 → 修改 → 拍摄 → 结果；再接图鉴、生成、播放器和钱包。
5. 加入当前已有动效和角色状态切换，再补实现所需的过程态。
6. 对照当前设计检查最终前端：不是回头修改 Figma，也不是重跑上轮设计验收。

### 9.3 待明确但不应阻塞本地演示的事项

| 项目 | 当前证据 | 演示处理建议 |
|---|---|---|
| 最终故事评分/通关阈值 | 有要素、星星、三项目标，但没有统一可执行评分配置 | 单独放 demoCriteria/passConfig，不宣称正式算法 |
| 满星与继续集星 | 历史明确允许非满星通过及返回补充；当前完成页没有独立双按钮 | 保留返回流程和状态；不擅自新增 UI |
| 生成/修改/拍摄成本 | 页面实例显示颜料1、宝石1；完整扣费规则未定 | costs配置和事务去重，失败逻辑明确标注mock |
| 日领+5/家长入口/兑换 | 钱包文案存在，接口/规则未定 | 本地演示或占位反馈，不连真实付费 |
| 真实 ASR/生成/评测 | 未提供服务和密钥 | mock adapter，错误/权限反馈有回退 |
| 电影输出与分享 | 有分幕、预览、保存入口，未提供渲染服务 | 本地可播放场景/样例媒体，保存作品条目；不假称已生成视频文件 |
| 团团透明动画 | 有静态状态图和固定镜头要求，无已核实动画包 | 静态fallback；取得动画后按同一assetId接入 |
| 长文本/贴纸操作细节 | 有滚动和状态，完整编辑手势未覆盖 | 最小可用操作，与现有布局一致，扩展点文档化 |
| 字体、音效和BGM | 字体名称已读，未导出字体/音频文件 | 真实取得后接入；不使用失效临时链接 |
| 移动竖屏 | 用户只要求横屏平板和电脑 | 本轮不新增竖屏设计 |

### 9.4 给接手 AI 的直接指令

> 先阅读本文件，使用 Figma fileKey `l7Z5Nfkjt2wUKhatOdZvK0` 中 `ui/art → ui/newVersion` 的当前19个画面作为唯一新版视觉来源。不要读取旧版来补一套不同UI，不要修改Figma。按现有组件、变量和页面实例覆盖实现可交互前端演示，保留中文字体、木质UI、展开书本、侦探团团和横屏布局。先确认当前仓库配置，再实现基础组件和共享状态，打通“快乐的一天”完整主线及贴纸生成/图鉴/钱包/电影播放旁支。对未提供服务的语音、生成、评分和电影能力使用可替换mock，不伪称真实AI服务已接通。当前原型的时间跳转和按压视觉状态不等于业务规则；完整节点、变量、组件、动效、资产及连线见下方附录。

---

# 附录：当前设计读取快照

下列内容由本轮只读数据生成。所有 node ID 均属于本 Figma 文件。属性未出现表示此次未在该字段中提取到，不应自动推断为0。尺寸单位为设计坐标，数值为读取时快照。

## A. 19 个当前页面 ID

| 名称 / Figma入口 | node ID | 画板 | 根布局 |
| --- | --- | --- | --- |
| [screen/home/title](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-4451) | 2020:4451 | 1920 × 1080 | NONE |
| [screen/map/storyIsland](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2033-6691) | 2033:6691 | 1920 × 1080 | NONE |
| [screen/map/myTown/overview](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2040-9114) | 2040:9114 | 1920 × 1080 | NONE |
| [screen/map/myTown/levelSelected](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2335-11984) | 2335:11984 | 1920 × 1080 | NONE |
| [screen/story/happyDay/sceneSelection](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2064-6613) | 2064:6613 | 1920 × 1080 | NONE |
| [screen/story/happyDay/composition](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2330-10588) | 2330:10588 | 1920 × 1080 | VERTICAL |
| [screen/story/happyDay/stickerGeneration](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-14485) | 2413:14485 | 1920 × 1080 | VERTICAL |
| [screen/story/happyDay/narration/idle](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2348-8165) | 2348:8165 | 1920 × 1080 | VERTICAL |
| [screen/story/happyDay/narration/complete](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-11101) | 2351:11101 | 1920 × 1080 | VERTICAL |
| [screen/story/happyDay/storyEdit](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2382-11040) | 2382:11040 | 1920 × 1080 | VERTICAL |
| [screen/movie/happyDay/filming](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-27265) | 2413:27265 | 1920 × 1080 | VERTICAL |
| [screen/level/happyDay/results](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-13198) | 2540:13198 | 1920 × 1080 | VERTICAL |
| [screen/collection/stickersAndMovies](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-14893) | 2540:14893 | 1920 × 1080 | VERTICAL |
| [screen/collection/moviePlayer](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-21912) | 2540:21912 | 1920 × 1080 | VERTICAL |
| [screen/collection/stickerGeneration](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-21479) | 2540:21479 | 1920 × 1080 | VERTICAL |
| [screen/movie/happyDay/voiceoverPrompt](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2532-12848) | 2532:12848 | 1920 × 1080 | VERTICAL |
| [screen/movie/happyDay/preview](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-28397) | 2413:28397 | 1920 × 1080 | VERTICAL |
| [screen/story/happyDay/narration/listening](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-9892) | 2351:9892 | 1920 × 1080 | VERTICAL |
| [screen/story/happyDay/narration/storyExpanded](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-10400) | 2351:10400 | 1920 × 1080 | VERTICAL |

## B. 变量全表（108 个可列举项 + 1 个额外实际引用）

集合：

| 集合 | ID | mode |
| --- | --- | --- |
| color | VariableCollectionId:2001:4372 | default (2001:0) |
| dimension | VariableCollectionId:2001:4373 | default (2001:1) |

颜色为0–255显示值；非颜色为原数值或字符串。alias保留语义链，resolved列用于代码取值。无主题多模式推断。

| 变量路径 | ID | 类型 | raw / alias | resolved | scopes |
| --- | --- | --- | --- | --- | --- |
| primitive/brand/orange/2 | VariableID:2001:4387 | COLOR | 2001:0: {"r":0.9921568632125854,"g":0.8274509906768799,"b":0.1725490242242813,"a":1} | #FDD32C |  |
| primitive/brand/orange/3 | VariableID:2001:4390 | COLOR | 2001:0: {"r":0.9921568632125854,"g":0.6627451181411743,"b":0.1725490242242813,"a":1} | #FDA92C |  |
| primitive/brand/orange/4 | VariableID:2001:4393 | COLOR | 2001:0: {"r":0.9921568632125854,"g":0.49803921580314636,"b":0.1725490242242813,"a":1} | #FD7F2C |  |
| primitive/brand/orange/5 | VariableID:2001:4396 | COLOR | 2001:0: {"r":0.9921568632125854,"g":0.3333333432674408,"b":0.1725490242242813,"a":1} | #FD552C |  |
| typography/lineHeight/px108 | VariableID:2009:4475 | FLOAT | 2001:1: 108 | 108 | LINE_HEIGHT |
| spacing/xxl | VariableID:2009:4477 | FLOAT | 2001:1: 72 | 72 | GAP |
| spacing/base | VariableID:2009:4478 | FLOAT | 2001:1: 36 | 36 | GAP |
| primitive/brand/blue/5 | VariableID:2019:4409 | COLOR | 2001:0: {"r":0.250980406999588,"g":0.4274509847164154,"b":0.9843137264251709,"a":1} | #406DFB |  |
| primitive/brand/blue/3 | VariableID:2019:4410 | COLOR | 2001:0: {"r":0.250980406999588,"g":0.7215686440467834,"b":0.9843137264251709,"a":1} | #40B8FB |  |
| primitive/brand/blue/4 | VariableID:2019:4411 | COLOR | 2001:0: {"r":0.250980406999588,"g":0.5764706134796143,"b":0.9843137264251709,"a":1} | #4093FB |  |
| typography/fontSize/px72 | VariableID:2020:4426 | FLOAT | 2001:1: 72 | 72 | FONT_SIZE |
| primitive/neutral/white/1 | VariableID:2020:4428 | COLOR | 2001:0: {"r":1,"g":1,"b":1,"a":1} | #FFFFFF |  |
| primitive/neutral/black/1 | VariableID:2020:4432 | COLOR | 2001:0: {"r":0.03921568766236305,"g":0.0784313753247261,"b":0.21960784494876862,"a":1} | #0A1438 |  |
| semantic/background/orange/2 | VariableID:2020:4433 | COLOR | 2001:0: → primitive/brand/orange/2 | #FDD32C | FRAME_FILL, SHAPE_FILL |
| semantic/background/neutral/white/1 | VariableID:2020:4438 | COLOR | 2001:0: → primitive/neutral/white/1 | #FFFFFF | FRAME_FILL, SHAPE_FILL |
| semantic/text/white | VariableID:2020:4444 | COLOR | 2001:0: → primitive/neutral/white/1 | #FFFFFF | TEXT_FILL |
| size/xxl | VariableID:2020:4446 | FLOAT | 2001:1: 96 | 96 | WIDTH_HEIGHT |
| radius/full | VariableID:2020:4453 | FLOAT | 2001:1: 9999 | 9999 | CORNER_RADIUS |
| semantic/background/orange/3 | VariableID:2020:4472 | COLOR | 2001:0: → primitive/brand/orange/3 | #FDA92C | FRAME_FILL, SHAPE_FILL |
| semantic/background/orange/4 | VariableID:2020:4584 | COLOR | 2001:0: → primitive/brand/orange/4 | #FD7F2C | FRAME_FILL, SHAPE_FILL |
| semantic/background/orange/5 | VariableID:2020:4585 | COLOR | 2001:0: → primitive/brand/orange/5 | #FD552C | FRAME_FILL, SHAPE_FILL |
| strokeWidth/base | VariableID:2020:4588 | FLOAT | 2001:1: 12 | 12 | STROKE_FLOAT |
| semantic/background/blue/3 | VariableID:2020:4591 | COLOR | 2001:0: → primitive/brand/blue/3 | #40B8FB | FRAME_FILL, SHAPE_FILL |
| semantic/background/neutral/white/2 | VariableID:2020:4607 | COLOR | 2001:0: → primitive/neutral/white/2 | #FFFBF0 | FRAME_FILL, SHAPE_FILL |
| semantic/background/neutral/white/3 | VariableID:2020:4610 | COLOR | 2001:0: → primitive/neutral/white/3 | #FFF2CF | FRAME_FILL, SHAPE_FILL |
| semantic/background/neutral/white/4 | VariableID:2020:4613 | COLOR | 2001:0: → primitive/neutral/white/4 | #FFE4A6 | FRAME_FILL, SHAPE_FILL |
| semantic/background/neutral/black/3 | VariableID:2020:4619 | COLOR | 2001:0: → primitive/neutral/black/3 | #B3BED0 | FRAME_FILL, SHAPE_FILL |
| semantic/background/neutral/black/4 | VariableID:2020:4620 | COLOR | 2001:0: → primitive/neutral/black/4 | #DCE3ED | FRAME_FILL, SHAPE_FILL |
| semantic/background/neutral/black/5 | VariableID:2020:4621 | COLOR | 2001:0: → primitive/neutral/black/5 | #EFF0F0 | FRAME_FILL, SHAPE_FILL |
| primitive/brand/purple/1 | VariableID:2020:8749 | COLOR | 2001:0: {"r":0.95686274766922,"g":0.3607843220233917,"b":1,"a":1} | #F45CFF |  |
| primitive/brand/purple/3 | VariableID:2020:8751 | COLOR | 2001:0: {"r":0.7019608020782471,"g":0.3607843220233917,"b":1,"a":1} | #B35CFF |  |
| size/xl | VariableID:2020:8764 | FLOAT | 2001:1: 72 | 72 | WIDTH_HEIGHT |
| effect/shadow/dark10 | VariableID:2020:8766 | COLOR | 2001:0: {"r":0.03921568766236305,"g":0.0784313753247261,"b":0.21960784494876862,"a":0.10000000149011612} | rgba(10, 20, 56, 0.1) | EFFECT_COLOR |
| semantic/icon/orange/2 | VariableID:2020:8809 | COLOR | 2001:0: → primitive/brand/orange/2 | #FDD32C | SHAPE_FILL |
| semantic/icon/orange/3 | VariableID:2020:8810 | COLOR | 2001:0: → primitive/brand/orange/3 | #FDA92C | SHAPE_FILL |
| semantic/icon/neutral/white/1 | VariableID:2020:8814 | COLOR | 2001:0: → primitive/neutral/white/1 | #FFFFFF | SHAPE_FILL |
| semantic/icon/neutral/white/2 | VariableID:2020:8815 | COLOR | 2001:0: → primitive/neutral/white/2 | #FFFBF0 | SHAPE_FILL |
| semantic/icon/neutral/white/3 | VariableID:2020:8816 | COLOR | 2001:0: → primitive/neutral/white/3 | #FFF2CF | SHAPE_FILL |
| semantic/icon/neutral/white/4 | VariableID:2020:8817 | COLOR | 2001:0: → primitive/neutral/white/4 | #FFE4A6 | SHAPE_FILL |
| semantic/icon/neutral/white/5 | VariableID:2020:8818 | COLOR | 2001:0: → primitive/neutral/white/5 | #FFD47D | SHAPE_FILL |
| semantic/icon/blue/3 | VariableID:2020:8820 | COLOR | 2001:0: → primitive/brand/blue/3 | #40B8FB | SHAPE_FILL |
| semantic/icon/blue/4 | VariableID:2020:8821 | COLOR | 2001:0: → primitive/brand/blue/4 | #4093FB | SHAPE_FILL |
| semantic/icon/blue/5 | VariableID:2020:8822 | COLOR | 2001:0: → primitive/brand/blue/5 | #406DFB | SHAPE_FILL |
| semantic/icon/neutral/black/3 | VariableID:2020:8825 | COLOR | 2001:0: → primitive/neutral/black/3 | #B3BED0 | SHAPE_FILL |
| semantic/icon/neutral/black/4 | VariableID:2020:8826 | COLOR | 2001:0: → primitive/neutral/black/4 | #DCE3ED | SHAPE_FILL |
| semantic/icon/neutral/black/5 | VariableID:2020:8827 | COLOR | 2001:0: → primitive/neutral/black/5 | #EFF0F0 | SHAPE_FILL |
| semantic/stroke/orange/2 | VariableID:2020:9066 | COLOR | 2001:0: → primitive/brand/orange/2 | #FDD32C | STROKE_COLOR |
| semantic/stroke/orange/3 | VariableID:2020:9067 | COLOR | 2001:0: → primitive/brand/orange/3 | #FDA92C | STROKE_COLOR |
| semantic/stroke/orange/4 | VariableID:2020:9068 | COLOR | 2001:0: → primitive/brand/orange/4 | #FD7F2C | STROKE_COLOR |
| semantic/stroke/neutral/white/1 | VariableID:2020:9071 | COLOR | 2001:0: → primitive/neutral/white/1 | #FFFFFF | STROKE_COLOR |
| semantic/stroke/neutral/white/2 | VariableID:2020:9072 | COLOR | 2001:0: → primitive/neutral/white/2 | #FFFBF0 | STROKE_COLOR |
| semantic/stroke/neutral/white/3 | VariableID:2020:9073 | COLOR | 2001:0: → primitive/neutral/white/3 | #FFF2CF | STROKE_COLOR |
| semantic/stroke/neutral/white/4 | VariableID:2020:9074 | COLOR | 2001:0: → primitive/neutral/white/4 | #FFE4A6 | STROKE_COLOR |
| semantic/stroke/neutral/white/5 | VariableID:2020:9075 | COLOR | 2001:0: → semantic/icon/neutral/white/5 | #FFD47D | STROKE_COLOR |
| semantic/stroke/blue/3 | VariableID:2020:9077 | COLOR | 2001:0: → primitive/brand/blue/3 | #40B8FB | STROKE_COLOR |
| semantic/stroke/blue/4 | VariableID:2020:9078 | COLOR | 2001:0: → primitive/brand/blue/4 | #4093FB | STROKE_COLOR |
| semantic/stroke/neutral/black/3 | VariableID:2020:9082 | COLOR | 2001:0: → primitive/neutral/black/3 | #B3BED0 | STROKE_COLOR |
| semantic/stroke/neutral/black/4 | VariableID:2020:9083 | COLOR | 2001:0: → primitive/neutral/black/4 | #DCE3ED | STROKE_COLOR |
| semantic/stroke/neutral/black/5 | VariableID:2020:9084 | COLOR | 2001:0: → primitive/neutral/black/5 | #EFF0F0 | STROKE_COLOR |
| strokeWidth/icon64 | VariableID:2020:9087 | FLOAT | 2001:1: 6 | 6 | STROKE_FLOAT |
| semantic/stroke/purple/1 | VariableID:2020:9131 | COLOR | 2001:0: → primitive/brand/purple/1 | #F45CFF | STROKE_COLOR |
| semantic/stroke/purple/3 | VariableID:2020:9133 | COLOR | 2001:0: → primitive/brand/purple/3 | #B35CFF | STROKE_COLOR |
| spacing/s | VariableID:2020:9194 | FLOAT | 2001:1: 24 | 24 | GAP |
| spacing/xs | VariableID:2020:9198 | FLOAT | 2001:1: 20 | 20 | GAP |
| spacing/xxs | VariableID:2020:9201 | FLOAT | 2001:1: 12 | 12 | GAP |
| spacing/xxxs | VariableID:2020:9204 | FLOAT | 2001:1: 6 | 6 | GAP |
| size/base | VariableID:2020:9212 | FLOAT | 2001:1: 56 | 56 | WIDTH_HEIGHT |
| size/xs | VariableID:2020:9213 | FLOAT | 2001:1: 48 | 48 | WIDTH_HEIGHT |
| typography/fontSize/px40 | VariableID:2020:9687 | FLOAT | 2001:1: 40 | 40 | FONT_SIZE |
| size/xxxl | VariableID:2020:9972 | FLOAT | 2001:1: 168 | 168 | WIDTH_HEIGHT |
| spacing/xl | VariableID:2020:9974 | FLOAT | 2001:1: 64 | 64 | GAP |
| spacing/l | VariableID:2020:9975 | FLOAT | 2001:1: 48 | 48 | GAP |
| typography/lineHeight/px42 | VariableID:2020:9976 | FLOAT | 2001:1: 42 | 42 | LINE_HEIGHT |
| typography/fontSize/px36 | VariableID:2020:9977 | FLOAT | 2001:1: 36 | 36 | FONT_SIZE |
| typography/fontWeight/bold | VariableID:2020:9978 | FLOAT | 2001:1: 700 | 700 | FONT_WEIGHT |
| typography/fontFamily/basic | VariableID:2020:9981 | STRING | 2001:1: LXGW 975 Yuan SC | LXGW 975 Yuan SC | FONT_FAMILY |
| typography/fontFamily/special | VariableID:2020:9982 | STRING | 2001:1: KeinannMaruPOP | KeinannMaruPOP | FONT_FAMILY |
| typography/lineHeight/px48 | VariableID:2020:10005 | FLOAT | 2001:1: 48 | 48 | LINE_HEIGHT |
| semantic/text/dark | VariableID:2020:10007 | COLOR | 2001:0: → primitive/neutral/black/1 | #0A1438 | TEXT_FILL |
| primitive/neutral/white/2 | VariableID:2020:10154 | COLOR | 2001:0: {"r":1,"g":0.9843137264251709,"b":0.9411764740943909,"a":1} | #FFFBF0 |  |
| primitive/neutral/white/3 | VariableID:2020:10156 | COLOR | 2001:0: {"r":1,"g":0.9490196108818054,"b":0.8117647171020508,"a":1} | #FFF2CF |  |
| primitive/neutral/white/4 | VariableID:2020:10157 | COLOR | 2001:0: {"r":1,"g":0.8941176533699036,"b":0.6509804129600525,"a":1} | #FFE4A6 |  |
| primitive/neutral/white/5 | VariableID:2020:10158 | COLOR | 2001:0: {"r":1,"g":0.8313725590705872,"b":0.4901960790157318,"a":1} | #FFD47D |  |
| effect/shadow/cream80 | VariableID:2033:4711 | COLOR | 2001:0: {"r":1,"g":0.9490196108818054,"b":0.8117647171020508,"a":0.800000011920929} | rgba(255, 242, 207, 0.8) | EFFECT_COLOR |
| effect/shadow/blueLight80 | VariableID:2033:4713 | COLOR | 2001:0: {"r":0.7195510864257812,"g":0.897168755531311,"b":1,"a":0.800000011920929} | rgba(183, 229, 255, 0.8) | EFFECT_COLOR |
| effect/shadow/blueDark40 | VariableID:2033:4714 | COLOR | 2001:0: {"r":0.250980406999588,"g":0.4274509847164154,"b":0.9843137264251709,"a":0.4000000059604645} | rgba(64, 109, 251, 0.4) | EFFECT_COLOR |
| primitive/neutral/black/3 | VariableID:2040:8326 | COLOR | 2001:0: {"r":0.7032069563865662,"g":0.7470493316650391,"b":0.8141024708747864,"a":1} | #B3BED0 |  |
| primitive/neutral/black/4 | VariableID:2040:8327 | COLOR | 2001:0: {"r":0.8609698414802551,"g":0.8913856744766235,"b":0.9278846383094788,"a":1} | #DCE3ED |  |
| primitive/neutral/black/5 | VariableID:2040:8328 | COLOR | 2001:0: {"r":0.9377773404121399,"g":0.9403445720672607,"b":0.942307710647583,"a":1} | #EFF0F0 |  |
| semantic/status/success | VariableID:2044:10502 | COLOR | 2001:0: {"r":0.13333334028720856,"g":0.8078431487083435,"b":0.05882352963089943,"a":1} | #22CE0F | FRAME_FILL, SHAPE_FILL |
| radius/lg | VariableID:2154:7791 | FLOAT | 2001:1: 72 | 72 | CORNER_RADIUS |
| radius/md | VariableID:2154:7793 | FLOAT | 2001:1: 56 | 56 | CORNER_RADIUS |
| radius/sm | VariableID:2163:8104 | FLOAT | 2001:1: 36 | 36 | CORNER_RADIUS |
| radius/xs | VariableID:2163:8105 | FLOAT | 2001:1: 16 | 16 | CORNER_RADIUS |
| semantic/text/muted | VariableID:2311:6681 | COLOR | 2001:0: → semantic/stroke/blue/4 | #4093FB | TEXT_FILL |
| typography/fontSize/px48 | VariableID:2322:11320 | FLOAT | 2001:1: 48 | 48 | FONT_SIZE |
| semantic/overlay/white40 | VariableID:2340:12183 | COLOR | 2001:0: {"r":1,"g":1,"b":1,"a":0.4000000059604645} | rgba(255, 255, 255, 0.4) | FRAME_FILL, SHAPE_FILL |
| semantic/overlay/black40 | VariableID:2344:13628 | COLOR | 2001:0: {"r":0,"g":0,"b":0,"a":0.4000000059604645} | rgba(0, 0, 0, 0.4) | FRAME_FILL, SHAPE_FILL |
| semantic/background/warmTint12 | VariableID:2348:8697 | COLOR | 2001:0: {"r":0.6394230723381042,"g":0.5947452783584595,"b":0.41603463888168335,"a":0.11999999731779099} | rgba(163, 152, 106, 0.12) | FRAME_FILL, SHAPE_FILL |
| size/xxs | VariableID:2353:16901 | FLOAT | 2001:1: 24 | 24 | WIDTH_HEIGHT |
| semantic/text/disabled | VariableID:2366:17489 | COLOR | 2001:0: → primitive/neutral/black/3 | #B3BED0 | TEXT_FILL |
| typography/fontSize/px24 | VariableID:2366:19888 | FLOAT | 2001:1: 24 | 24 | FONT_SIZE |
| typography/lineHeight/px28 | VariableID:2366:19889 | FLOAT | 2001:1: 28 | 28 | LINE_HEIGHT |
| typography/lineHeight/px56 | VariableID:2399:13538 | FLOAT | 2001:1: 56 | 56 | LINE_HEIGHT |
| size/px240 | VariableID:2412:12141 | FLOAT | 2001:1: 240 | 240 | WIDTH_HEIGHT |
| strokeWidth/lg | VariableID:2413:12485 | FLOAT | 2001:1: 24 | 24 | STROKE_FLOAT |
| size/px196 | VariableID:2413:12487 | FLOAT | 2001:1: 196 | 196 | WIDTH_HEIGHT |
| radius/xxs | VariableID:2413:13302 | FLOAT | 2001:1: 6 | 6 | CORNER_RADIUS |
| numeric/px2 | VariableID:2020:10159 | FLOAT | 2001:1: 2 | 2 | STROKE_FLOAT, EFFECT_FLOAT |

## C. 样式

### C1. Text Styles

| 名称 | 字体/字型 | 字号 | 行高 | 字距 | style ID |
| --- | --- | --- | --- | --- | --- |
| typography/display/px72 | KeinannMaruPOP / Black | 72 | 108 PIXELS | {"unit":"PERCENT","value":0} | S:8af28d3b5ebd1a177b2f7a468c5c311b68694c98, |
| typography/body/px40 | LXGW 975 Yuan SC / 700W | 40 | 48 PIXELS | {"unit":"PERCENT","value":0} | S:88116bea6363e8daaac511d7833ea9713dfe027c, |
| typography/body/px36 | LXGW 975 Yuan SC / 700W | 36 | 42 PIXELS | {"unit":"PERCENT","value":0} | S:687f6799461aef415b29581c3429236dc5227558, |
| typography/body/px24 | LXGW 975 Yuan SC / 700W | 24 | 28 PIXELS | {"unit":"PERCENT","value":0} | S:66bdc6d140c7c1e221f204550af2d12914aceac6, |
| typography/display/px36 | KeinannMaruPOP / Black | 36 | 42 PIXELS | {"unit":"PERCENT","value":0} | S:01ce3e190f2fcee435502ecf0e96d9fb83c898eb, |

### C2. Paint 与 Effect Styles

以下保留渐变stop、偏移、blur等实际参数；boundVariables仍需按变量表解析。

#### paint/background/default

- ID：`S:03d89397de6af4a06058cc18507ec6f6d0507f35,`

```json
[
  {
    "type": "GRADIENT_LINEAR",
    "visible": true,
    "opacity": 1,
    "blendMode": "NORMAL",
    "gradientStops": [
      {
        "color": {
          "r": 1,
          "g": 0.8392156958580017,
          "b": 0.125490203499794,
          "a": 1
        },
        "position": 0,
        "boundVariables": {}
      },
      {
        "color": {
          "r": 0.9960784316062927,
          "g": 0.6509804129600525,
          "b": 0.11764705926179886,
          "a": 1
        },
        "position": 1,
        "boundVariables": {}
      }
    ],
    "gradientTransform": [
      [
        0,
        1,
        0
      ],
      [
        -11.53066635131836,
        0,
        6.2653326988220215
      ]
    ]
  }
]
```

#### paint/gradient/blue

- ID：`S:98429ce7ac8ba5f2e507f5dddac2538e257aacb8,`

```json
[
  {
    "type": "GRADIENT_LINEAR",
    "visible": true,
    "opacity": 1,
    "blendMode": "NORMAL",
    "gradientStops": [
      {
        "color": {
          "r": 0.250980406999588,
          "g": 0.7215686440467834,
          "b": 0.9843137264251709,
          "a": 1
        },
        "position": 0,
        "boundVariables": {
          "color": {
            "type": "VARIABLE_ALIAS",
            "id": "VariableID:2019:4410"
          }
        }
      },
      {
        "color": {
          "r": 0.250980406999588,
          "g": 0.5764706134796143,
          "b": 0.9843137264251709,
          "a": 1
        },
        "position": 1,
        "boundVariables": {
          "color": {
            "type": "VARIABLE_ALIAS",
            "id": "VariableID:2019:4411"
          }
        }
      }
    ],
    "gradientTransform": [
      [
        0.4142652451992035,
        0.7799719572067261,
        -0.09711860120296478
      ],
      [
        -0.7799719572067261,
        0.4142652451992035,
        0.6828533411026001
      ]
    ]
  }
]
```

#### effect/shadow/shapeOrange

- ID：`S:32106192f3411f898125707290e7e4e5f97b656d,`

```json
[
  {
    "type": "DROP_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {},
    "color": {
      "r": 1,
      "g": 0.5291479825973511,
      "b": 0,
      "a": 1
    },
    "offset": {
      "x": -2,
      "y": 4
    },
    "spread": 0,
    "blendMode": "NORMAL",
    "showShadowBehindNode": true
  },
  {
    "type": "INNER_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {
      "color": {
        "type": "VARIABLE_ALIAS",
        "id": "VariableID:2033:4711"
      }
    },
    "color": {
      "r": 1,
      "g": 0.9490196108818054,
      "b": 0.8117647171020508,
      "a": 0.800000011920929
    },
    "offset": {
      "x": 0,
      "y": -2
    },
    "spread": 0,
    "blendMode": "NORMAL"
  }
]
```

#### effect/shadow/shapeBlue

- ID：`S:b32d44afbccb818a6ea24d7d6cdac88fcda60027,`

```json
[
  {
    "type": "DROP_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {
      "color": {
        "type": "VARIABLE_ALIAS",
        "id": "VariableID:2033:4714"
      }
    },
    "color": {
      "r": 0.250980406999588,
      "g": 0.4274509847164154,
      "b": 0.9843137264251709,
      "a": 0.4000000059604645
    },
    "offset": {
      "x": -2,
      "y": 4
    },
    "spread": 0,
    "blendMode": "NORMAL",
    "showShadowBehindNode": true
  },
  {
    "type": "INNER_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {
      "color": {
        "type": "VARIABLE_ALIAS",
        "id": "VariableID:2033:4713"
      }
    },
    "color": {
      "r": 0.7195510864257812,
      "g": 0.897168755531311,
      "b": 1,
      "a": 0.800000011920929
    },
    "offset": {
      "x": 0,
      "y": -2
    },
    "spread": 0,
    "blendMode": "NORMAL"
  }
]
```

#### effect/shadow/floating

- ID：`S:0e2b7dd4b508a9d6aa083b162e9d3c06780b9aa0,`

```json
[
  {
    "type": "DROP_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {
      "color": {
        "type": "VARIABLE_ALIAS",
        "id": "VariableID:2020:8766"
      }
    },
    "color": {
      "r": 0.03921568766236305,
      "g": 0.0784313753247261,
      "b": 0.21960784494876862,
      "a": 0.10000000149011612
    },
    "offset": {
      "x": 0,
      "y": 4
    },
    "spread": 0,
    "blendMode": "NORMAL",
    "showShadowBehindNode": false
  }
]
```

#### effect/shadow/storybook

- ID：`S:cd9b877818e2885d7f0ba2546b8df6502f6a61d2,`

```json
[
  {
    "type": "DROP_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {
      "color": {
        "type": "VARIABLE_ALIAS",
        "id": "VariableID:2001:4390"
      }
    },
    "color": {
      "r": 0.9921568632125854,
      "g": 0.6627451181411743,
      "b": 0.1725490242242813,
      "a": 1
    },
    "offset": {
      "x": -10,
      "y": 10
    },
    "spread": 0,
    "blendMode": "NORMAL",
    "showShadowBehindNode": false
  },
  {
    "type": "DROP_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {
      "color": {
        "type": "VARIABLE_ALIAS",
        "id": "VariableID:2020:8766"
      }
    },
    "color": {
      "r": 0.03921568766236305,
      "g": 0.0784313753247261,
      "b": 0.21960784494876862,
      "a": 0.10000000149011612
    },
    "offset": {
      "x": -4,
      "y": 4
    },
    "spread": 0,
    "blendMode": "NORMAL",
    "showShadowBehindNode": false
  },
  {
    "type": "DROP_SHADOW",
    "visible": true,
    "radius": 0,
    "boundVariables": {
      "color": {
        "type": "VARIABLE_ALIAS",
        "id": "VariableID:2020:8766"
      }
    },
    "color": {
      "r": 0.03921568766236305,
      "g": 0.0784313753247261,
      "b": 0.21960784494876862,
      "a": 0.10000000149011612
    },
    "offset": {
      "x": 0,
      "y": 4
    },
    "spread": 0,
    "blendMode": "NORMAL",
    "showShadowBehindNode": false
  }
]
```

## D. 当前77个组件家族

这里的引用集合包含嵌套的传递引用，不等于每项都是该组件的直接子节点。Component Set 的外框尺寸只用于陈列，不用作运行时尺寸。

| 家族 / Figma入口 | ID | 类型 | 变体数量 | 属性键 | 嵌套引用集合 |
| --- | --- | --- | --- | --- | --- |
| [scene/locationSelectionCard](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2330-8476) | 2330:8476 | COMPONENT_SET | 2 | state: VARIANT | control/storyButton, artwork/button/storyBackground, control/iconSlot, icon/play |
| [surface/woodenTitle](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2389-16087) | 2389:16087 | COMPONENT_SET | 2 | size: VARIANT |  |
| [media/filmingProgress](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2405-12823) | 2405:12823 | COMPONENT | 0 | label#2405:0: TEXT |  |
| [media/filmingReadyBadge](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2405-12850) | 2405:12850 | COMPONENT | 0 | label#2405:1: TEXT | control/iconSlot, icon/check |
| [media/movieCard](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-21332) | 2540:21332 | COMPONENT | 0 |  |  |
| [media/sceneTimelineItem](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-13147) | 2540:13147 | COMPONENT_SET | 2 | state: VARIANT |  |
| [character/tuantuan/animation](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2379-12490) | 2379:12490 | COMPONENT_SET | 9 | state: VARIANT |  |
| [character/tuantuan/avatar](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2040-9046) | 2040:9046 | COMPONENT | 0 |  | character/tuantuan/animation |
| [character/tuantuan/dialogue](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2040-8629) | 2040:8629 | COMPONENT | 0 |  | control/iconSlot, icon/dialogueNext, character/tuantuan/avatar, character/tuantuan/animation |
| [character/tuantuan/scene](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2389-21711) | 2389:21711 | COMPONENT | 0 | label#2389:14: TEXT | character/tuantuan/animation, control/iconSlot, icon/dialogueNext |
| [progress/storyStepIndicator](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2239-6862) | 2239:6862 | COMPONENT_SET | 4 | tone: VARIANT | control/iconSlot, icon/treasureChest |
| [progress/storyStepProgress](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2330-11024) | 2330:11024 | COMPONENT_SET | 5 | step: VARIANT | progress/storyStepIndicator, control/iconSlot, icon/treasureChest |
| [map/bossLabel](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2045-11534) | 2045:11534 | COMPONENT_SET | 2 | variant: VARIANT |  |
| [map/chapterActionPanel](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2179-8785) | 2179:8785 | COMPONENT | 0 |  | reward/levelDrop, reward/stickerDrop, control/iconSlot, icon/droplet, sticker/rainbow, icon/treasureChest, control/storyButton, artwork/button/storyBackground, icon/play, icon/starDisabled |
| [map/chapterBadgeBase](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2044-10984) | 2044:10984 | COMPONENT | 0 |  |  |
| [map/chapterNode](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2044-10875) | 2044:10875 | COMPONENT_SET | 7 | state: VARIANT; variant: VARIANT | feedback/starRating, control/iconSlot, icon/star, icon/starDisabled, artwork/map/chapter, feedback/completionBadge, icon/check, control/storyButton, icon/lock, map/chapterBadgeBase |
| [map/chapterProgressCounter](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2043-9575) | 2043:9575 | COMPONENT | 0 |  | control/iconSlot, icon/star |
| [map/islandMarker](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2039-8200) | 2039:8200 | COMPONENT | 0 |  | artwork/map/island, map/chapterProgressCounter, control/iconSlot, icon/star, map/bossLabel |
| [reward/levelDrop](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-10637) | 2340:10637 | COMPONENT | 0 |  | reward/stickerDrop, control/iconSlot, icon/droplet, sticker/rainbow, icon/treasureChest |
| [reward/stickerDrop](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2336-7920) | 2336:7920 | COMPONENT | 0 |  | control/iconSlot, icon/droplet, sticker/rainbow |
| [sticker/rainbow](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2336-7587) | 2336:7587 | COMPONENT | 0 |  |  |
| [sticker/stickerSlot](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-12212) | 2340:12212 | COMPONENT_SET | 3 | state: VARIANT | sticker/rainbow |
| [artwork/button/storyBackground](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2009-4456) | 2009:4456 | COMPONENT | 0 |  |  |
| [artwork/filming/boy](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2405-12838) | 2405:12838 | COMPONENT | 0 |  |  |
| [artwork/filming/cat](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2405-12842) | 2405:12842 | COMPONENT | 0 |  |  |
| [artwork/filming/redKite](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2405-12846) | 2405:12846 | COMPONENT | 0 |  |  |
| [artwork/map/chapter](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2045-11742) | 2045:11742 | COMPONENT_SET | 6 | chapter: VARIANT |  |
| [artwork/map/island](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2039-8214) | 2039:8214 | COMPONENT_SET | 18 | island: VARIANT; state: VARIANT | map/chapterProgressCounter, control/iconSlot, icon/star, map/bossLabel, control/storyButton |
| [navigation/sidebar](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-13102) | 2413:13102 | COMPONENT | 0 |  | sticker/stickerSlot, sticker/rainbow, control/storyButton, control/iconSlot, icon/sticker, resource/costBadge, icon/droplet, artwork/button/storyBackground, icon/check, navigation/storyBookmark, icon/people, icon/petPaw, icon/pineTree, icon/cube, icon/multipleStars |
| [navigation/storyBookmark](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2344-12478) | 2344:12478 | COMPONENT_SET | 2 | state: VARIANT | control/iconSlot, icon/people |
| [navigation/woodenTitle](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2389-16102) | 2389:16102 | COMPONENT_SET | 2 | size: VARIANT | surface/woodenTitle |
| [story/editableContent](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2389-20704) | 2389:20704 | COMPONENT_SET | 3 | state: VARIANT | control/storyButton, control/iconSlot, icon/voiceMessage, dialog/sentenceEditSuggestion |
| [story/elementRow](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2349-9280) | 2349:9280 | COMPONENT_SET | 2 | label#2349:1: TEXT; state: VARIANT | control/iconSlot, icon/people, icon/star |
| [story/openStorybook](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2389-21101) | 2389:21101 | COMPONENT_SET | 1 | mode: VARIANT | control/storyButton, artwork/button/storyBackground, control/iconSlot, icon/starBadge, story/storybookPage, navigation/woodenTitle, surface/woodenTitle, story/elementRow, icon/people, icon/star, icon/locationPin, icon/penTool, icon/multipleStars, icon/why, icon/timeLapse |
| [story/storybookPage](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2353-13279) | 2353:13279 | COMPONENT_SET | 3 | mode: VARIANT | navigation/woodenTitle, surface/woodenTitle, story/elementRow, control/iconSlot, icon/people, icon/star, icon/locationPin, icon/penTool, icon/multipleStars, icon/why, icon/timeLapse, story/editableContent, control/storyButton, icon/voiceMessage, artwork/button/storyBackground, icon/videoCamera, resource/costBadge, icon/diamond |
| [dialog/modalOverlay](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2344-13627) | 2344:13627 | COMPONENT | 0 |  | dialog/stickerGenerator, control/micButton, control/iconSlot, icon/voiceMessage, resource/costBadge, icon/droplet, control/storyButton, icon/close |
| [dialog/resourceWallet](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-15804) | 2540:15804 | COMPONENT | 0 |  | control/iconSlot, icon/droplet, control/storyButton, icon/diamond |
| [dialog/sentenceEditSuggestion](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2396-11915) | 2396:11915 | COMPONENT | 0 |  | control/storyButton, control/iconSlot, icon/voiceMessage |
| [dialog/stickerGenerator](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2379-11854) | 2379:11854 | COMPONENT_SET | 3 | state: VARIANT | control/micButton, control/iconSlot, icon/voiceMessage, resource/costBadge, icon/droplet, icon/musicEqualizer, control/storyButton, artwork/button/storyBackground, icon/check, icon/refresh, sticker/stickerSlot, sticker/rainbow |
| [dialog/voiceoverPrompt](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2542-29606) | 2542:29606 | COMPONENT | 0 |  | control/iconSlot, icon/voiceMessage, control/storyButton, icon/play |
| [dialogue/speechBubble](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-9338) | 2351:9338 | COMPONENT_SET | 3 | label#2351:0: TEXT; role: VARIANT |  |
| [resource/costBadge](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2382-14982) | 2382:14982 | COMPONENT | 0 |  | control/iconSlot, icon/star |
| [resource/statusBar](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-15538) | 2540:15538 | COMPONENT_SET | 2 | state: VARIANT | control/iconSlot, icon/droplet, icon/diamond, dialog/resourceWallet, control/storyButton |
| [icon/arrowLeft](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-8829) | 2020:8829 | COMPONENT | 0 |  |  |
| [icon/check](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2044-10497) | 2044:10497 | COMPONENT | 0 |  |  |
| [icon/close](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2344-13833) | 2344:13833 | COMPONENT | 0 |  |  |
| [icon/cube](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2344-12539) | 2344:12539 | COMPONENT | 0 |  |  |
| [icon/dialogueNext](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2040-8646) | 2040:8646 | COMPONENT | 0 |  |  |
| [icon/diamond](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-9121) | 2020:9121 | COMPONENT | 0 |  |  |
| [icon/download](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-28643) | 2540:28643 | COMPONENT | 0 |  |  |
| [icon/droplet](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-9086) | 2020:9086 | COMPONENT | 0 |  |  |
| [icon/locationPin](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2353-16167) | 2353:16167 | COMPONENT | 0 |  |  |
| [icon/lock](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2044-11223) | 2044:11223 | COMPONENT | 0 |  |  |
| [icon/multipleStars](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-12264) | 2340:12264 | COMPONENT | 0 |  |  |
| [icon/musicEqualizer](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2353-16171) | 2353:16171 | COMPONENT | 0 |  |  |
| [icon/penTool](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2353-16151) | 2353:16151 | COMPONENT | 0 |  |  |
| [icon/people](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-12272) | 2340:12272 | COMPONENT | 0 |  |  |
| [icon/petPaw](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-12276) | 2340:12276 | COMPONENT | 0 |  |  |
| [icon/pineTree](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-12292) | 2340:12292 | COMPONENT | 0 |  |  |
| [icon/play](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2009-4470) | 2009:4470 | COMPONENT | 0 |  |  |
| [icon/refresh](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-15531) | 2413:15531 | COMPONENT | 0 |  |  |
| [icon/rotateLeft](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-13194) | 2540:13194 | COMPONENT | 0 |  |  |
| [icon/star](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-9096) | 2020:9096 | COMPONENT | 0 |  |  |
| [icon/starBadge](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-12268) | 2340:12268 | COMPONENT | 0 |  |  |
| [icon/starDisabled](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2044-10587) | 2044:10587 | COMPONENT | 0 |  |  |
| [icon/sticker](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-9538) | 2020:9538 | COMPONENT | 0 |  |  |
| [icon/timeLapse](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2353-16163) | 2353:16163 | COMPONENT | 0 |  |  |
| [icon/treasureChest](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2330-7831) | 2330:7831 | COMPONENT | 0 |  |  |
| [icon/videoCamera](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2340-12300) | 2340:12300 | COMPONENT | 0 |  |  |
| [icon/voiceMessage](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-8744) | 2351:8744 | COMPONENT | 0 |  |  |
| [icon/why](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2353-16231) | 2353:16231 | COMPONENT | 0 |  |  |
| [control/iconSlot](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2019-4414) | 2019:4414 | COMPONENT_SET | 5 | icon#2020:1: INSTANCE_SWAP; size: VARIANT | icon/play |
| [control/micButton](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-8715) | 2351:8715 | COMPONENT_SET | 4 | state: VARIANT; size: VARIANT | control/iconSlot, icon/voiceMessage, icon/musicEqualizer |
| [control/storyButton](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-8830) | 2020:8830 | COMPONENT_SET | 12 | label#2020:0: TEXT; showIcon#2179:0: BOOLEAN; resourceSlot#2344:3: SLOT; showResource#2382:0: BOOLEAN; variant: VARIANT; state: VARIANT; size: VARIANT | control/iconSlot, icon/sticker, resource/costBadge, icon/star, artwork/button/storyBackground, icon/play, icon/arrowLeft |
| [feedback/completionBadge](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2044-11231) | 2044:11231 | COMPONENT_SET | 2 | state: VARIANT | control/iconSlot, icon/check, icon/lock |
| [feedback/instructionBanner](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-13283) | 2413:13283 | COMPONENT | 0 |  |  |
| [feedback/starRating](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2044-10444) | 2044:10444 | COMPONENT | 0 |  | control/iconSlot, icon/star, icon/starDisabled |

### D1. 变体与属性默认值

实际允许组合以逐条变体为准，不能对各轴直接做笛卡尔积生成并不存在的组合。实例可覆盖文字、插槽和尺寸，默认值只用于初始化。

#### scene/locationSelectionCard · 2330:8476

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "selected",
    "variantOptions": [
      "selected",
      "default"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=selected | 2160:7796 | 252 × 400 | VERTICAL | FIXED / FIXED |
| state=default | 2330:8477 | 252 × 400 | VERTICAL | FIXED / FIXED |

#### surface/woodenTitle · 2389:16087

属性定义：

```json
{
  "size": {
    "type": "VARIANT",
    "defaultValue": "compact",
    "variantOptions": [
      "compact",
      "wide"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| size=compact | 2336:7568 | 272.899 × 96 | NONE | FIXED / FIXED |
| size=wide | 2389:16088 | 466 × 96 | NONE | FIXED / FIXED |

#### media/filmingProgress · 2405:12823

属性定义：

```json
{
  "label#2405:0": {
    "type": "TEXT",
    "defaultValue": "打好灯光"
  }
}
```

#### media/filmingReadyBadge · 2405:12850

属性定义：

```json
{
  "label#2405:1": {
    "type": "TEXT",
    "defaultValue": "男孩"
  }
}
```

#### media/sceneTimelineItem · 2540:13147

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "active",
    "variantOptions": [
      "active",
      "default"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=active | 2413:28811 | 252 × 90 | VERTICAL | HUG / HUG |
| state=default | 2540:13148 | 252 × 90 | VERTICAL | HUG / HUG |

#### character/tuantuan/animation · 2379:12490

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "surprised",
    "variantOptions": [
      "surprised",
      "talking",
      "thinking",
      "wink",
      "celebrating",
      "directing",
      "idle",
      "nervous",
      "directingAlternate"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=surprised | 2379:12489 | 640 × 640 | NONE | FIXED / FIXED |
| state=talking | 2379:12488 | 640 × 640 | NONE | FIXED / FIXED |
| state=thinking | 2379:12486 | 640 × 640 | NONE | FIXED / FIXED |
| state=wink | 2379:12485 | 640 × 640 | NONE | FIXED / FIXED |
| state=celebrating | 2379:12487 | 640 × 640 | NONE | FIXED / FIXED |
| state=directing | 2379:12484 | 640 × 640 | NONE | FIXED / FIXED |
| state=idle | 2379:12483 | 640 × 640 | NONE | FIXED / FIXED |
| state=nervous | 2379:12482 | 640 × 640 | NONE | FIXED / FIXED |
| state=directingAlternate | 2379:12481 | 640 × 640 | NONE | FIXED / FIXED |

#### character/tuantuan/scene · 2389:21711

属性定义：

```json
{
  "label#2389:14": {
    "type": "TEXT",
    "defaultValue": "团团说话"
  }
}
```

#### progress/storyStepIndicator · 2239:6862

属性定义：

```json
{
  "tone": {
    "type": "VARIANT",
    "defaultValue": "accent",
    "variantOptions": [
      "accent",
      "neutral",
      "muted",
      "completed"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| tone=accent | 2239:6784 | 56 × 56 | VERTICAL | FIXED / FIXED |
| tone=completed | 2540:13197 | 48 × 48 | VERTICAL | FIXED / FIXED |
| tone=neutral | 2248:7762 | 56 × 56 | VERTICAL | FIXED / FIXED |
| tone=muted | 2239:6863 | 56 × 56 | VERTICAL | FIXED / FIXED |

#### progress/storyStepProgress · 2330:11024

属性定义：

```json
{
  "step": {
    "type": "VARIANT",
    "defaultValue": "scene",
    "variantOptions": [
      "scene",
      "composition",
      "narration",
      "storyEdit",
      "filming"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| step=scene | 2239:6858 | 524 × 80 | HORIZONTAL | HUG / HUG |
| step=composition | 2330:11025 | 516 × 80 | HORIZONTAL | HUG / HUG |
| step=narration | 2330:11198 | 508 × 80 | HORIZONTAL | HUG / HUG |
| step=storyEdit | 2330:11370 | 500 × 80 | HORIZONTAL | HUG / HUG |
| step=filming | 2396:12908 | 492 × 80 | HORIZONTAL | HUG / HUG |

#### map/bossLabel · 2045:11534

属性定义：

```json
{
  "variant": {
    "type": "VARIANT",
    "defaultValue": "sentenceKing",
    "variantOptions": [
      "sentenceKing",
      "bossChallenge"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| variant=sentenceKing | 2045:11533 | 170 × 48 | HORIZONTAL | FIXED / HUG |
| variant=bossChallenge | 2045:11535 | 159 × 48 | HORIZONTAL | FIXED / FIXED |

#### map/chapterNode · 2044:10875

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "available",
    "variantOptions": [
      "available",
      "completed",
      "locked",
      "current"
    ]
  },
  "variant": {
    "type": "VARIANT",
    "defaultValue": "standard",
    "variantOptions": [
      "standard",
      "free"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=available, variant=standard | 2044:10485 | 240 × 240 | NONE | FIXED / FIXED |
| state=available, variant=free | 2045:12680 | 240 × 240 | NONE | FIXED / FIXED |
| state=completed, variant=standard | 2044:11454 | 240 × 240 | NONE | FIXED / FIXED |
| state=locked, variant=standard | 2044:11172 | 240 × 240 | NONE | FIXED / FIXED |
| state=locked, variant=free | 2045:12535 | 240 × 240 | NONE | FIXED / FIXED |
| state=current, variant=standard | 2044:10876 | 240 × 240 | NONE | FIXED / FIXED |
| state=current, variant=free | 2045:12556 | 240 × 240 | NONE | FIXED / FIXED |

#### sticker/stickerSlot · 2340:12212

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "default",
    "variantOptions": [
      "default",
      "selected",
      "disabled"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=default | 2340:12205 | 96 × 96 | NONE | FIXED / FIXED |
| state=selected | 2540:19786 | 96 × 96 | NONE | FIXED / FIXED |
| state=disabled | 2340:12213 | 96 × 96 | NONE | FIXED / FIXED |

#### artwork/map/chapter · 2045:11742

属性定义：

```json
{
  "chapter": {
    "type": "VARIANT",
    "defaultValue": "sentenceKing",
    "variantOptions": [
      "sentenceKing",
      "myWeekend",
      "happyDay",
      "trophy",
      "firstTime",
      "rainyDay"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| chapter=sentenceKing | 2044:11440 | 112 × 112 | NONE | FIXED / FIXED |
| chapter=myWeekend | 2045:12526 | 112 × 112 | NONE | FIXED / FIXED |
| chapter=happyDay | 2064:5751 | 112 × 112 | NONE | FIXED / FIXED |
| chapter=trophy | 2064:6232 | 112 × 112 | NONE | FIXED / FIXED |
| chapter=firstTime | 2064:6236 | 112 × 112 | NONE | FIXED / FIXED |
| chapter=rainyDay | 2064:6243 | 112 × 112 | NONE | FIXED / FIXED |

#### artwork/map/island · 2039:8214

属性定义：

```json
{
  "island": {
    "type": "VARIANT",
    "defaultValue": "sentenceKing",
    "variantOptions": [
      "sentenceKing",
      "smileVillage",
      "myTown",
      "fantasyCloudIsland",
      "fourSeasonsForest",
      "treasureWorkshop"
    ]
  },
  "state": {
    "type": "VARIANT",
    "defaultValue": "active",
    "variantOptions": [
      "active",
      "disabled",
      "default"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| island=sentenceKing, state=active | 2039:8213 | 360 × 360 | NONE | FIXED / FIXED |
| island=sentenceKing, state=disabled | 2039:8212 | 360 × 360 | NONE | FIXED / FIXED |
| island=sentenceKing, state=default | 2039:8211 | 360 × 360 | NONE | FIXED / FIXED |
| island=smileVillage, state=active | 2040:8238 | 360 × 360 | NONE | FIXED / FIXED |
| island=smileVillage, state=disabled | 2040:8239 | 360 × 360 | NONE | FIXED / FIXED |
| island=smileVillage, state=default | 2040:8237 | 360 × 360 | NONE | FIXED / FIXED |
| island=myTown, state=active | 2040:8244 | 360 × 360 | NONE | FIXED / FIXED |
| island=myTown, state=disabled | 2040:8243 | 360 × 360 | NONE | FIXED / FIXED |
| island=myTown, state=default | 2040:8245 | 360 × 360 | NONE | FIXED / FIXED |
| island=fantasyCloudIsland, state=active | 2040:8250 | 360 × 360 | NONE | FIXED / FIXED |
| island=fantasyCloudIsland, state=disabled | 2040:8249 | 360 × 360 | NONE | FIXED / FIXED |
| island=fantasyCloudIsland, state=default | 2040:8251 | 360 × 360 | NONE | FIXED / FIXED |
| island=fourSeasonsForest, state=active | 2040:8256 | 360 × 360 | NONE | FIXED / FIXED |
| island=fourSeasonsForest, state=disabled | 2040:8255 | 360 × 360 | NONE | FIXED / FIXED |
| island=fourSeasonsForest, state=default | 2040:8257 | 360 × 360 | NONE | FIXED / FIXED |
| island=treasureWorkshop, state=active | 2040:8231 | 360 × 360 | NONE | FIXED / FIXED |
| island=treasureWorkshop, state=disabled | 2040:8230 | 360 × 360 | NONE | FIXED / FIXED |
| island=treasureWorkshop, state=default | 2040:8232 | 360 × 360 | NONE | FIXED / FIXED |

#### navigation/storyBookmark · 2344:12478

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "default",
    "variantOptions": [
      "default",
      "selected"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=default | 2342:12337 | 72 × 72 | VERTICAL | HUG / HUG |
| state=selected | 2344:12479 | 72 × 72 | VERTICAL | HUG / HUG |

#### navigation/woodenTitle · 2389:16102

属性定义：

```json
{
  "size": {
    "type": "VARIANT",
    "defaultValue": "compact",
    "variantOptions": [
      "compact",
      "wide"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| size=compact | 2322:11319 | 273.455 × 96 | HORIZONTAL | FIXED / FIXED |
| size=wide | 2389:16103 | 468.706 × 96 | HORIZONTAL | FIXED / FIXED |

#### story/editableContent · 2389:20704

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "default",
    "variantOptions": [
      "default",
      "editing",
      "selected"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=default | 2389:20703 | 1080 × 168 | VERTICAL | FIXED / HUG |
| state=editing | 2389:23367 | 1080 × 168 | VERTICAL | FIXED / HUG |
| state=selected | 2389:20705 | 1080 × 168 | VERTICAL | FIXED / HUG |

#### story/elementRow · 2349:9280

属性定义：

```json
{
  "label#2349:1": {
    "type": "TEXT",
    "defaultValue": "Question"
  },
  "state": {
    "type": "VARIANT",
    "defaultValue": "filled",
    "variantOptions": [
      "filled",
      "empty"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=filled | 2349:8744 | 607 × 96 | HORIZONTAL | FIXED / FIXED |
| state=empty | 2349:9281 | 607 × 96 | HORIZONTAL | FIXED / FIXED |

#### story/openStorybook · 2389:21101

属性定义：

```json
{
  "mode": {
    "type": "VARIANT",
    "defaultValue": "summary",
    "variantOptions": [
      "summary"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| mode=summary | 2353:12068 | 1824.166 × 904 | HORIZONTAL | HUG / FIXED |

#### story/storybookPage · 2353:13279

属性定义：

```json
{
  "mode": {
    "type": "VARIANT",
    "defaultValue": "collect",
    "variantOptions": [
      "complete",
      "collect",
      "edit"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| mode=collect | 2353:13276 | 594 × 980 | VERTICAL | FIXED / FILL |
| mode=edit | 2389:20323 | 1238 × 980 | VERTICAL | FIXED / FILL |
| mode=complete | 2353:13278 | 594 × 980 | VERTICAL | FIXED / FILL |

#### dialog/stickerGenerator · 2379:11854

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "idle",
    "variantOptions": [
      "idle",
      "listening",
      "generated"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=idle | 2344:13266 | 836 × 789 | NONE | FIXED / FIXED |
| state=listening | 2379:11855 | 836 × 789 | NONE | FIXED / FIXED |
| state=generated | 2379:11887 | 836 × 789 | NONE | FIXED / FIXED |

#### dialogue/speechBubble · 2351:9338

属性定义：

```json
{
  "label#2351:0": {
    "type": "TEXT",
    "defaultValue": "input"
  },
  "role": {
    "type": "VARIANT",
    "defaultValue": "guide",
    "variantOptions": [
      "guide",
      "player",
      "placeholder"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| role=guide | 2351:9337 | 148 × 88 | HORIZONTAL | HUG / HUG |
| role=player | 2351:9336 | 148 × 88 | HORIZONTAL | FIXED / HUG |
| role=placeholder | 2351:9365 | 148 × 88 | HORIZONTAL | FIXED / HUG |

#### resource/statusBar · 2540:15538

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "default",
    "variantOptions": [
      "default",
      "walletOpen"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=default | 2020:8765 | 320 × 72 | HORIZONTAL | HUG / FIXED |
| state=walletOpen | 2540:15539 | 320 × 72 | HORIZONTAL | HUG / FIXED |

#### control/iconSlot · 2019:4414

属性定义：

```json
{
  "icon#2020:1": {
    "type": "INSTANCE_SWAP",
    "defaultValue": "2009:4470",
    "preferredValues": [
      {
        "type": "COMPONENT",
        "key": "828233aafa7c94707db8aaad01cc749aa607fac0"
      }
    ]
  },
  "size": {
    "type": "VARIANT",
    "defaultValue": "sm",
    "variantOptions": [
      "sm",
      "xs",
      "lg",
      "md",
      "xxs"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| size=sm | 2009:4467 | 56 × 56 | NONE | FIXED / FIXED |
| size=xs | 2020:9206 | 48 × 48 | NONE | FIXED / FIXED |
| size=xxs | 2353:16902 | 24 × 24 | NONE | FIXED / FIXED |
| size=lg | 2020:9968 | 96 × 96 | NONE | FIXED / FIXED |
| size=md | 2019:4415 | 72 × 72 | NONE | FIXED / FIXED |

#### control/micButton · 2351:8715

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "idle",
    "variantOptions": [
      "idle",
      "listening"
    ]
  },
  "size": {
    "type": "VARIANT",
    "defaultValue": "lg",
    "variantOptions": [
      "lg",
      "md"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=idle, size=lg | 2351:8716 | 240 × 240 | NONE | FIXED / FIXED |
| state=listening, size=lg | 2351:8719 | 240 × 240 | NONE | FIXED / FIXED |
| state=idle, size=md | 2351:8724 | 168 × 168 | NONE | FIXED / FIXED |
| state=listening, size=md | 2351:8727 | 168 × 168 | NONE | FIXED / FIXED |

#### control/storyButton · 2020:8830

属性定义：

```json
{
  "label#2020:0": {
    "type": "TEXT",
    "defaultValue": "Text"
  },
  "showIcon#2179:0": {
    "type": "BOOLEAN",
    "defaultValue": false
  },
  "resourceSlot#2344:3": {
    "type": "SLOT",
    "description": null,
    "preferredValues": []
  },
  "showResource#2382:0": {
    "type": "BOOLEAN",
    "defaultValue": false
  },
  "variant": {
    "type": "VARIANT",
    "defaultValue": "compact",
    "variantOptions": [
      "compact",
      "hero",
      "icon",
      "standard",
      "blue",
      "heroSmall",
      "blueWhiteFill"
    ]
  },
  "state": {
    "type": "VARIANT",
    "defaultValue": "default",
    "variantOptions": [
      "default",
      "active",
      "disabled"
    ]
  },
  "size": {
    "type": "VARIANT",
    "defaultValue": "default",
    "variantOptions": [
      "default",
      "sm"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| variant=compact, state=default, size=default | 2020:10308 | 277 × 72 | HORIZONTAL | HUG / FIXED |
| variant=heroSmall, state=default, size=default | 2330:11770 | 291 × 96 | HORIZONTAL | FIXED / FIXED |
| variant=hero, state=default, size=default | 2009:4479 | 509.25 × 168 | HORIZONTAL | FIXED / FIXED |
| variant=icon, state=default, size=default | 2033:4704 | 96 × 96 | VERTICAL | FIXED / FIXED |
| variant=standard, state=active, size=default | 2344:13803 | 153 × 72 | HORIZONTAL | HUG / FIXED |
| variant=standard, state=default, size=default | 2340:12180 | 153 × 72 | HORIZONTAL | HUG / FIXED |
| variant=standard, state=disabled, size=default | 2040:8508 | 153 × 72 | HORIZONTAL | HUG / FIXED |
| variant=blue, state=default, size=default | 2179:8601 | 153 × 72 | HORIZONTAL | HUG / FIXED |
| variant=blueWhiteFill, state=default, size=default | 2389:22775 | 153 × 72 | HORIZONTAL | HUG / FIXED |
| variant=standard, state=active, size=sm | 2344:12589 | 97 × 48 | HORIZONTAL | HUG / FIXED |
| variant=standard, state=default, size=sm | 2344:12586 | 97 × 48 | HORIZONTAL | HUG / FIXED |
| variant=standard, state=disabled, size=sm | 2344:12583 | 97 × 48 | HORIZONTAL | HUG / FIXED |

#### feedback/completionBadge · 2044:11231

属性定义：

```json
{
  "state": {
    "type": "VARIANT",
    "defaultValue": "completed",
    "variantOptions": [
      "completed",
      "incomplete"
    ]
  }
}
```

| 变体名 | ID | w × h | Auto Layout | 横向 / 纵向 sizing |
| --- | --- | --- | --- | --- |
| state=completed | 2044:10504 | 72 × 72 | HORIZONTAL | FIXED / FIXED |
| state=incomplete | 2044:11232 | 72 × 72 | HORIZONTAL | FIXED / FIXED |

## E. 当前各画面的实际布局与文案

这里列根、子容器和下一层容器，用于恢复布局关系；不包含完整矢量路径。节点坐标相对其所属父级。大人物框可能含透明空间或有意越出页面内容，不将其当成布局验收结论。

### screen/home/title

- 主节点：[2020:4451](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2020-4451)

```text
- screen/home/title [2020:4451] FRAME xy(100,100) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - exec-2805e2de-fd99-4a26-bfcb-625739dcc22d 1 [2033:4703] RECTANGLE xy(101,744.59) 321×289.41 sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX
  - exec-6083f655-6877-4e26-ba15-85a54295aa7d 1 [2033:6689] RECTANGLE xy(1466,401) 459×306 sizing=FIXED/FIXED positioning=AUTO constraints=MAX/MIN
  - layout/frame2 [2340:8209] FRAME xy(406.269,0) 1106.796×793 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/MIN gap=-14 padding(T/R/B/L)=78/0/78/0
    - Group 1 [2340:8210] GROUP xy(0,78) 1106.796×483 sizing=FIXED/FIXED positioning=AUTO
    - control/storyButton [2340:9458] INSTANCE xy(298.773,547) 509.25×168 layout=HORIZONTAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=0/72/0/72
  - character/tuantuan/animation [2389:21787] INSTANCE xy(290,541) 534×534 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - Idle 1 [I2389:21787;2379:12478] RECTANGLE xy(0,0) 534×534 sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE
  - layout/bar [2239:6915] FRAME xy(1207,0) 713×144 layout=HORIZONTAL sizing=FIXED/HUG positioning=AUTO constraints=MAX/MIN gap=10 padding(T/R/B/L)=0/0/0/0
    - layout/resourceBar [2020:10439] FRAME xy(0,0) 705×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 开始冒险
- x
- 6
- 2
- 贴纸图鉴

### screen/map/storyIsland

- 主节点：[2033:6691](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2033-6691)

```text
- screen/map/storyIsland [2033:6691] FRAME xy(2220,100) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - layout/mapArtwork [2571:23497] FRAME xy(30,7) 2001×967 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - Vector 5 (Stroke) [2040:8340] VECTOR xy(272,208.667) 1348.5×648 sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE
    - map/islandMarker [2040:8261] INSTANCE xy(1481,80) 520×520 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/islandMarker [2040:8267] INSTANCE xy(0,136.667) 520×520 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/islandMarker [2040:8272] INSTANCE xy(371,411) 520×520 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/islandMarker [2040:8277] INSTANCE xy(547,0) 520×520 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/islandMarker [2040:8281] INSTANCE xy(828,447) 520×520 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/islandMarker [2040:8285] INSTANCE xy(1045,84) 520×520 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
  - character/tuantuan/dialogue [2399:14005] INSTANCE xy(355,833) 1361×168 layout=HORIZONTAL sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=10 padding(T/R/B/L)=24/84/24/84
    - text/label [I2399:14005;2040:8628] TEXT xy(96,36) 1169×96 sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN
    - control/iconSlot [I2399:14005;2040:8633] INSTANCE xy(1241,94) 56×56 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MAX/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/avatar [I2399:14005;2040:9049] INSTANCE xy(-160,-36) 240×240 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - layout/bar [2322:11154] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=AUTO constraints=STRETCH/MIN gap=821 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2322:11155] FRAME xy(0,0) 477.455×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2322:11158] FRAME xy(1215,12) 705×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 2/15
- 我的小镇
- 笑脸村
- 四季森林
- 百宝工坊
- 幻想云岛
- 糟糕！一句话大王用灰雾罩住了故事岛！
- 故事岛
- x
- 6
- 2
- 贴纸图鉴

### screen/map/myTown/overview

- 主节点：[2040:9114](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2040-9114)

```text
- screen/map/myTown/overview [2040:9114] FRAME xy(4340,100) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - layout/mapArtwork [2571:23498] FRAME xy(90,226) 1783×500 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - Vector 6 [2045:11705] VECTOR xy(134,19.841) 1541×430.556 sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE
    - map/chapterNode [2044:10510] INSTANCE xy(0,261.905) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2044:10689] INSTANCE xy(309,0) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2044:11121] INSTANCE xy(617,261.905) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2044:11241] INSTANCE xy(926,0) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2044:11325] INSTANCE xy(1234,261.905) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2044:11369] INSTANCE xy(1543,0) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
  - character/tuantuan/dialogue [2413:12196] INSTANCE xy(355,833) 1361×168 layout=HORIZONTAL sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=10 padding(T/R/B/L)=24/84/24/84
    - text/label [I2413:12196;2040:8628] TEXT xy(96,36) 1169×96 sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN
    - control/iconSlot [I2413:12196;2040:8633] INSTANCE xy(1241,94) 56×56 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MAX/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/avatar [I2413:12196;2040:9049] INSTANCE xy(-160,-36) 240×240 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - layout/bar [2239:6917] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=AUTO constraints=STRETCH/MIN gap=821 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2045:12517] FRAME xy(0,0) 477.455×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2040:9125] FRAME xy(1215,12) 705×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 我的周末
- 快乐的一天
- 第一次……
- 下雨天
- 大王挑战
- 自由故事
- 这里是我的小镇
- 我的小镇
- x
- 6
- 2
- 贴纸图鉴

### screen/map/myTown/levelSelected

- 主节点：[2335:11984](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2335-11984)

```text
- screen/map/myTown/levelSelected [2335:11984] FRAME xy(6460,100) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - layout/mapArtwork [2571:23499] FRAME xy(90,226) 1783×500 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - Vector 6 [2413:12491] VECTOR xy(134,19.841) 1541×430.556 sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE
    - map/chapterNode [2413:12492] INSTANCE xy(0,261.905) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2413:12493] INSTANCE xy(309,0) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2413:12494] INSTANCE xy(617,261.905) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2413:12495] INSTANCE xy(926,0) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2413:12496] INSTANCE xy(1234,261.905) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - map/chapterNode [2413:12497] INSTANCE xy(1543,0) 240×238.095 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
  - map/chapterActionPanel [2335:12386] INSTANCE xy(185,800) 1551×280 layout=HORIZONTAL sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=72 padding(T/R/B/L)=16/24/16/24
    - Rectangle 16 [I2335:12386;2605:98839] RECTANGLE xy(0,0) 1551×280 sizing=FIXED/FIXED positioning=ABSOLUTE constraints=SCALE/SCALE
    - layout/content [I2335:12386;2340:11853] FRAME xy(24,44) 1503×192 layout=HORIZONTAL sizing=FILL/HUG positioning=AUTO constraints=MIN/MIN gap=64 padding(T/R/B/L)=12/64/12/64
  - layout/bar [2335:11999] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=AUTO constraints=STRETCH/MIN gap=821 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2335:12000] FRAME xy(0,0) 477.455×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2335:12003] FRAME xy(1215,12) 705×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 我的周末
- 快乐的一天
- 第一次……
- 下雨天
- 大王挑战
- 自由故事
- 出发！
- 讲清楚谁、在哪里
- 讲清楚先后和为什么
- 讲清楚后来怎么样
- 我的小镇
- x
- 6
- 2
- 贴纸图鉴

### screen/story/happyDay/sceneSelection

- 主节点：[2064:6613](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2064-6613)

```text
- screen/story/happyDay/sceneSelection [2064:6613] FRAME xy(100,1380) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - layout/frame6 [2330:8304] FRAME xy(0,176) 1920×480 layout=HORIZONTAL sizing=FIXED/FIXED positioning=AUTO constraints=STRETCH/STRETCH gap=64 padding(T/R/B/L)=0/72/0/72
    - scene/locationSelectionCard [2160:7826] INSTANCE xy(72,0) 396×480 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=24 padding(T/R/B/L)=20/20/72/20
    - scene/locationSelectionCard [2311:6682] INSTANCE xy(532,0) 396×480 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=22.5 padding(T/R/B/L)=20/20/72/20
    - scene/locationSelectionCard [2330:8274] INSTANCE xy(992,0) 396×480 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=22.5 padding(T/R/B/L)=20/20/72/20
    - scene/locationSelectionCard [2330:8289] INSTANCE xy(1452,0) 396×480 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=22.5 padding(T/R/B/L)=20/20/72/20
  - character/tuantuan/dialogue [2413:13076] INSTANCE xy(355,833) 1361×168 layout=HORIZONTAL sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=10 padding(T/R/B/L)=24/84/24/84
    - text/label [I2413:13076;2040:8628] TEXT xy(96,36) 1169×96 sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN
    - control/iconSlot [I2413:13076;2040:8633] INSTANCE xy(1241,94) 56×56 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MAX/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/avatar [I2413:13076;2040:9049] INSTANCE xy(-160,-36) 240×240 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
  - layout/bar [2239:6919] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=AUTO constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2175:8106] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2175:8115] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2239:6920] INSTANCE xy(722,60) 524×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 公园
- 就在这里!
- 小河边
- 我的家
- 学校
- 快乐的一天……那天，你在哪里呀？
- x
- 6
- 2

### screen/story/happyDay/composition

- 主节点：[2330:10588](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2330-10588)

```text
- screen/story/happyDay/composition [2330:10588] FRAME xy(2220,1380) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=209/0/0/0
  - layout/mainContent [2351:10399] FRAME xy(0,209) 1920×871 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=SCALE/MIN gap=36 padding(T/R/B/L)=20/36/36/36
    - feedback/instructionBanner [2605:101960] INSTANCE xy(160,-80) 998×146 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/scenePreview [2330:11749] FRAME xy(36,20) 1312×815 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=36/36/36/36
    - navigation/sidebar [2413:13357] INSTANCE xy(1384,20) 500×815 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=24/24/24/24
  - navigation/topBar [2330:10594] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2330:10595] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2330:10598] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2330:10597] INSTANCE xy(706,44) 516×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 那天都有谁？他们在干什么？摆出来给我看看！
- 说一说，变贴纸
- 1
- 拼好啦
- x
- 6
- 2

### screen/story/happyDay/stickerGeneration

- 主节点：[2413:14485](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-14485)

```text
- screen/story/happyDay/stickerGeneration [2413:14485] FRAME xy(4340,1380) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=209/0/0/0
  - layout/mainContent [2413:14492] FRAME xy(0,209) 1920×871 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=SCALE/MIN gap=36 padding(T/R/B/L)=20/36/36/36
    - feedback/instructionBanner [2605:101970] INSTANCE xy(160,-80) 998×146 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/scenePreview [2413:14494] FRAME xy(36,20) 1312×815 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=36/36/36/36
    - navigation/sidebar [2413:14496] INSTANCE xy(1384,20) 500×815 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=24/24/24/24
  - dialog/modalOverlay [2413:14972] INSTANCE xy(0,0) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - dialog/stickerGenerator [I2413:14972;2344:13267] INSTANCE xy(666.862,264) 585.477×552.3 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=CENTER/CENTER gap=0 padding(T/R/B/L)=0/0/0/0
    - control/storyButton [I2413:14972;2344:13806] INSTANCE xy(1187,281) 96×96 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=CENTER/CENTER gap=0 padding(T/R/B/L)=0/0/0/0
  - navigation/topBar [2413:14486] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2413:14487] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2413:14490] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2413:14489] INSTANCE xy(706,44) 516×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 那天都有谁？他们在干什么？摆出来给我看看！
- 说一说，变贴纸
- 1
- 拼好啦
- 想要什么? 说给团团听
- 按住说话，松开结束
- x
- 6
- 2

### screen/story/happyDay/narration/idle

- 主节点：[2348:8165](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2348-8165)

```text
- screen/story/happyDay/narration/idle [2348:8165] FRAME xy(100,2660) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2351:9890] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/SCALE gap=0 padding(T/R/B/L)=20/48/36/48
    - layout/characterScene [2351:9873] FRAME xy(48,20) 601.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/0/0
    - layout/narrationColumn [2351:9888] FRAME xy(649.333,20) 621.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=0/20/0/0
    - layout/storybookColumn [2413:16148] FRAME xy(1270.667,20) 601.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/36/0
  - character/tuantuan/scene [2389:21730] INSTANCE xy(0,0) 646×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2389:21730;2389:21704] INSTANCE xy(0,515.925) 564.075×564.075 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/characterSpeech [I2389:21730;2389:21900] FRAME xy(248.78,461.36) 302.12×93.36 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/CENTER gap=4.08 padding(T/R/B/L)=13.6/24.48/13.6/24.48
  - navigation/topBar [2348:8168] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2348:8169] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2348:8172] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2348:8171] INSTANCE xy(706,44) 508×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 有男孩，还有小猫
- 男孩先跑来跑去地玩，然后一口气跑回了家。
- 按住说话
- 故事本
- 认识故事
- 谁
- Info
- 在哪里
- 发生了什么
- 理清故事发展
- 做了什么
- 为什么
- 让故事走到结局
- 后来呢？
- 男孩和小猫在什么地方呀？
- 团团
- x
- 6
- 2

### screen/story/happyDay/narration/complete

- 主节点：[2351:11101](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-11101)

```text
- screen/story/happyDay/narration/complete [2351:11101] FRAME xy(100,3940) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - icon/star [2373:11074] INSTANCE xy(334,103) 45×45 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
    - 图层 1 [I2373:11074;2020:9053] GROUP xy(0.013,1.411) 44.292×42.888 sizing=FIXED/FIXED positioning=AUTO
  - icon/star [2373:11075] INSTANCE xy(1288,48) 45×45 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
    - 图层 1 [I2373:11075;2020:9053] GROUP xy(0.013,1.411) 44.292×42.888 sizing=FIXED/FIXED positioning=AUTO
  - layout/mainContent [2413:17492] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/SCALE gap=0 padding(T/R/B/L)=20/48/36/48
    - layout/storybookColumn [2413:17505] FRAME xy(48,20) 1824×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/36/0
  - icon/star [2373:11076] INSTANCE xy(379,33) 23×23 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
    - 图层 1 [I2373:11076;2020:9053] GROUP xy(0.007,0.721) 22.638×21.92 sizing=FIXED/FIXED positioning=AUTO
  - icon/star [2373:11077] INSTANCE xy(1433,95) 24×24 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MIN gap=0 padding(T/R/B/L)=0/0/0/0
    - 图层 1 [I2373:11077;2020:9053] GROUP xy(0.007,0.752) 23.622×22.873 sizing=FIXED/FIXED positioning=AUTO
  - character/tuantuan/scene [2389:21722] INSTANCE xy(0,-243) 791×1323 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2389:21722;2389:21704] INSTANCE xy(0,632.314) 690.686×690.686 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/characterSpeech [I2389:21722;2389:21900] FRAME xy(305.143,566.191) 369.972×113.316 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/CENTER gap=4.998 padding(T/R/B/L)=16.66/29.988/16.66/29.988
  - navigation/topBar [2351:11102] FRAME xy(-47,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2351:11103] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2351:11106] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2351:11105] INSTANCE xy(706,44) 508×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 看看团团记下的故事
- 故事本
- 认识故事
- 谁
- Info
- 在哪里
- 发生了什么
- 理清故事发展
- 先后
- 为什么
- 让故事走到结局
- 后来呢？
- 故事本记满啦！你说得清清楚楚
- 团团
- x
- 6
- 2

### screen/story/happyDay/storyEdit

- 主节点：[2382:11040](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2382-11040)

```text
- screen/story/happyDay/storyEdit [2382:11040] FRAME xy(100,5220) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2413:25942] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/SCALE gap=0 padding(T/R/B/L)=20/72/36/72
    - layout/storybookColumn [2413:25943] FRAME xy(72,20) 1776×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/36/0
  - character/tuantuan/scene [2389:21712] INSTANCE xy(0,0) 646×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2389:21712;2389:21704] INSTANCE xy(0,515.925) 564.075×564.075 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/characterSpeech [I2389:21712;2389:21900] FRAME xy(248.78,461.36) 302.12×93.36 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/CENTER gap=4.08 padding(T/R/B/L)=13.6/24.48/13.6/24.48
  - navigation/topBar [2382:11041] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2382:11042] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2382:11045] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2382:11044] INSTANCE xy(706,44) 500×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 团团记下的故事
- 有一天，男孩和小猫来到了公园里。男孩先跑来跑去地玩，然后一口气跑回了家。因为男孩玩得太累啦。天快黑了，小猫和男孩开开心心地说了再见。
- 我还想加一句
- 改好啦，开拍电影
- 1
- 团团把你的故事记下来了，你看看对不对？
- 团团
- x
- 6
- 2

### screen/movie/happyDay/filming

- 主节点：[2413:27265](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-27265)

```text
- screen/movie/happyDay/filming [2413:27265] FRAME xy(100,6500) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2413:27266] FRAME xy(0,144) 1920×936 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/CENTER gap=36 padding(T/R/B/L)=20/72/36/72
    - layout/03 [2413:27754] FRAME xy(72,20) 1776×804 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=16/16/16/16
    - Frame 83 [2605:103761] FRAME xy(72,860) 1776×40 layout=HORIZONTAL sizing=FILL/HUG positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/549/0/549
  - character/tuantuan/scene [2413:27275] INSTANCE xy(0,0) 646×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2413:27275;2389:21704] INSTANCE xy(0,515.925) 564.075×564.075 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
  - navigation/topBar [2413:27269] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2413:27270] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2413:27273] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2413:27272] INSTANCE xy(706,44) 492×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 男孩
- 就绪
- 小猫
- 红风筝
- 第 2 幕
- 正在拍摄……
- x
- 6
- 2

### screen/level/happyDay/results

- 主节点：[2540:13198](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-13198)

```text
- screen/level/happyDay/results [2540:13198] FRAME xy(100,7780) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=192/24/24/24
  - layout/resultStage [2594:45691] FRAME xy(24,192) 1872×864 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=12 padding(T/R/B/L)=0/0/0/0
    - layout/storyStepIndicator [2542:28666] FRAME xy(705,401) 463×463 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=CENTER/MAX gap=10 padding(T/R/B/L)=0/0/0/0
    - layout/resultCard [2594:45692] FRAME xy(522.5,0) 827×864 layout=VERTICAL sizing=FIXED/FILL positioning=AUTO constraints=MIN/MIN gap=12 padding(T/R/B/L)=24/40/24/40
    - layout/resourceCounter [2542:31137] FRAME xy(1414,0) 108×48 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=MIN/MIN gap=6 padding(T/R/B/L)=0/0/0/0
  - character/tuantuan/scene [2605:87592] INSTANCE xy(0,-63) 683×1143 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2605:87592;2389:21704] INSTANCE xy(0,546.617) 596.383×596.383 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/characterSpeech [I2605:87592;2389:21900] FRAME xy(287,457) 336×136 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/CENTER gap=6 padding(T/R/B/L)=20/36/20/36
  - layout/bar [2540:13213] FRAME xy(0,0) 1920×192 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2540:13214] FRAME xy(0,0) 192×192 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2540:13217] FRAME xy(1215,24) 705×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 快乐的一天
- 新贴纸!
- 讲清楚谁、在哪里
- 讲清楚先后和为什么
- 讲清楚后来怎么样
- 保存给爸爸妈妈
- 回到地图
- +
- 3
- 太棒啦！ / 灰雾散开了一些
- 团团
- x
- 6
- 2
- 贴纸图鉴

### screen/collection/stickersAndMovies

- 主节点：[2540:14893](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-14893)

```text
- screen/collection/stickersAndMovies [2540:14893] FRAME xy(100,9060) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2540:19893] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/SCALE gap=0 padding(T/R/B/L)=20/48/36/72
    - layout/storybook [2540:20215] FRAME xy(72,20) 1800×880 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=-64 padding(T/R/B/L)=0/0/0/216
  - character/tuantuan/scene [2540:20815] INSTANCE xy(0,301) 465×779 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2540:20815;2389:21704] INSTANCE xy(0,372.971) 406.029×406.029 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
  - navigation/topBar [2540:15106] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=821 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2540:15107] FRAME xy(0,0) 477.455×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2540:15110] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 贴纸
- 已收集
- 21 / 34
- 说一说，变贴纸
- 1
- 我的电影
- 快乐的一天
- 导演和配音
- 我
- 温馨的夜晚
- 冒险的旅程
- 静谧的早晨
- 激动的时刻
- 创意的碰撞
- 贴纸图鉴
- x
- 6
- 2

### screen/collection/moviePlayer

- 主节点：[2540:21912](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-21912)

```text
- screen/collection/moviePlayer [2540:21912] FRAME xy(2220,10340) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2540:21913] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/SCALE gap=0 padding(T/R/B/L)=20/48/36/48
    - layout/storybook [2540:21914] FRAME xy(48,20) 1824×880 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=-64 padding(T/R/B/L)=0/0/0/0
  - layout/moviePlayerOverlay [2540:22311] FRAME xy(0,0) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=STRETCH/STRETCH gap=0 padding(T/R/B/L)=0/0/0/0
    - control/playbackToggle [2540:22315] FRAME xy(840,420) 240×240 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=CENTER/CENTER gap=10 padding(T/R/B/L)=36/36/36/36
    - layout/playbackControls [2540:22675] FRAME xy(72,899) 1776×122 layout=HORIZONTAL sizing=FIXED/FIXED positioning=AUTO constraints=STRETCH/MAX gap=36 padding(T/R/B/L)=12/36/12/12
  - navigation/topBar [2540:21993] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=821 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2540:21994] FRAME xy(0,0) 477.455×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2540:21997] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 贴纸
- 已收集
- 21 / 34
- 说一说，变贴纸
- 1
- 我的电影
- 快乐的一天
- 导演和配音
- 我
- 温馨的夜晚
- 冒险的旅程
- 静谧的早晨
- 激动的时刻
- 创意的碰撞
- 0:28
- 1:32
- 贴纸图鉴
- x
- 6
- 2

### screen/collection/stickerGeneration

- 主节点：[2540:21479](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2540-21479)

```text
- screen/collection/stickerGeneration [2540:21479] FRAME xy(100,10340) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2605:105800] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=20/48/36/72
    - layout/storybook [2605:105801] FRAME xy(72,20) 1800×880 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=-64 padding(T/R/B/L)=0/0/0/216
  - dialog/modalOverlay [2605:106149] INSTANCE xy(0,0) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - dialog/stickerGenerator [I2605:106149;2344:13267] INSTANCE xy(666.862,264) 585.477×552.3 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=CENTER/CENTER gap=0 padding(T/R/B/L)=0/0/0/0
    - control/storyButton [I2605:106149;2344:13806] INSTANCE xy(1187,281) 96×96 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=CENTER/CENTER gap=0 padding(T/R/B/L)=0/0/0/0
  - character/tuantuan/scene [2540:21559] INSTANCE xy(0,301) 465×779 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2540:21559;2389:21704] INSTANCE xy(0,372.971) 406.029×406.029 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
  - navigation/topBar [2540:21560] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=821 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2540:21561] FRAME xy(0,0) 477.455×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2540:21564] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
```

当前可见活文本文案（去重，保留占位）：

- 贴纸
- 已收集
- 21 / 34
- 说一说，变贴纸
- 1
- 我的电影
- 快乐的一天
- 导演和配音
- 我
- 温馨的夜晚
- 冒险的旅程
- 静谧的早晨
- 激动的时刻
- 创意的碰撞
- 想要什么? 说给团团听
- 按住说话，松开结束
- 贴纸图鉴
- x
- 6
- 2

### screen/movie/happyDay/voiceoverPrompt

- 主节点：[2532:12848](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2532-12848)

```text
- screen/movie/happyDay/voiceoverPrompt [2532:12848] FRAME xy(2220,6500) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2605:105704] FRAME xy(0,144) 1920×936 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=20/72/36/72
    - layout/03 [2605:105705] FRAME xy(72,20) 1776×804 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=16/16/16/16
    - Frame 83 [2605:105717] FRAME xy(72,860) 1776×40 layout=HORIZONTAL sizing=FILL/HUG positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/549/0/549
  - layout/popup [2605:105126] FRAME xy(0,0) 1920×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=SCALE/SCALE gap=0 padding(T/R/B/L)=0/0/0/0
    - dialog/voiceoverPrompt [2605:105127] INSTANCE xy(654,339) 612×402 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/CENTER gap=20 padding(T/R/B/L)=36/36/36/36
    - control/storyButton [2605:105128] INSTANCE xy(1196,328) 96×96 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=CENTER/CENTER gap=0 padding(T/R/B/L)=0/0/0/0
  - character/tuantuan/scene [2532:12869] INSTANCE xy(0,0) 646×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2532:12869;2389:21704] INSTANCE xy(0,515.925) 564.075×564.075 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
  - navigation/topBar [2532:12863] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2532:12864] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2532:12867] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2532:12866] INSTANCE xy(706,44) 492×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 男孩
- 就绪
- 小猫
- 红风筝
- 第 2 幕
- 正在拍摄……
- 给你的电影配音吧！
- 看着画面，把你的故事讲给大家听
- 先不配
- 开始配音
- x
- 6
- 2

### screen/movie/happyDay/preview

- 主节点：[2413:28397](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2413-28397)

```text
- screen/movie/happyDay/preview [2413:28397] FRAME xy(4340,6500) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=161/0/0/0
  - layout/mainContent [2413:28398] FRAME xy(0,161) 1920×919 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/CENTER gap=36 padding(T/R/B/L)=20/72/36/72
    - layout/previewStage [2413:28827] FRAME xy(72,20) 1776×737 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=0/0/0/0
    - layout/sceneTimeline [2413:28826] FRAME xy(72,793) 1776×90 layout=HORIZONTAL sizing=FILL/HUG positioning=AUTO constraints=MIN/MIN gap=24 padding(T/R/B/L)=0/72/0/72
  - character/tuantuan/scene [2413:28418] INSTANCE xy(0,241) 418×699 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2413:28418;2389:21704] INSTANCE xy(0,334.01) 364.99×364.99 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
  - navigation/topBar [2413:28412] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2413:28413] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2413:28416] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2413:28415] INSTANCE xy(706,44) 492×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 重播
- 第一幕
- 第二幕
- 第三幕
- 第四幕
- x
- 6
- 2

### screen/story/happyDay/narration/listening

- 主节点：[2351:9892](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-9892)

```text
- screen/story/happyDay/narration/listening [2351:9892] FRAME xy(2220,2660) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2413:15580] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/SCALE gap=0 padding(T/R/B/L)=20/48/36/48
    - layout/characterScene [2413:15581] FRAME xy(48,20) 601.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/0/0
    - layout/narrationColumn [2413:15584] FRAME xy(649.333,20) 621.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=0/20/0/0
    - layout/storybookColumn [2413:16147] FRAME xy(1270.667,20) 601.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/36/0
  - character/tuantuan/scene [2389:21734] INSTANCE xy(0,0) 646×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2389:21734;2389:21704] INSTANCE xy(0,515.925) 564.075×564.075 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/characterSpeech [I2389:21734;2389:21900] FRAME xy(248.78,461.36) 302.12×93.36 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/CENTER gap=4.08 padding(T/R/B/L)=13.6/24.48/13.6/24.48
  - navigation/topBar [2351:9893] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=432 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2351:9894] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2351:9897] FRAME xy(1528,12) 392×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2351:9896] INSTANCE xy(706,44) 508×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/CENTER gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 有男孩，还有小猫
- 男孩先跑来跑去地玩，然后一口气跑回了家。
- ……
- 正在听你说话
- 故事本
- 认识故事
- 谁
- Info
- 在哪里
- 发生了什么
- 理清故事发展
- 做了什么
- 为什么
- 让故事走到结局
- 后来呢？
- 男孩和小猫在什么地方呀？
- 团团
- x
- 6
- 2

### screen/story/happyDay/narration/storyExpanded

- 主节点：[2351:10400](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2351-10400)

```text
- screen/story/happyDay/narration/storyExpanded [2351:10400] FRAME xy(4340,2660) 1920×1080 layout=VERTICAL sizing=FIXED/FIXED positioning=AUTO constraints=MIN/MIN gap=0 padding(T/R/B/L)=144/0/0/0
  - layout/mainContent [2413:15952] FRAME xy(0,144) 1920×936 layout=HORIZONTAL sizing=FILL/FILL positioning=AUTO constraints=CENTER/SCALE gap=0 padding(T/R/B/L)=20/48/36/48
    - layout/characterScene [2413:15953] FRAME xy(48,20) 601.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/0/0
    - layout/narrationColumn [2413:15956] FRAME xy(649.333,20) 621.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=0/20/0/0
    - layout/storybookColumn [2413:16149] FRAME xy(1270.667,20) 601.333×880 layout=VERTICAL sizing=FILL/FILL positioning=AUTO constraints=MIN/MIN gap=10 padding(T/R/B/L)=0/0/36/0
  - character/tuantuan/scene [2389:21742] INSTANCE xy(0,0) 646×1080 layout=NONE sizing=FIXED/FIXED positioning=ABSOLUTE constraints=MIN/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - character/tuantuan/animation [I2389:21742;2389:21704] INSTANCE xy(0,515.925) 564.075×564.075 layout=NONE sizing=FIXED/FIXED positioning=AUTO constraints=SCALE/MAX gap=0 padding(T/R/B/L)=0/0/0/0
    - layout/characterSpeech [I2389:21742;2389:21900] FRAME xy(309.78,475.86) 180.12×64.36 layout=VERTICAL sizing=HUG/HUG positioning=AUTO constraints=CENTER/CENTER gap=4.08 padding(T/R/B/L)=13.6/24.48/13.6/24.48
  - navigation/topBar [2351:10401] FRAME xy(0,0) 1920×168 layout=HORIZONTAL sizing=FIXED/HUG positioning=ABSOLUTE constraints=STRETCH/MIN gap=433 padding(T/R/B/L)=0/0/0/0
    - layout/brand [2351:10402] FRAME xy(0,0) 168×168 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - layout/resourceBar [2351:10405] FRAME xy(1530,12) 390×144 layout=HORIZONTAL sizing=HUG/HUG positioning=AUTO constraints=MIN/MIN gap=36 padding(T/R/B/L)=36/36/36/36
    - progress/storyStepProgress [2351:10404] INSTANCE xy(706,44) 508×80 layout=HORIZONTAL sizing=HUG/HUG positioning=ABSOLUTE constraints=CENTER/MIN gap=6 padding(T/R/B/L)=12/24/12/24
```

当前可见活文本文案（去重，保留占位）：

- 有男孩，还有小猫
- 男孩先跑来跑去地玩，然后一口气跑回了家。
- 小猫静静地躺在阳光里，偶尔眨眨眼睛。
- 男孩抱起小猫，轻声对它讲述今天的冒险故事。
- 按住说话
- 故事本
- 认识故事
- 谁
- Info
- 在哪里
- 发生了什么
- 理清故事发展
- 先后
- 为什么
- 让故事走到结局
- 后来呢？
- 我知道啦！
- 团团
- x
- 6
- 2

## F. 当前原型连线

这是原型事实记录，不是正式业务契约。CHANGE_TO 表示组件变体变化，不是页面路由；BACK 表示回退；重复的 action/actions 已合并为一条语义动作。目标ID为null或不在19页列表内的，可能为变体/历史按压演示，不应自动生成一个新页面。

| 来源页面 | 控件/节点 | 触发 | 动作 | 目标 | 转场 |
| --- | --- | --- | --- | --- | --- |
| screen/home/title | control/storyButton [2340:9458] | ON_PRESS | CHANGE_TO | 未解析页面名称 [2040:8342] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/home/title | control/storyButton [2340:9458] | ON_CLICK | NAVIGATE | screen/map/storyIsland [2033:6691] | 无 |
| screen/home/title | artwork/button/storyBackground [I2340:9458;2009:4457] | ON_CLICK | NAVIGATE | screen/map/storyIsland [2033:6691] | 无 |
| screen/home/title | resource/statusBar [2020:9269] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/home/title | control/storyButton [2020:10309] | ON_CLICK | NAVIGATE | screen/collection/stickersAndMovies [2540:14893] | 无 |
| screen/map/storyIsland | map/islandMarker [2040:8267] | ON_CLICK | NAVIGATE | screen/map/myTown/overview [2040:9114] | 无 |
| screen/map/storyIsland | control/storyButton [2322:11156] | ON_CLICK | NAVIGATE | screen/map/storyIsland [2033:6691] | 无 |
| screen/map/storyIsland | resource/statusBar [2322:11159] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/map/storyIsland | control/storyButton [2322:11160] | ON_CLICK | NAVIGATE | screen/collection/stickersAndMovies [2540:14893] | 无 |
| screen/map/myTown/overview | map/chapterNode [2044:10689] | ON_CLICK | NAVIGATE | screen/map/myTown/levelSelected [2335:11984] | 无 |
| screen/map/myTown/overview | control/storyButton [2045:12518] | ON_CLICK | NAVIGATE | screen/map/storyIsland [2033:6691] | 无 |
| screen/map/myTown/overview | resource/statusBar [2040:9126] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/map/myTown/overview | control/storyButton [2040:9127] | ON_CLICK | NAVIGATE | screen/collection/stickersAndMovies [2540:14893] | 无 |
| screen/map/myTown/levelSelected | map/chapterNode [2413:12493] | ON_CLICK | NAVIGATE | screen/map/myTown/levelSelected [2335:11984] | 无 |
| screen/map/myTown/levelSelected | control/storyButton [I2335:12386;2413:16150] | ON_CLICK | NAVIGATE | screen/story/happyDay/sceneSelection [2064:6613] | 无 |
| screen/map/myTown/levelSelected | control/storyButton [2335:12001] | ON_CLICK | NAVIGATE | screen/map/storyIsland [2033:6691] | 无 |
| screen/map/myTown/levelSelected | resource/statusBar [2335:12004] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/map/myTown/levelSelected | control/storyButton [2335:12005] | ON_CLICK | NAVIGATE | screen/collection/stickersAndMovies [2540:14893] | 无 |
| screen/story/happyDay/sceneSelection | scene/locationSelectionCard [2160:7826] | ON_CLICK | CHANGE_TO | scene/locationSelectionCard / state=default [2330:8477] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/sceneSelection | control/storyButton [I2160:7826;2160:7797] | ON_PRESS | CHANGE_TO | 未解析页面名称 [2330:11775] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/sceneSelection | control/storyButton [I2160:7826;2160:7797] | ON_CLICK | NAVIGATE | screen/story/happyDay/composition [2330:10588] | 无 |
| screen/story/happyDay/sceneSelection | scene/locationSelectionCard [2311:6682] | ON_CLICK | CHANGE_TO | scene/locationSelectionCard / state=selected [2160:7796] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/sceneSelection | scene/locationSelectionCard [2330:8274] | ON_CLICK | CHANGE_TO | scene/locationSelectionCard / state=selected [2160:7796] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/sceneSelection | scene/locationSelectionCard [2330:8289] | ON_CLICK | CHANGE_TO | scene/locationSelectionCard / state=selected [2160:7796] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/sceneSelection | control/storyButton [2175:8107] | ON_CLICK | NAVIGATE | screen/map/myTown/levelSelected [2335:11984] | 无 |
| screen/story/happyDay/sceneSelection | resource/statusBar [2175:8116] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/story/happyDay/composition | control/storyButton [I2413:13357;2340:12239] | ON_CLICK | NAVIGATE | screen/story/happyDay/stickerGeneration [2413:14485] | DISSOLVE 0.3s EASE_OUT |
| screen/story/happyDay/composition | control/storyButton [I2413:13357;2330:11758] | ON_PRESS | CHANGE_TO | — | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/composition | control/storyButton [I2413:13357;2330:11758] | ON_CLICK | NAVIGATE | screen/story/happyDay/narration/idle [2348:8165] | 无 |
| screen/story/happyDay/composition | navigation/storyBookmark [I2413:13357;2413:14402] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=default [2342:12337] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/composition | navigation/storyBookmark [I2413:13357;2413:14403] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/composition | navigation/storyBookmark [I2413:13357;2413:14404] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/composition | navigation/storyBookmark [I2413:13357;2413:14405] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/composition | navigation/storyBookmark [I2413:13357;2413:14406] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/composition | control/storyButton [2330:10596] | ON_CLICK | NAVIGATE | screen/story/happyDay/sceneSelection [2064:6613] | 无 |
| screen/story/happyDay/composition | resource/statusBar [2330:10599] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/story/happyDay/stickerGeneration | control/storyButton [I2413:14496;2330:11758] | ON_PRESS | CHANGE_TO | — | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/stickerGeneration | control/storyButton [I2413:14496;2330:11758] | ON_CLICK | NAVIGATE | screen/story/happyDay/narration/idle [2348:8165] | 无 |
| screen/story/happyDay/stickerGeneration | navigation/storyBookmark [I2413:14496;2413:14402] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=default [2342:12337] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/stickerGeneration | navigation/storyBookmark [I2413:14496;2413:14403] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/stickerGeneration | navigation/storyBookmark [I2413:14496;2413:14404] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/stickerGeneration | navigation/storyBookmark [I2413:14496;2413:14405] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/stickerGeneration | navigation/storyBookmark [I2413:14496;2413:14406] | ON_CLICK | CHANGE_TO | navigation/storyBookmark / state=selected [2344:12479] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/stickerGeneration | control/micButton [I2413:14972;2344:13267;2379:11728] | ON_PRESS | CHANGE_TO | dialog/stickerGenerator / state=listening [2379:11855] | DISSOLVE 0.3s EASE_OUT |
| screen/story/happyDay/stickerGeneration | control/storyButton [2413:14488] | ON_CLICK | NAVIGATE | screen/story/happyDay/sceneSelection [2064:6613] | 无 |
| screen/story/happyDay/stickerGeneration | resource/statusBar [2413:14491] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/story/happyDay/narration/idle | control/micButton [2351:8769] | ON_PRESS | NAVIGATE | screen/story/happyDay/narration/listening [2351:9892] | DISSOLVE 0.3s EASE_OUT |
| screen/story/happyDay/narration/idle | story/storybookPage [2353:13280] | ON_CLICK | NAVIGATE | screen/story/happyDay/narration/storyExpanded [2351:10400] | 无 |
| screen/story/happyDay/narration/idle | control/storyButton [2348:8170] | ON_CLICK | NAVIGATE | screen/story/happyDay/composition [2330:10588] | 无 |
| screen/story/happyDay/narration/idle | resource/statusBar [2348:8173] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/story/happyDay/narration/complete | layout/frame59 [I2413:17506;2413:25278] | ON_CLICK | NAVIGATE | screen/story/happyDay/storyEdit [2382:11040] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/narration/complete | control/storyButton [I2413:17506;2413:25201] | ON_PRESS | CHANGE_TO | 未解析页面名称 [2040:8342] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/narration/complete | control/storyButton [2351:11104] | ON_CLICK | NAVIGATE | screen/story/happyDay/narration/storyExpanded [2351:10400] | SLIDE_IN 0.3s EASE_OUT |
| screen/story/happyDay/narration/complete | resource/statusBar [2351:11107] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/story/happyDay/storyEdit | story/editableContent [I2605:103433;2389:20714] | AFTER_TIMEOUT 0.8s | CHANGE_TO | story/editableContent / state=selected [2389:20705] | DISSOLVE 0.3s EASE_OUT |
| screen/story/happyDay/storyEdit | story/editableContent [I2605:103433;2389:20714] | ON_CLICK | CHANGE_TO | story/editableContent / state=editing [2389:23367] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/storyEdit | control/storyButton [I2605:103433;2396:12493] | ON_PRESS | CHANGE_TO | — | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/storyEdit | control/storyButton [I2605:103433;2396:12493] | ON_CLICK | NAVIGATE | screen/movie/happyDay/filming [2413:27265] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/storyEdit | control/storyButton [2382:11043] | ON_CLICK | NAVIGATE | screen/story/happyDay/narration/complete [2351:11101] | 无 |
| screen/story/happyDay/storyEdit | resource/statusBar [2382:11046] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/movie/happyDay/filming | A 舞台布景 · 独立图片 [2413:27755] | ON_CLICK | NAVIGATE | screen/movie/happyDay/voiceoverPrompt [2532:12848] | 无 |
| screen/movie/happyDay/filming | control/storyButton [2413:27271] | ON_CLICK | NAVIGATE | screen/story/happyDay/storyEdit [2382:11040] | 无 |
| screen/movie/happyDay/filming | resource/statusBar [2413:27274] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/level/happyDay/results | control/storyButton [2540:28631] | ON_CLICK | NAVIGATE | screen/collection/stickersAndMovies [2540:14893] | 无 |
| screen/level/happyDay/results | control/storyButton [2540:24554] | ON_CLICK | NAVIGATE | screen/map/myTown/levelSelected [2335:11984] | 无 |
| screen/level/happyDay/results | resource/statusBar [2540:13218] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/level/happyDay/results | control/storyButton [2540:24486] | ON_CLICK | NAVIGATE | screen/collection/stickersAndMovies [2540:14893] | 无 |
| screen/collection/stickersAndMovies | control/storyButton [2540:21399] | ON_CLICK | NAVIGATE | screen/collection/stickerGeneration [2540:21479] | 无 |
| screen/collection/stickersAndMovies | media/movieCard [2540:21333] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickersAndMovies | media/movieCard [2540:21350] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickersAndMovies | media/movieCard [2540:21359] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickersAndMovies | media/movieCard [2540:21368] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickersAndMovies | media/movieCard [2540:21377] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickersAndMovies | media/movieCard [2540:21386] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickersAndMovies | control/storyButton [2540:15108] | ON_CLICK | BACK | — | 无 |
| screen/collection/stickersAndMovies | resource/statusBar [2540:15111] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/collection/moviePlayer | Group 9 [2540:22704] | ON_CLICK | BACK | — | 无 |
| screen/collection/moviePlayer | control/storyButton [2540:21995] | ON_CLICK | BACK | — | 无 |
| screen/collection/moviePlayer | resource/statusBar [2540:21998] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/collection/stickerGeneration | control/storyButton [2605:105847] | ON_CLICK | NAVIGATE | screen/collection/stickerGeneration [2540:21479] | 无 |
| screen/collection/stickerGeneration | media/movieCard [2605:105874] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickerGeneration | media/movieCard [2605:105875] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickerGeneration | media/movieCard [2605:105876] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickerGeneration | media/movieCard [2605:105877] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickerGeneration | media/movieCard [2605:105878] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickerGeneration | media/movieCard [2605:105879] | ON_CLICK | NAVIGATE | screen/collection/moviePlayer [2540:21912] | 无 |
| screen/collection/stickerGeneration | control/micButton [I2605:106149;2344:13267;2379:11728] | ON_PRESS | CHANGE_TO | dialog/stickerGenerator / state=listening [2379:11855] | DISSOLVE 0.3s EASE_OUT |
| screen/collection/stickerGeneration | control/storyButton [2540:21562] | ON_CLICK | BACK | — | 无 |
| screen/collection/stickerGeneration | resource/statusBar [2540:21565] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/movie/happyDay/voiceoverPrompt | A 舞台布景 · 独立图片 [2605:105706] | ON_CLICK | NAVIGATE | screen/movie/happyDay/voiceoverPrompt [2532:12848] | 无 |
| screen/movie/happyDay/voiceoverPrompt | control/storyButton [I2605:105127;2542:29531] | ON_CLICK | NAVIGATE | screen/level/happyDay/results [2540:13198] | DISSOLVE 0.3s EASE_OUT |
| screen/movie/happyDay/voiceoverPrompt | control/storyButton [I2605:105127;2542:29461] | ON_CLICK | NAVIGATE | screen/movie/happyDay/preview [2413:28397] | DISSOLVE 0.3s EASE_OUT |
| screen/movie/happyDay/voiceoverPrompt | control/storyButton [2532:12865] | ON_CLICK | NAVIGATE | screen/movie/happyDay/filming [2413:27265] | 无 |
| screen/movie/happyDay/voiceoverPrompt | resource/statusBar [2532:12868] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/movie/happyDay/preview | media/sceneTimelineItem [2413:28823] | ON_CLICK | NAVIGATE | screen/level/happyDay/results [2540:13198] | 无 |
| screen/movie/happyDay/preview | control/storyButton [2413:28414] | ON_CLICK | NAVIGATE | screen/movie/happyDay/filming [2413:27265] | 无 |
| screen/movie/happyDay/preview | resource/statusBar [2413:28417] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/story/happyDay/narration/listening | control/micButton [2413:15589] | MOUSE_UP | NAVIGATE | screen/story/happyDay/narration/idle [2348:8165] | DISSOLVE 0.3s EASE_OUT |
| screen/story/happyDay/narration/listening | story/storybookPage [2413:15591] | ON_CLICK | NAVIGATE | screen/story/happyDay/narration/storyExpanded [2351:10400] | 无 |
| screen/story/happyDay/narration/listening | control/storyButton [2351:9895] | ON_CLICK | NAVIGATE | screen/story/happyDay/composition [2330:10588] | 无 |
| screen/story/happyDay/narration/listening | resource/statusBar [2351:9898] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |
| screen/story/happyDay/narration/storyExpanded | screen/story/happyDay/narration/storyExpanded [2351:10400] | AFTER_TIMEOUT 0.8s | NAVIGATE | screen/story/happyDay/narration/complete [2351:11101] | DISSOLVE 0.3s EASE_OUT |
| screen/story/happyDay/narration/storyExpanded | control/micButton [2413:15961] | ON_PRESS | NAVIGATE | screen/story/happyDay/narration/listening [2351:9892] | SMART_ANIMATE 0.3s EASE_OUT |
| screen/story/happyDay/narration/storyExpanded | control/storyButton [2351:10403] | ON_CLICK | NAVIGATE | screen/story/happyDay/composition [2330:10588] | 无 |
| screen/story/happyDay/narration/storyExpanded | resource/statusBar [2351:10406] | ON_CLICK | CHANGE_TO | resource/statusBar / state=walletOpen [2540:15539] | 无 |

### F1. 组件内部交互

| 主组件/变体 | 控件 | 触发 | 等待 | 动作 | 目标 | 转场 |
| --- | --- | --- | --- | --- | --- | --- |
| 2160:7796 / state=selected | 2160:7796 / state=selected | ON_CLICK | — | CHANGE_TO | scene/locationSelectionCard / state=default | SMART_ANIMATE 0.3s |
| 2160:7796 / state=selected | 2160:7797 / control/storyButton | ON_PRESS | — | CHANGE_TO | 2330:11775 | SMART_ANIMATE 0.3s |
| 2330:8477 / state=default | 2330:8477 / state=default | ON_CLICK | — | CHANGE_TO | scene/locationSelectionCard / state=selected | SMART_ANIMATE 0.3s |
| 2413:13102 / navigation/sidebar | 2330:11758 / control/storyButton | ON_PRESS | — | CHANGE_TO | null | SMART_ANIMATE 0.3s |
| 2413:13102 / navigation/sidebar | 2330:11758 / control/storyButton | ON_CLICK | — | NAVIGATE | screen/story/happyDay/narration/idle | 无 |
| 2413:13102 / navigation/sidebar | 2413:14402 / navigation/storyBookmark | ON_CLICK | — | CHANGE_TO | navigation/storyBookmark / state=default | SMART_ANIMATE 0.3s |
| 2413:13102 / navigation/sidebar | 2413:14403 / navigation/storyBookmark | ON_CLICK | — | CHANGE_TO | navigation/storyBookmark / state=selected | SMART_ANIMATE 0.3s |
| 2413:13102 / navigation/sidebar | 2413:14404 / navigation/storyBookmark | ON_CLICK | — | CHANGE_TO | navigation/storyBookmark / state=selected | SMART_ANIMATE 0.3s |
| 2413:13102 / navigation/sidebar | 2413:14405 / navigation/storyBookmark | ON_CLICK | — | CHANGE_TO | navigation/storyBookmark / state=selected | SMART_ANIMATE 0.3s |
| 2413:13102 / navigation/sidebar | 2413:14406 / navigation/storyBookmark | ON_CLICK | — | CHANGE_TO | navigation/storyBookmark / state=selected | SMART_ANIMATE 0.3s |
| 2342:12337 / state=default | 2342:12337 / state=default | ON_CLICK | — | CHANGE_TO | navigation/storyBookmark / state=selected | SMART_ANIMATE 0.3s |
| 2344:12479 / state=selected | 2344:12479 / state=selected | ON_CLICK | — | CHANGE_TO | navigation/storyBookmark / state=default | SMART_ANIMATE 0.3s |
| 2389:20703 / state=default | 2389:20703 / state=default | AFTER_TIMEOUT | 0.8s | CHANGE_TO | story/editableContent / state=selected | DISSOLVE 0.3s |
| 2389:20703 / state=default | 2389:20703 / state=default | ON_CLICK | — | CHANGE_TO | story/editableContent / state=editing | SMART_ANIMATE 0.3s |
| 2389:23367 / state=editing | 2389:23367 / state=editing | ON_CLICK | — | CHANGE_TO | story/editableContent / state=default | 无 |
| 2389:20705 / state=selected | 2389:20705 / state=selected | AFTER_TIMEOUT | 0.8s | CHANGE_TO | story/editableContent / state=default | SMART_ANIMATE 0.3s |
| 2389:20705 / state=selected | 2389:20705 / state=selected | ON_CLICK | — | CHANGE_TO | story/editableContent / state=editing | SMART_ANIMATE 0.3s |
| 2353:12068 / mode=summary | 2413:25201 / control/storyButton | ON_PRESS | — | CHANGE_TO | 2040:8342 | SMART_ANIMATE 0.3s |
| 2353:13276 / mode=collect | 2353:13276 / mode=collect | ON_CLICK | — | NAVIGATE | screen/story/happyDay/narration/storyExpanded | 无 |
| 2389:20323 / mode=edit | 2389:20714 / story/editableContent | AFTER_TIMEOUT | 0.8s | CHANGE_TO | story/editableContent / state=selected | DISSOLVE 0.3s |
| 2389:20323 / mode=edit | 2389:20714 / story/editableContent | ON_CLICK | — | CHANGE_TO | story/editableContent / state=editing | SMART_ANIMATE 0.3s |
| 2389:20323 / mode=edit | 2396:12493 / control/storyButton | ON_PRESS | — | CHANGE_TO | 2330:11775 | SMART_ANIMATE 0.3s |
| 2344:13266 / state=idle | 2379:11728 / control/micButton | ON_PRESS | — | CHANGE_TO | dialog/stickerGenerator / state=listening | DISSOLVE 0.3s |
| 2379:11855 / state=listening | 2379:11864 / control/micButton | MOUSE_UP | — | CHANGE_TO | dialog/stickerGenerator / state=generated | DISSOLVE 0.3s |
| 2379:11887 / state=generated | 2379:11914 / control/storyButton | ON_PRESS | — | CHANGE_TO | 2040:8342 | SMART_ANIMATE 0.3s |
| 2379:11887 / state=generated | 2379:11914 / control/storyButton | ON_CLICK | — | NAVIGATE | screen/story/happyDay/composition | 无 |
| 2379:11887 / state=generated | 2379:11935 / control/storyButton | ON_CLICK | — | CHANGE_TO | dialog/stickerGenerator / state=idle | DISSOLVE 0.3s |
| 2020:8765 / state=default | 2020:8765 / state=default | ON_CLICK | — | CHANGE_TO | resource/statusBar / state=walletOpen | 无 |
| 2540:15539 / state=walletOpen | 2540:15539 / state=walletOpen | ON_CLICK | — | CHANGE_TO | resource/statusBar / state=default | 无 |
| 2330:11770 / variant=heroSmall, state=default, size=default | 2330:11770 / variant=heroSmall, state=default, size=default | ON_PRESS | — | CHANGE_TO | 2330:11775 | SMART_ANIMATE 0.3s |
| 2009:4479 / variant=hero, state=default, size=default | 2009:4479 / variant=hero, state=default, size=default | ON_PRESS | — | CHANGE_TO | 2040:8342 | SMART_ANIMATE 0.3s |

## G. 动效原始参数索引

扫描结果：23个非实例派生节点、60条animation styles；未读到manual keyframe tracks。下表时间单位为秒，显示值四舍五入到3位；完整原始精度保存在同目录JSON快照中。amount、start、end均保留Figma字段语义，不能不经确认统一解释为CSS像素。颜色/图片本身的动画未在这里自动补造。

| 页面 | timeline时长(s) |
| --- | --- |
| screen/home/title | 2.5 |
| screen/map/storyIsland | 0.999055 |
| screen/map/myTown/overview | 0.999055 |
| screen/map/myTown/levelSelected | 0.999055 |
| screen/story/happyDay/sceneSelection | 0.999055 |
| screen/story/happyDay/composition | 0.999055 |
| screen/story/happyDay/stickerGeneration | 0.999055 |
| screen/story/happyDay/narration/idle | 0.999055 |
| screen/story/happyDay/narration/complete | 0.999055 |
| screen/story/happyDay/storyEdit | 0.999055 |
| screen/movie/happyDay/filming | 0.999055 |
| screen/level/happyDay/results | 8 |
| screen/collection/stickersAndMovies | 0.999055 |
| screen/collection/moviePlayer | 0.999055 |
| screen/collection/stickerGeneration | 0.999055 |
| screen/movie/happyDay/voiceoverPrompt | 0.999055 |
| screen/movie/happyDay/preview | 0.999055 |
| screen/story/happyDay/narration/listening | 0.999055 |
| screen/story/happyDay/narration/storyExpanded | 0.999055 |

| 节点 | 效果 | offset | duration | props | easing |
| --- | --- | --- | --- | --- | --- |
| map/islandMarker [2040:8267] | scaleOut | 0 | 0.5 | amount=105; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.85,0.3,1) |
| map/islandMarker [2040:8267] | scaleIn | 0.5 | 0.5 | amount=105; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.5,0,0.5,1) |
| layout/storyStepIndicator [2542:28666] | slide_out | 4.004 | 0.996 | distance=60; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.5,0,0.7,0.7) |
| layout/storyStepIndicator [2542:28666] | scaleOut | 4.303 | 0.697 | amount=80; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.5,0,0.7,0.7) |
| layout/storyStepIndicator [2542:28666] | fadeOut | 4.502 | 0.498 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.6,0,0.5,0.9) |
| control/iconSlot [2540:24143] | slide_in | 0.739 | 0.3 | distance=116; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24143] | scaleIn | 0.739 | 0.3 | amount=80; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24143] | rotateIn | 0.739 | 0.3 | direction=clockwise; amount=90; start=180; end=0 | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24143] | fadeIn | 0.739 | 0.03 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.5,0,0.5,1) |
| control/iconSlot [2540:24123] | slide_in | 0 | 0.3 | distance=116; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24123] | scaleIn | 0 | 0.3 | amount=80; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24123] | rotateIn | 0 | 0.3 | direction=clockwise; amount=90; start=180; end=0 | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24123] | fadeIn | 0 | 0.03 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.5,0,0.5,1) |
| control/iconSlot [2540:24154] | slide_in | 1.19 | 0.3 | distance=116; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24154] | scaleIn | 1.19 | 0.3 | amount=80; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24154] | rotateIn | 1.19 | 0.3 | direction=clockwise; amount=90; start=180; end=0 | cubic-bezier(0.07,0.97,0.58,1) |
| control/iconSlot [2540:24154] | fadeIn | 1.19 | 0.03 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.5,0,0.5,1) |
| layout/frame80 [2542:31399] | slide_in | 5.496 | 0.3 | distance=116; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.07,0.97,0.58,1) |
| layout/frame80 [2542:31399] | scaleIn | 5.496 | 0.3 | amount=80; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.07,0.97,0.58,1) |
| layout/frame80 [2542:31399] | rotateIn | 5.496 | 0.3 | direction=clockwise; amount=90; start=180; end=0 | cubic-bezier(0.07,0.97,0.58,1) |
| layout/frame80 [2542:31399] | fadeIn | 5.496 | 0.03 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.5,0,0.5,1) |
| sticker/stickerSlot [2542:31130] | scaleIn | 4.423 | 0.9 | amount=0; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.4,1.75,0.3,1) |
| layout/storyPrompts [2542:32984] | fadeIn | 5.97 | 0.5 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0,0,0.58,1) |
| control/storyButton [2540:28631] | slide_in | 3 | 1 | distance=20; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.3,-1.2,0.45,1) |
| control/storyButton [2540:28631] | scaleIn | 3 | 0.78 | amount=60; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.52,0.5,1) |
| control/storyButton [2540:28631] | fadeIn | 3 | 0.4 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.09,0.55,0.5,1) |
| control/storyButton [2540:24554] | slide_in | 3.38 | 1 | distance=20; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.3,-1.2,0.45,1) |
| control/storyButton [2540:24554] | scaleIn | 3.38 | 0.78 | amount=60; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.52,0.5,1) |
| control/storyButton [2540:24554] | fadeIn | 3.38 | 0.4 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.09,0.55,0.5,1) |
| layout/resourceCounter [2542:31137] | slide_in | 4.544 | 1 | distance=30; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.05,0.4,0.5,1) |
| layout/resourceCounter [2542:31137] | fadeIn | 4.544 | 0.4 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.5,0,0.5,1) |
| layout/resourceCounter [2542:31137] | slide_out | 5.72 | 1.5 | distance=60; axis=xy; startX=200; direction=top; startY=200; endX=0; endY=0 | cubic-bezier(0.5,0,0.7,0.7) |
| layout/resourceCounter [2542:31137] | scaleOut | 6.17 | 1.05 | amount=80; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.5,0,0.7,0.7) |
| layout/resourceCounter [2542:31137] | fadeOut | 6.47 | 0.75 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.6,0,0.5,0.9) |
| layout/moviePlayerOverlay [2540:22311] | slide_in | 0 | 1 | distance=20; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.3,-1.2,0.45,1) |
| layout/moviePlayerOverlay [2540:22311] | scaleIn | 0 | 0.78 | amount=60; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.52,0.5,1) |
| layout/moviePlayerOverlay [2540:22311] | fadeIn | 0 | 0.4 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.09,0.55,0.5,1) |
| control/iconSlot [2040:8633] | slide_out | 0 | 1 | distance=10; axis=xy; startX=200; direction=top; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| control/iconSlot [2040:8633] | slide_out | 1 | 1 | distance=10; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| control/iconSlot [2389:22312] | slide_out | 0 | 1 | distance=10; axis=xy; startX=200; direction=top; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| control/iconSlot [2389:22312] | slide_out | 1 | 1 | distance=10; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| control/iconSlot [2330:6714] | scaleOut | 0 | 0.3 | amount=120; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.85,0.3,1) |
| control/iconSlot [2330:6714] | scaleIn | 0.3 | 0.3 | amount=120; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.5,0,0.5,1) |
| map/chapterBadgeBase [2044:10985] | slide_out | 0 | 1 | distance=10; axis=xy; startX=200; direction=top; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| map/chapterBadgeBase [2044:10985] | slide_out | 1 | 1 | distance=10; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| map/chapterBadgeBase [2045:12669] | slide_out | 0 | 1 | distance=10; axis=xy; startX=200; direction=top; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| map/chapterBadgeBase [2045:12669] | slide_out | 1 | 1 | distance=10; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.37,0,0.63,1) |
| control/iconSlot [2340:10474] | scaleOut | 0 | 0.3 | amount=120; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.85,0.3,1) |
| control/iconSlot [2340:10474] | scaleIn | 0.3 | 0.3 | amount=120; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.5,0,0.5,1) |
| sticker/rainbow [2340:12203] | rotateOut | 0 | 1 | direction=clockwise; amount=6; start=180; end=0 | spring {"bounce":0.7923651163750196} |
| sticker/rainbow [2340:12214] | rotateOut | 0 | 1 | direction=clockwise; amount=6; start=180; end=0 | spring {"bounce":0.7923651163750196} |
| control/iconSlot [2372:21452] | slide_in | -0.002 | 0.504 | distance=20; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.3,-1.2,0.45,1) |
| control/iconSlot [2372:21452] | scaleIn | -0.002 | 0.393 | amount=60; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.52,0.5,1) |
| control/iconSlot [2372:21452] | fadeIn | -0.002 | 0.201 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.09,0.55,0.5,1) |
| control/iconSlot [2372:21545] | slide_in | 0.094 | 0.504 | distance=20; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.3,-1.2,0.45,1) |
| control/iconSlot [2372:21545] | scaleIn | 0.094 | 0.393 | amount=60; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.52,0.5,1) |
| control/iconSlot [2372:21545] | fadeIn | 0.094 | 0.201 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.09,0.55,0.5,1) |
| control/iconSlot [2372:21639] | slide_in | 0.201 | 0.504 | distance=20; axis=xy; startX=200; direction=bottom; startY=200; endX=0; endY=0 | cubic-bezier(0.3,-1.2,0.45,1) |
| control/iconSlot [2372:21639] | scaleIn | 0.201 | 0.393 | amount=60; wStartWithDivider=120; hStartWithDivider=120; hStartWithoutDivider=120; wEndWithDivider=100; wEndWithoutDivider=100; hEndWithoutDivider=100; axis=whCombined | cubic-bezier(0.15,0.52,0.5,1) |
| control/iconSlot [2372:21639] | fadeIn | 0.201 | 0.201 | startFrame=0; endFrame=100; amount=0 | cubic-bezier(0.09,0.55,0.5,1) |

## H. 图片资产引用索引

共57个唯一imageHash；当前使用尺寸不是源图片像素尺寸。优先从语义组件/具体页面实例导出；I开头的ID表示实例内部节点，包含覆盖后的实际内容。相同hash可复用文件，但图标/贴纸的业务ID不因此合并。表中name可能沿用生成文件名，应在代码资产manifest中改用语义名称。

| imageHash | 样例节点ID | 样例名称 | 使用尺寸 | scaleMode | 引用次数 |
| --- | --- | --- | --- | --- | --- |
| 52bc07c90336fe9cf03392def90f2cebb7b6c732 | 2020:4451 | screen/home/title | 1920 × 1080 | FILL | 2 |
| 63a9835851ce68d96e143f80c5d8f584916112db | 2033:4703 | exec-2805e2de-fd99-4a26-bfcb-625739dcc22d 1 | 321 × 289.41 | FILL | 1 |
| bdb9c86f6014c2ec837ce75ad5c493c4b48d79f5 | 2033:6689 | exec-6083f655-6877-4e26-ba15-85a54295aa7d 1 | 459 × 306 | FILL | 1 |
| eb3dcd712b3f0172d12ddbe8cf4f11a14061020b | I2389:21787;2379:12478 | Idle 1 | 534 × 534 | FILL | 8 |
| b45d5f9dd751c7248b21ca3abcd9d104c49c7c3b | 2033:6691 | screen/map/storyIsland | 1920 × 1080 | FILL | 1 |
| 8a34236d9b12c9e956dbc53267217b271bf5799d | 2039:8209 | 岛屿图标_0000s_0002_一句话大王-默认 1 | 360 × 360 | FILL | 3 |
| 9771776900e810d61461628bdfe5ac4ccdc06502 | 2040:8241 | 岛屿图标_0003s_0000_我的小镇-默认-拷贝 1 | 360 × 360 | FILL | 2 |
| c13e761edce3d1978a61547ef221776cbc7154db | 2040:8233 | 岛屿图标_0002s_0000_笑脸村-默认-拷贝-2 1 | 360 × 360 | FILL | 2 |
| 2afa8f7438a39994f7c5ccad83377445b936be2c | 2040:8254 | 岛屿图标_0005s_0001_四季森林-默认-拷贝-2 1 | 360 × 360 | FILL | 2 |
| d1441aca75cbe1a81f425d9a27e91ae63dbd2f15 | 2040:8229 | 岛屿图标_0001s_0001_百宝工坊-默认-拷贝-2 1 | 360 × 360 | FILL | 2 |
| 3b7a64956a408cf5f06b9824d5aaf85da2721d54 | 2040:8248 | 岛屿图标_0004s_0001_幻想云岛-默认-拷贝-2 1 | 360 × 360 | FILL | 2 |
| 32181580de67d2686a148cc6dbd407be55952f96 | I2399:14005;2040:9049;2040:9038 | exec-ada1ec01-53b2-433a-9b28-36f5ca220d52 1 | 240 × 240 | CROP | 5 |
| d3ce68459e9bf05ebe0eb1affcdadcee71bb4167 | 2379:12472 | Shock 1 | 640 × 640 | FILL | 4 |
| 639567cd81d769a3933c6fa97f9e369b4965867c | I2322:11321;2336:7569;2336:7566 | 小木板 2 | 272.899 × 66 | FILL | 24 |
| 0a7405c427e8d40a1969564dca8b1d58dc6df09b | 2040:9114 | screen/map/myTown/overview | 1920 × 1080 | FILL | 5 |
| 29e0ed2738656adb060d8f935f10e9f8a4f92b5f | 2045:12527 | 大王 1 | 112 × 112 | FILL | 3 |
| 9526667d34f9ad062cf6218a2a88dd985ebd0fef | 2064:5752 | 大王 1 | 112 × 112 | FILL | 3 |
| e169e52b63d62b2d1110bab30dcc24878402e742 | 2064:6233 | 大王 1 | 112 × 112 | FILL | 4 |
| 77419477248888283de99cde0e7065a83103eb8a | 2064:6244 | 大王 1 | 112 × 112 | FILL | 3 |
| 19de3512c5f39df0f0553f40a9ea8abde080c3c0 | I2044:11325;2045:11720;2044:11438 | 大王 1 | 196 × 196 | FILL | 7 |
| d1cce6cd43093619fd7825d09d0984591b432812 | 2045:12727 | book | 235 × 157 | FILL | 5 |
| 313bd7a9db4601bf458c7b36672f40925ac0602c | I2413:12196;2040:9049;2379:12493;2379:12475 | Wink 1 | 367.5 × 367.5 | FILL | 5 |
| 029f900ad1ff326ea5e8cd75f2c3b6975f290fec | 2044:10981 | Ellipse 9 | 98 × 98 | CROP | 4 |
| 915db50c0699c263f178f9e2de3d881193775fc4 | 2335:12386 | map/chapterActionPanel | 1551 × 280 | CROP | 4 |
| d911fc2cf532ee7de245ddc79e8d2131418324f9 | I2335:12386;2340:10968;2340:10623;2336:8147;2336:7590 | 彩虹 2 | 56 × 34.885 | FILL | 226 |
| 1fdefd35793edc348283fce9d02616b7b3c19a76 | 2064:6613 | screen/story/happyDay/sceneSelection | 1920 × 1080 | FILL | 11 |
| 497aac61dea29441cd9b933337c47d155cbdc78c | 2330:11751 | Scene Image | 1240 × 743 | FILL | 29 |
| f462ca213561407dd9b61f0e4a49cb34943084cb | I2311:6682;2330:8478 | layout/imageContainer | 356 × 317.5 | FILL | 1 |
| fdc2f0159e753508268e3752fb6d1b78b0be9586 | I2330:8274;2330:8478 | layout/imageContainer | 356 × 317.5 | FILL | 1 |
| 55af372386bd8c0884b7b65662ddd30494ceb8ae | I2330:8289;2330:8478 | layout/imageContainer | 356 × 317.5 | FILL | 1 |
| 12c085d1eaaecf7277d61a83de176281fa84ab3d | 2379:12474 | Thinking 1 | 640 × 640 | FILL | 3 |
| 190d38b2484df597cce66dd8bd4cb1505a677500 | 2413:13357 | navigation/sidebar | 500 × 815 | CROP | 3 |
| 62eb3c384b68d974edcc86c290e4c3fa5b5aed0d | 2344:13267 | dialog/stickerGenerator | 585.2 × 552.3 | FILL | 6 |
| a958f74680a57cd41dcae2461595e781ebc3266c | 2379:12473 | Talk 1 | 640 × 640 | FILL | 2 |
| 87c67b6f7e50a51be75d34b50bb0adeaed808410 | 2379:12476 | Celebrating 1 | 640 × 640 | FILL | 3 |
| b22e6a92310ad38655690c3cedc4f310ffae33d0 | 2413:27755 | A 舞台布景 · 独立图片 | 1744 × 772 | FILL | 3 |
| 3c3448faaf4535d0c4bc9dd8868e3f168348f2b2 | 2405:12839 | 男孩 · 透明PNG | 175 × 270 | FIT | 3 |
| e69ee6c0b3c1c8ef267a1f25236b11f59e509a8e | 2405:12843 | 小猫 · 透明PNG | 205 × 183 | FIT | 3 |
| ea470d67523bd391a5b6a9a33c2cc9f1f69a1587 | 2405:12847 | 红风筝 · 透明PNG | 150 × 250 | FIT | 3 |
| 0075be116e0176eab219826f690849b787e356d9 | 2379:12477 | Director 1 | 640 × 640 | FILL | 4 |
| 579f8e450cc7f5e217f1c39651ace6058049693e | 2542:28666 | layout/storyStepIndicator | 463 × 463 | FILL | 1 |
| cf9be2a429c29b796c07d93fed7eddba0a0fd8d1 | 2540:24380 | artwork/resultWoodPanel | 827 × 505.76 | CROP | 1 |
| ece298d0ec2c16f10310d45724b276a6035cb503 | 2154:7792 | layout/imageContainer | 212 × 236 | FILL | 2 |
| d8514ab96e9bc0d9d945ad7ae4f2f087bc4bd4c5 | 2379:12479 | Nervous 1 | 640 × 640 | FILL | 1 |
| 7d5ce233b1d2a6ea99dae60cde869e7764492273 | 2039:8206 | 岛屿图标_0000s_0000_一句话大王-默认-拷贝 2 | 360 × 360 | FILL | 1 |
| 0424feea51b92adc3dc4292ea7c9fa0f80cd3e3e | 2039:8219 | exec-610b5232-9fbe-4687-8994-8ba0c2089079 1 | 141.231 × 138.112 | FILL | 1 |
| 0151bc621581147ea6e26feb80f800327328dbe4 | 2039:8207 | 岛屿图标_0000s_0001_一句话大王-默认-拷贝-2 1 | 360 × 360 | FILL | 1 |
| 7d23d6d9bd1de409fe4d70cd9ef9106088a5c84b | 2040:8234 | 岛屿图标_0002s_0001_笑脸村-默认-拷贝 1 | 360 × 360 | FILL | 1 |
| bf5a449457c0ea62eb2e175ab25ec9450d2445c2 | 2040:8235 | 岛屿图标_0002s_0002_笑脸村-默认 1 | 360 × 360 | FILL | 1 |
| cc4af14352ea244c85535eefdfbdfbfca0519d49 | 2040:8242 | 岛屿图标_0003s_0001_我的小镇-默认-拷贝-2 1 | 360 × 360 | FILL | 1 |
| 28fc1bdb836fea3bdf5aa0e2cc268e5b194debda | 2040:8240 | 岛屿图标_0003s_0002_我的小镇-默认 1 | 360 × 360 | FILL | 1 |
| 65233e64761d291f595975d24890c2768a59d9c9 | 2040:8247 | 岛屿图标_0004s_0000_幻想云岛-默认-拷贝 1 | 360 × 360 | FILL | 1 |
| 154bdbe57d8ecd2692325a75370dd0fd7961d08e | 2040:8246 | 岛屿图标_0004s_0002_幻想云岛-默认 1 | 360 × 360 | FILL | 1 |
| deae215d15e870985e99bb0afc857a2bfea79989 | 2040:8253 | 岛屿图标_0005s_0000_四季森林-默认-拷贝 1 | 360 × 360 | FILL | 1 |
| e51afb2a1f2c9bda6fc0aa99def3f3aea5eee551 | 2040:8252 | 岛屿图标_0005s_0002_四季森林-默认 1 | 360 × 360 | FILL | 1 |
| 317b69ca91a142914db5ba9a4b3d6d76b5aedce8 | 2040:8228 | 岛屿图标_0001s_0000_百宝工坊-默认-拷贝 2 | 360 × 360 | FILL | 1 |
| 125a206f7ad7fec367740ae149f19811be3a9c5a | 2040:8227 | 岛屿图标_0001s_0002_百宝工坊-默认 1 | 360 × 360 | FILL | 1 |

### H1. 已配置的导出预设

| 节点 | ID | 设置 |
| --- | --- | --- |
| layout/storyStepIndicator | 2542:28666 | [{"format":"PNG","suffix":"","contentsOnly":true,"colorProfile":"DOCUMENT","constraint":{"type":"SCALE","value":4}}] |
| icon/diamond | 2020:9121 | [{"format":"SVG","suffix":"","contentsOnly":true,"colorProfile":"DOCUMENT","svgOutlineText":true,"svgIdAttribute":false,"svgSimplifyStroke":true}] |
| icon/droplet | 2020:9086 | [{"format":"SVG","suffix":"","contentsOnly":true,"colorProfile":"DOCUMENT","svgOutlineText":true,"svgIdAttribute":false,"svgSimplifyStroke":true}] |
| icon/star | 2020:9096 | [{"format":"SVG","suffix":"","contentsOnly":true,"colorProfile":"DOCUMENT","svgOutlineText":true,"svgIdAttribute":false,"svgSimplifyStroke":true}] |
| icon/starDisabled | 2044:10587 | [{"format":"SVG","suffix":"","contentsOnly":true,"colorProfile":"DOCUMENT","svgOutlineText":true,"svgIdAttribute":false,"svgSimplifyStroke":true}] |
| icon/sticker | 2020:9538 | [{"format":"SVG","suffix":"","contentsOnly":true,"colorProfile":"DOCUMENT","svgOutlineText":true,"svgIdAttribute":false,"svgSimplifyStroke":true}] |

## I. 当前滚动区域与费用实例

这些滚动方向来自当前Figma，并不是重新测试的结果。代码实现时需同时保留有界高度和可访问操作区。

| 页面 | 滚动区 | ID | 使用尺寸 | layout / wrap | overflow / clip |
| --- | --- | --- | --- | --- | --- |
| screen/story/happyDay/composition | layout/stickerGrid | I2413:13357;2340:12260 | 412 × 467 | HORIZONTAL / WRAP | VERTICAL / true |
| screen/story/happyDay/stickerGeneration | layout/stickerGrid | I2413:14496;2340:12260 | 412 × 467 | HORIZONTAL / WRAP | VERTICAL / true |
| screen/story/happyDay/narration/idle | layout/dialogueHistory | 2351:9356 | 601.333 × 541 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/narration/idle | layout/storyContent | I2353:13280;2351:9328 | 505.333 × 736 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/narration/complete | layout/storyContent | I2413:17506;2413:23461;2351:10445 | 539 × 736 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/storyEdit | layout/storyContent | I2605:103433;2389:20347 | 1183 × 575 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/storyEdit | story/editableContent | I2605:103433;2389:20714 | 1147 × 168 | VERTICAL / NO_WRAP | VERTICAL / false |
| screen/collection/stickersAndMovies | layout/stickerGrid | 2540:20229 | 855 × 636 | HORIZONTAL / WRAP | VERTICAL / true |
| screen/collection/stickersAndMovies | layout/movieList | 2540:21394 | 525 × 754 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/collection/moviePlayer | layout/stickerGrid | 2540:21922 | 842 × 636 | HORIZONTAL / WRAP | VERTICAL / true |
| screen/collection/moviePlayer | layout/movieList | 2540:21985 | 778 × 754 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/collection/stickerGeneration | layout/stickerGrid | 2605:105809 | 855 × 636 | HORIZONTAL / WRAP | VERTICAL / true |
| screen/collection/stickerGeneration | layout/movieList | 2605:105873 | 525 × 754 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/narration/listening | layout/dialogueHistory | 2413:15585 | 601.333 × 541 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/narration/listening | layout/storyContent | I2413:15591;2351:9328 | 505.333 × 736 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/narration/storyExpanded | layout/dialogueHistory | 2413:15957 | 601.333 × 541 | VERTICAL / NO_WRAP | VERTICAL / true |
| screen/story/happyDay/narration/storyExpanded | layout/storyContent | I2413:15963;2351:10445 | 505.333 × 736 | VERTICAL / NO_WRAP | VERTICAL / true |

费用实例（读取实际内部图标，而非主组件默认图标）：

| 页面 | 费用实例ID | 数值 | 实际图标 |
| --- | --- | --- | --- |
| screen/story/happyDay/composition | I2413:13357;2340:12239;2382:14983 | 1 | icon/droplet |
| screen/story/happyDay/stickerGeneration | I2413:14496;2340:12239;2382:14983 | 1 | icon/droplet |
| screen/story/happyDay/stickerGeneration | I2413:14972;2344:13267;2413:15443 | 1 | icon/droplet |
| screen/story/happyDay/storyEdit | I2605:103433;2396:12493;2382:14985 | 1 | icon/diamond |
| screen/collection/stickersAndMovies | I2540:21399;2382:14983 | 1 | icon/droplet |
| screen/collection/moviePlayer | I2540:21959;2382:14983 | 1 | icon/droplet |
| screen/collection/stickerGeneration | I2605:105847;2382:14983 | 1 | icon/droplet |
| screen/collection/stickerGeneration | I2605:106149;2344:13267;2413:15443 | 1 | icon/droplet |

当前钱包文案：`颜料`、`6`、`变贴纸、改一改要用`、`领今天的 +5`、`宝石`、`2`、`拍电影用，可换颜料`、`问问爸爸妈妈`。

## J. 历史信息使用规则

- 用户已完成新UI，要求按当前稿交接前端演示；本轮不修改或重新验收设计。
- 旧版有存档且明确忽略；旧变量/旧组件/旧版页面不纳入实现基线。
- 过去生成的图像和prompt解释了木质UI、少字、角色状态、故事本展开及固定镜头动效意图；它们不是当前布局或最终文案的替代品。
- 既往CSV/审计JSON可能早于手动调整；本MD和本次JSON仅反映本次读取，后续修改仍需重新读当前Figma。
- 未在当前设计或用户需求明确的规则用“建议/可配置/mock/待定”表示，不把推断写成既有产品事实。
