# 故事岛大冒险

依据 Figma `ui/art → ui/newVersion` 开发的 React 前端交互演示。适用于横屏平板与电脑，覆盖 16:9、16:10、4:3；正文、操作控件、故事数据和插画分层实现。

## 本地运行

需要 Node.js 22.18+（推荐 24）与 pnpm 11。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

浏览器打开终端显示的本地地址。平板与电脑在同一局域网时，可使用电脑的局域网 IP 和端口访问。

```sh
pnpm test       # 共享状态、持久化、扣费/奖励去重等测试
pnpm build      # TypeScript 检查与静态构建，输出 dist/
pnpm preview    # 预览构建结果
```

浏览器流程测试（另一个终端保持 `pnpm dev` 运行）：

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

也可以设置 `STORY_BROWSER_PATH` 使用本机 Chrome，或通过 `STORY_BASE_URL` 指定待验证的预览地址。

## 演示路线

首页开始冒险 → 我的小镇 → 快乐的一天 → 出发 → 选择场景 → 就在这里 → 放置贴纸 → 拼好啦 → 按住麦克风并松开，补充故事 → 翻开故事本 → 看看团团记下的故事 → 修改正文/补一句 → 开拍电影 → 配音选择 → 四幕预览 → 结算 → 保存给爸爸妈妈/回到地图。

- 点击贴纸加入画面，拖动调整位置；选中后可缩放、旋转、移除。键盘方向键也可移动。
- 麦克风按住进入收听状态，松开填入演示片段；鼠标、触摸、空格键均可使用，取消/切出页面会结束收听。
- 预览会播放四幕；点击第四幕只会定位播放，不会立即领奖。
- “保存给爸爸妈妈”将作品保存在当前浏览器的图鉴中；播放器支持暂停、播放、进度与全屏。
- 贴纸生成可以从拼贴或图鉴打开，关闭后留在原页面；接受时扣颜料 1。
- 资源条打开钱包；今天的 +5 每个本地日期只领取一次。

## GitHub Pages

仓库保留源码，`dist/` 由工作流构建。工作流在推送和 PR 时自动验证；需要发布时，在 GitHub 网页中操作：

1. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。
2. **Actions → Build and deploy Pages → Run workflow**，勾选 `deploy`，选择 `main` 运行。
3. 部署成功后使用工作流显示的 Pages 地址。预期默认项目地址为 `https://chauvetshao.github.io/storymap.github.io/`，实际以 GitHub 返回地址为准。

项目使用相对构建路径，不依赖服务器路由重写，可部署在仓库子路径。没有修改仓库可见性；交付时重新检查到仓库为公开状态，可按上述步骤启用 Pages，参见 [GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。

## 代码与设计对应

| 位置                            | 职责                                                                    |
| ------------------------------- | ----------------------------------------------------------------------- |
| `src/App.tsx`                   | 页面组件、流程入口、弹层与界面状态                                      |
| `src/components/UI.tsx`         | 按钮、图标、木牌、故事本要素、装订环、团团、麦克风、弹层、场景画布      |
| `src/components/MovieStage.tsx` | 舞台、角色、字幕与分幕动画                                              |
| `src/state/model.ts`            | 共享状态、演示规则、余额事务与存储版本                                  |
| `src/services/demo.ts`          | 可替换的模拟转写、贴纸结果、分幕内容接口                                |
| `src/styles/tokens.css`         | 当前 108 个 Figma 变量及额外数值 token，保留 primitive → semantic alias |
| `src/styles/style.css`          | 基础样式、工具类、组件、页面布局、动效，按 CSS layer 分层               |
| `src/styles/fonts/`             | 实际中文正文与展示字体的 WOFF2 文件                                     |
| `public/assets/`                | 当前设计导出的本地资产，没有运行时临时 Figma 链接                       |
| `docs/asset-manifest.json`      | 资产来源节点、文件、尺寸及完整性记录                                    |
| `docs/HANDOFF.md`               | 演示规则、动效、适配和后续接入说明                                      |

## 数据与服务边界

本演示没有后端、账号、真实 AI、录音上传、支付或视频文件渲染。语音使用预设转写，生成结果使用当前设计的彩虹贴纸，电影为可播放的网页分层动画。配音入口演示状态切换，不会生成真实音轨。分享按钮保存本地作品，不会向他人发送消息或导出 MP4。

进度保存在当前浏览器的 `localStorage`，键为 `story-island-demo-v1`；返回、切换页面与刷新会保留。需要从头演示时，在开发者工具删除该键后刷新。清除浏览器数据会删除本地演示进度。

Figma：[当前新版区域](https://www.figma.com/design/l7Z5Nfkjt2wUKhatOdZvK0/?node-id=2399-13537)。素材与字体的来源/版权记录见 `docs/`；项目美术资产不因代码上传而改变原有权利归属。
