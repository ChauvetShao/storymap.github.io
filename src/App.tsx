import { useEffect, useReducer, useRef, useState } from "react";
import type { Dispatch } from "react";
import {
  asset,
  scenes,
  sceneName,
  stickerAsset,
  stickerCatalog,
} from "./assets";
import {
  Button,
  Character,
  Cost,
  Dialogue,
  Elements,
  Icon,
  IconButton,
  Logo,
  Mic,
  Modal,
  Rings,
  SceneCanvas,
  Stars,
  WoodTitle,
} from "./components/UI";
import { MovieStage } from "./components/MovieStage";
import {
  demoConfig,
  initialState,
  isPassed,
  reducer,
  restoreState,
  storageKey,
  storyText,
} from "./state/model";
import type { Action, Movie, Screen, State } from "./state/model";
import { demoServices } from "./services/demo";

type Overlay = "wallet" | "generator" | "voiceover" | null;
const stepNames = ["场景", "拼贴", "讲述", "修改", "拍摄"];
const steps: Partial<Record<Screen, number>> = {
  scene: 0,
  composition: 1,
  narration: 2,
  complete: 2,
  edit: 3,
  filming: 4,
  voiceover: 4,
  preview: 4,
};
const groups = ["人物", "动物", "自然", "物品", "魔法"];
const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
const uid = () =>
  crypto.randomUUID?.() ??
  Date.now() + "-" + Math.random().toString(36).slice(2);
const seedTitles = [
  "温馨的夜晚",
  "冒险的旅程",
  "静谧的早晨",
  "激动的时刻",
  "创意的碰撞",
];

function Hud({
  s,
  dispatch,
  open,
  onCollection,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  open: (v: Overlay) => void;
  onCollection: () => void;
}) {
  const step = steps[s.screen];
  const title =
    s.screen === "island"
      ? "故事岛"
      : s.screen === "town"
        ? "我的小镇"
        : s.screen === "collection"
          ? "贴纸图鉴"
          : "";
  return (
    <header className="hud">
      <div className="hud-brand">
        {s.screen !== "home" && (
          <IconButton
            icon="arrowLeft"
            label="返回上一页"
            onClick={() => dispatch({ type: "back" })}
          />
        )}
        <h1>{title}</h1>
      </div>
      {step !== undefined && (
        <nav className="step-progress" aria-label="故事创作进度">
          {stepNames.map((name, i) => (
            <span
              key={name}
              className={i === step ? "current" : i < step ? "done" : ""}
            >
              <span className="step-dot">
                {i < step ? <Icon name="check" /> : i + 1}
              </span>
              <span className="step-label">{name}</span>
            </span>
          ))}
          <Icon name="treasureChest" />
        </nav>
      )}
      <div className="hud-resources">
        <button
          className="resource-status"
          onClick={() => open("wallet")}
          aria-label={`资源钱包，颜料${s.wallet.pigment}，宝石${s.wallet.gems}`}
        >
          <span>
            <Icon name="droplet" />× {s.wallet.pigment}
          </span>
          <span>
            <Icon name="diamond" />× {s.wallet.gems}
          </span>
        </button>
        {["home", "island", "town", "results"].includes(s.screen) && (
          <Button
            variant="cream"
            icon="sticker"
            className="collection-entry"
            onClick={onCollection}
          >
            贴纸图鉴
          </Button>
        )}
      </div>
    </header>
  );
}

function Island({
  s,
  go,
  notice,
}: {
  s: State;
  go: (screen: Screen) => void;
  notice: (s: string) => void;
}) {
  const islands = [
    { id: "townIsland", title: "我的小镇", x: 0, y: 14 },
    { id: "smileIsland", title: "笑脸村", x: 18.54, y: 42.5 },
    { id: "forestIsland", title: "四季森林", x: 27.34, y: 0 },
    { id: "workshopIsland", title: "百宝工坊", x: 41.38, y: 46.23 },
    { id: "fantasyIsland", title: "幻想云岛", x: 52.22, y: 8.69 },
    { id: "kingIsland", title: "一句话大王", x: 74.01, y: 8.27 },
  ];
  return (
    <>
      <div className="island-map">
        <img className="island-path" src={asset("islandPath")} alt="" />
        {islands.map((item, i) => (
          <button
            key={item.id}
            className={"island-marker " + (i === 0 ? "available" : "locked")}
            style={{ left: item.x + "%", top: item.y + "%" }}
            onClick={() =>
              i === 0
                ? go("town")
                : notice("这座岛还被灰雾笼罩着，先完成我的小镇吧！")
            }
            aria-label={item.title + (i === 0 ? "" : "，暂未解锁")}
            aria-disabled={i !== 0}
          >
            <img src={asset(item.id)} alt="" />
            <span className="island-name">{item.title}</span>
            {(i === 0 || i === 5) && (
              <span className="island-count">
                <Icon name="star" />
                {s.completed ? "3" : "2"}/15
              </span>
            )}
          </button>
        ))}
      </div>
      <Dialogue pose="surprised">糟糕！一句话大王用灰雾罩住了故事岛！</Dialogue>
    </>
  );
}
function Town({
  s,
  go,
  notice,
}: {
  s: State;
  go: (screen: Screen) => void;
  notice: (s: string) => void;
}) {
  const [selected, setSelected] = useState(false);
  const nodes = [
    ["weekend", "我的周末"],
    ["happyDay", "快乐的一天"],
    ["firstTime", "第一次……"],
    ["rainyDay", "下雨天"],
    ["king", "大王挑战"],
    ["freeStory", "自由故事"],
  ];
  return (
    <>
      <div className="town-map">
        <img className="town-path" src={asset("townPath")} alt="" />
        {nodes.map(([id, label], i) => (
          <button
            key={id}
            aria-label={label}
            className={`chapter-node chapter-${i} ${i === 1 ? "current" : i === 0 ? "finished" : "locked"}`}
            style={{ left: i * 17.3 + "%", top: i % 2 === 0 ? "52.38%" : "0%" }}
            onClick={() =>
              i === 1
                ? setSelected(!selected)
                : notice(
                    i === 0
                      ? "这一关已经完成，来试试「快乐的一天」吧！"
                      : "完成前面的故事后，这一关就会亮起来。",
                  )
            }
            aria-pressed={i === 1 ? selected : undefined}
            aria-disabled={i > 1}
          >
            <span className="chapter-disc">
              <img src={asset(id)} alt="" />
            </span>
            {i !== 1 && (
              <span className="chapter-status">
                <Icon
                  name={i === 0 ? "check" : "lock"}
                  tone={i === 0 ? "green" : ""}
                />
              </span>
            )}
            <span className="chapter-name">{label}</span>
            {i < 2 && <Stars count={i === 0 ? 2 : s.completed ? 3 : 0} />}
          </button>
        ))}
      </div>
      {selected ? (
        <div
          className="level-panel"
          style={{ backgroundImage: `url(${asset("woodLevel")})` }}
        >
          <div className="level-copy">
            <div className="flex items-center gap-s">
              <h2>快乐的一天</h2>
              <Icon className="level-chest" name="treasureChest" />
              <span className="level-drop">
                <Icon name="droplet" />
                <img src={asset("rainbow")} alt="彩虹贴纸" />
              </span>
            </div>
            <div className="level-goals">
              {[
                "讲清楚谁、在哪里",
                "讲清楚先后和为什么",
                "讲清楚后来怎么样",
              ].map((t) => (
                <span key={t}>
                  <Icon name="starDisabled" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Button icon="play" onClick={() => go("scene")}>
            出发！
          </Button>
        </div>
      ) : (
        <Dialogue>这里是我的小镇</Dialogue>
      )}
    </>
  );
}
function SceneSelection({
  s,
  dispatch,
  go,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  go: (screen: Screen) => void;
}) {
  return (
    <>
      <div className="scene-selection">
        {scenes.map((item) => (
          <div
            key={item.id}
            className={
              "location-card " + (s.sceneId === item.id ? "selected" : "")
            }
          >
            <button
              aria-label={item.name}
              aria-pressed={s.sceneId === item.id}
              onClick={() => dispatch({ type: "scene", id: item.id })}
            >
              <img src={asset(item.id)} alt={item.name + "场景"} />
              <strong>{item.name}</strong>
            </button>
            {s.sceneId === item.id && (
              <Button
                icon="play"
                className="scene-confirm"
                onClick={() => go("composition")}
              >
                就在这里!
              </Button>
            )}
          </div>
        ))}
      </div>
      <Dialogue pose="thinking">快乐的一天……那天，你在哪里呀？</Dialogue>
    </>
  );
}

function Composition({
  s,
  dispatch,
  go,
  generate,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  go: (screen: Screen) => void;
  generate: () => void;
}) {
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const item = s.stickers.find((x) => x.id === selected);
  // Rainbow slots intentionally follow the current Figma placeholders. Category actors use real movie assets.
  const catalog = [
    ...stickerCatalog.filter(
      (x) => x.category === category && !x.id.startsWith("rainbow"),
    ),
    ...Array.from({ length: 14 }, (_, i) => ({
      id: "rainbow-" + ((category * 4 + i) % 21),
      name: "彩虹贴纸",
      category,
    })),
    ...s.owned
      .filter((x) => x.startsWith("generated"))
      .map((id) => ({ id, name: "我的新贴纸", category })),
  ];
  const add = (id: string) => {
    const key = uid();
    dispatch({
      type: "place",
      sticker: {
        id: key,
        assetId: id,
        x: 0.32 + (s.stickers.length % 4) * 0.12,
        y: 0.52 + (Math.floor(s.stickers.length / 4) % 3) * 0.1,
        scale: 1,
        rotation: 0,
      },
    });
    setSelected(key);
  };
  return (
    <main className="composition screen-content">
      <div className="instruction-banner">
        <img src={asset("talking")} alt="团团" />
        <p>那天都有谁？他们在干什么？摆出来给我看看！</p>
      </div>
      <section className="canvas-frame">
        <SceneCanvas
          sceneId={s.sceneId}
          stickers={s.stickers}
          selected={selected}
          editable
          onSelect={setSelected}
          onMove={(id, x, y) => dispatch({ type: "move", id, x, y })}
        />
        {item && (
          <div className="sticker-tools" aria-label="贴纸编辑工具">
            <button
              aria-label="缩小贴纸"
              onClick={() =>
                dispatch({
                  type: "transform",
                  id: item.id,
                  scale: item.scale - 0.15,
                })
              }
            >
              −
            </button>
            <button
              aria-label="放大贴纸"
              onClick={() =>
                dispatch({
                  type: "transform",
                  id: item.id,
                  scale: item.scale + 0.15,
                })
              }
            >
              ＋
            </button>
            <button
              aria-label="旋转贴纸"
              onClick={() =>
                dispatch({
                  type: "transform",
                  id: item.id,
                  rotation: item.rotation + 15,
                })
              }
            >
              ↻
            </button>
            <button
              onClick={() => {
                dispatch({ type: "remove", id: item.id });
                setSelected(null);
              }}
            >
              移除
            </button>
          </div>
        )}
      </section>
      <aside
        className="sticker-sidebar"
        style={{ backgroundImage: `url(${asset("woodSidebar")})` }}
      >
        <div className="sidebar-paper">
          <div className="bookmarks" role="tablist" aria-label="贴纸分类">
            {groups.map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={i === category}
                aria-label={t}
                onClick={() => setCategory(i)}
              >
                <Icon name={["people", "paw", "tree", "cube", "sparkles"][i]} />
              </button>
            ))}
          </div>
          <div className="sticker-grid scroll-area">
            {catalog.map((st, i) => (
              <button
                key={st.id + "-" + i}
                aria-label={`添加${st.name}`}
                className="sticker-slot"
                onClick={() => add(st.id)}
              >
                <img src={stickerAsset(st.id)} alt="" />
              </button>
            ))}
          </div>
          <Button
            variant="cream"
            icon="sticker"
            className="generate-button"
            onClick={generate}
          >
            说一说，变贴纸 <Cost />
          </Button>
          <Button icon="check" onClick={() => go("narration")}>
            拼好啦
          </Button>
        </div>
      </aside>
    </main>
  );
}
function Narration({
  s,
  dispatch,
  go,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  go: (screen: Screen) => void;
}) {
  const [processing, setProcessing] = useState(false);
  const history = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    history.current?.scrollTo({
      top: history.current.scrollHeight,
      behavior: "smooth",
    });
  }, [s.messages.length]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const record = () => {
    if (processing) return;
    setProcessing(true);
    dispatch({
      type: "narrate",
      text: demoServices.transcript(s.sceneId, s.turn),
    });
    timer.current = setTimeout(() => {
      setProcessing(false);
    }, 650);
  };
  return (
    <main className="narration screen-content">
      <section className="narration-scene">
        <div className="canvas-frame">
          <SceneCanvas sceneId={s.sceneId} stickers={s.stickers} />
        </div>
        <Character
          pose={processing ? "wink" : "talking"}
          speech={
            s.turn === 0
              ? "男孩和小猫在什么地方呀？"
              : s.turn === 1
                ? "他们为什么回家了呢？"
                : isPassed(s)
                  ? "我知道啦！你的故事越来越完整了。"
                  : "后来发生了什么？"
          }
        />
      </section>
      <section className="narration-dialogue">
        <div ref={history} className="dialogue-history scroll-area">
          {s.messages.map((m) => (
            <p key={m.id} className={"speech-bubble " + m.role}>
              {m.text}
            </p>
          ))}
          {processing && <p className="speech-bubble guide">团团正在记下来…</p>}
        </div>
        <div className="narration-mic">
          <Mic onFinish={record} disabled={processing} />
          <span className="demo-note">演示语音 · 松开后填入示例故事</span>
        </div>
      </section>
      <section className="single-book">
        <WoodTitle>故事本</WoodTitle>
        <Rings />
        <Elements elements={s.elements} />
        {isPassed(s) && (
          <Button className="book-continue" onClick={() => go("complete")}>
            翻开故事本
          </Button>
        )}
      </section>
    </main>
  );
}
function StoryBook({
  s,
  dispatch,
  go,
  notice,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  go: (screen: Screen) => void;
  notice: (text: string) => void;
}) {
  const editing = s.screen === "edit";
  const [adding, setAdding] = useState(false);
  const [extra, setExtra] = useState("");
  const film = () => {
    if (s.wallet.gems < 1 && !s.paidMovie) {
      notice("宝石不够啦，可以打开资源钱包查看。");
      return;
    }
    dispatch({ type: "film" });
  };
  return (
    <main
      className={`screen-content storybook-view ${editing ? "editing" : "summary"}`}
    >
      <div className="open-book">
        <section className="book-left">
          <div className="canvas-frame">
            <SceneCanvas sceneId={s.sceneId} stickers={s.stickers} />
          </div>
          {!editing && (
            <Button icon="star" onClick={() => go("edit")}>
              看看团团记下的故事
            </Button>
          )}
        </section>
        <section className="book-right">
          <WoodTitle>{editing ? "团团记下的故事" : "故事本"}</WoodTitle>
          <Rings />
          {editing ? (
            <>
              <div className="editable-story scroll-area">
                <textarea
                  aria-label="修改故事正文"
                  value={s.draft || storyText(s.sceneId)}
                  onChange={(e) =>
                    dispatch({ type: "draft", text: e.target.value })
                  }
                />
                <Button
                  variant="blue"
                  icon="mic"
                  onClick={() => setAdding(true)}
                >
                  我还想加一句
                </Button>
              </div>
              <Button icon="camera" className="film-button" onClick={film}>
                改好啦，开拍电影 <Cost kind="diamond" />
              </Button>
            </>
          ) : (
            <Elements elements={s.elements} />
          )}
        </section>
      </div>
      <Character
        pose={editing ? "talking" : "celebrating"}
        speech={
          editing
            ? "团团把你的故事记下来了，你看看对不对？"
            : "故事本记满啦！你说得清清楚楚"
        }
      />
      {adding && (
        <Modal
          label="我还想加一句"
          onClose={() => setAdding(false)}
          className="sentence-modal"
        >
          <h2>我还想加一句</h2>
          <textarea
            aria-label="补充故事"
            placeholder="还发生了什么有趣的事？"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
          />
          <Mic onFinish={() => setExtra("他们约好了，明天还要一起玩！")} />
          <p className="demo-note">演示语音，也可以直接输入</p>
          <Button
            disabled={!extra.trim()}
            icon="check"
            onClick={() => {
              dispatch({
                type: "draft",
                text: (s.draft || storyText(s.sceneId)) + extra.trim(),
              });
              setAdding(false);
              setExtra("");
            }}
          >
            加进故事
          </Button>
        </Modal>
      )}
    </main>
  );
}

function MovieFlow({
  s,
  dispatch,
  go,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  go: (screen: Screen) => void;
}) {
  const filming = s.screen === "filming";
  const voiceover = s.screen === "voiceover";
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [recordingVoice, setRecordingVoice] = useState(false);
  const duration = filming
    ? demoConfig.filmDurationMs
    : demoConfig.previewDurationMs;
  const ended = useRef(false);
  useEffect(() => {
    setElapsed(0);
    setPlaying(!voiceover);
    ended.current = false;
  }, [s.screen]);
  useEffect(() => {
    if (!playing || voiceover) return;
    let previous = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const delta = Math.min(now - previous, 300);
      previous = now;
      setElapsed((t) => Math.min(duration, t + delta));
    }, 80);
    return () => clearInterval(timer);
  }, [playing, voiceover, duration]);
  useEffect(() => {
    if (elapsed < duration || ended.current || voiceover) return;
    ended.current = true;
    setPlaying(false);
    if (filming) go("voiceover");
    else {
      dispatch({ type: "reward" });
      go("results");
    }
  }, [elapsed, duration, filming, voiceover]);
  return (
    <main className="screen-content movie-flow">
      <div className="stage-frame">
        <MovieStage
          sceneId={s.sceneId}
          stickers={s.stickers}
          text={s.draft || storyText(s.sceneId)}
          progress={elapsed / duration}
          playing={playing}
          filming={filming}
        />
        {!filming && !voiceover && (
          <IconButton
            className="replay-button"
            icon="refresh"
            label="重播"
            onClick={() => {
              ended.current = false;
              setElapsed(0);
              setPlaying(true);
            }}
          />
        )}
      </div>
      {filming ? (
        <div className="filming-progress">
          <span>正在拍摄……</span>
          <progress value={elapsed} max={duration} />
        </div>
      ) : (
        !voiceover && (
          <div className="scene-timeline">
            {["第一幕", "第二幕", "第三幕", "第四幕"].map((t, i) => (
              <button
                key={t}
                className={
                  Math.floor((elapsed / duration) * 4) === i ? "active" : ""
                }
                onClick={() => {
                  ended.current = false;
                  setElapsed((duration * i) / 4);
                  setPlaying(true);
                }}
              >
                {t}
                <span className="timeline-track">
                  <span
                    style={{
                      width:
                        Math.max(
                          0,
                          Math.min(1, (elapsed / duration - i / 4) * 4),
                        ) *
                          100 +
                        "%",
                    }}
                  />
                </span>
              </button>
            ))}
            <button
              className="timeline-play"
              aria-label={playing ? "暂停电影" : "播放电影"}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? "Ⅱ" : <Icon name="play" />}
            </button>
          </div>
        )
      )}
      <Character pose="directing" className="movie-director" />
      {voiceover && (
        <Modal
          label="给电影配音"
          onClose={() => go("preview")}
          className="voiceover-modal"
        >
          <Icon className="voiceover-icon" name="mic" tone="orange" />
          <h2>
            {recordingVoice ? "轮到你来讲故事啦！" : "给你的电影配音吧！"}
          </h2>
          <p>
            {recordingVoice
              ? "按住麦克风，松开后预览演示配音"
              : "看着画面，把你的故事讲给大家听"}
          </p>
          {recordingVoice ? (
            <>
              <Mic
                label="按住配音"
                onFinish={() => {
                  dispatch({ type: "voiceover", enabled: true });
                  go("preview");
                }}
              />
              <p className="demo-note">配音为演示状态，不上传或保存真实声音</p>
            </>
          ) : (
            <div className="flex justify-center gap-s">
              <Button
                variant="white"
                onClick={() => {
                  dispatch({ type: "voiceover", enabled: false });
                  go("preview");
                }}
              >
                先不配
              </Button>
              <Button icon="play" onClick={() => setRecordingVoice(true)}>
                开始配音
              </Button>
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}

function Results({
  s,
  dispatch,
  go,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  go: (screen: Screen) => void;
}) {
  useEffect(() => {
    dispatch({ type: "reward" });
  }, []);
  return (
    <main className="results">
      <div className="reward-chest">
        <Icon name="rewardChest" />
      </div>
      <div
        className="result-card"
        style={{ backgroundImage: `url(${asset("woodResults")})` }}
      >
        <WoodTitle>快乐的一天</WoodTitle>
        <div className="result-stars">
          {[0, 1, 2].map((i) => (
            <Icon key={i} name="star" className={"result-star star-" + i} />
          ))}
        </div>
        <div className="result-reward">
          <div className="new-sticker">
            <span>新贴纸!</span>
            <img src={asset("rainbow")} alt="获得彩虹贴纸" />
          </div>
          <div className="result-goals">
            {["讲清楚谁、在哪里", "讲清楚先后和为什么", "讲清楚后来怎么样"].map(
              (t) => (
                <p key={t}>
                  <Icon name="star" />
                  {t}
                </p>
              ),
            )}
          </div>
        </div>
        <Button
          variant="outline"
          className="save-button"
          onClick={() => {
            dispatch({ type: "save" });
            go("collection");
          }}
        >
          保存给爸爸妈妈
        </Button>
        <Button
          icon="location"
          className="return-map-button"
          onClick={() => {
            dispatch({ type: "save" });
            go("town");
          }}
        >
          回到地图
        </Button>
      </div>
      <span className="pigment-reward">
        <Icon name="droplet" />
        +3
      </span>
      <Character pose="celebrating" speech="太棒啦！灰雾散开了一些" />
    </main>
  );
}
function Collection({
  s,
  generate,
  onMovie,
  notice,
}: {
  s: State;
  generate: () => void;
  onMovie: (m: Movie) => void;
  notice: (text: string) => void;
}) {
  const collectionIds = [
    ...Array.from({ length: 34 }, (_, i) => "rainbow-" + i),
    ...s.owned.filter((id) => id.startsWith("generated")),
  ];
  const fixtures = seedTitles.map((title, i): Movie => ({
    id: "sample-" + i,
    title,
    text: storyText("park"),
    sceneId: "park",
    stickers: [],
    voiceover: false,
    createdAt: "",
  }));
  const movies = [
    ...s.movies,
    ...(!s.movies.length
      ? [
          {
            id: "sample-happy",
            title: "快乐的一天",
            text: storyText(s.sceneId),
            sceneId: s.sceneId,
            stickers: s.stickers,
            voiceover: false,
            createdAt: "",
          },
        ]
      : []),
    ...fixtures,
  ];
  return (
    <main className="screen-content collection-view">
      <div className="collection-book open-book">
        <section className="book-left">
          <h2>贴纸</h2>
          <div className="collection-progress">
            <span>
              已收集 {s.owned.length} / {collectionIds.length}
            </span>
            <progress value={s.owned.length} max={collectionIds.length} />
          </div>
          <div className="collection-grid scroll-area">
            {collectionIds.map((id, i) => {
              const owned = s.owned.includes(id);
              return (
                <button
                  key={i}
                  className={"sticker-slot " + (owned ? "" : "unowned")}
                  aria-label={(owned ? "已收集" : "未解锁") + "贴纸 " + (i + 1)}
                  onClick={() =>
                    notice(
                      owned
                        ? "这张贴纸已经在你的收藏里啦！"
                        : "继续讲故事，就能获得更多贴纸。",
                    )
                  }
                >
                  <img src={asset("rainbow")} alt="" />
                </button>
              );
            })}
          </div>
          <Button
            variant="cream"
            icon="sticker"
            className="collection-generate"
            onClick={generate}
          >
            说一说，变贴纸 <Cost />
          </Button>
        </section>
        <section className="book-right">
          <Rings />
          <h2>我的电影</h2>
          <div className="movie-list scroll-area">
            {movies.map((m) => (
              <button
                className="movie-card"
                aria-label={`播放${m.title}`}
                key={m.id}
                onClick={() => onMovie(m)}
              >
                <div
                  className="movie-thumbnail"
                  style={{ backgroundImage: `url(${asset(m.sceneId)})` }}
                >
                  <Icon name="play" />
                </div>
                <div>
                  <strong>{m.title}</strong>
                  <p>导演和配音&nbsp; 我</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
      <Character pose="wink" className="collection-character" />
    </main>
  );
}

function MoviePlayer({
  movie,
  onClose,
}: {
  movie: Movie;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const duration = 32;
  const player = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () =>
        setTime((v) => {
          if (v >= duration) {
            setPlaying(false);
            return duration;
          }
          return v + 0.1;
        }),
      100,
    );
    return () => clearInterval(t);
  }, [playing]);
  const toggle = () => {
    if (time >= duration) setTime(0);
    setPlaying(!playing);
  };
  return (
    <Modal
      onClose={onClose}
      label={movie.title + "播放器"}
      className="player-modal"
    >
      <div ref={player} className="player-screen">
        <MovieStage
          progress={time / duration}
          playing={playing}
          sceneId={movie.sceneId}
          stickers={movie.stickers}
          text={movie.text}
        />
        {!playing && (
          <button
            className="player-big-play"
            aria-label="播放电影"
            onClick={toggle}
          >
            <Icon name="play" />
          </button>
        )}
        <div className="player-controls">
          <button aria-label={playing ? "暂停" : "播放"} onClick={toggle}>
            {playing ? "Ⅱ" : <Icon name="play" />}
          </button>
          <label className="player-range">
            <input
              aria-label="电影进度"
              type="range"
              min="0"
              max={duration}
              step=".1"
              value={time}
              style={{
                background: `linear-gradient(to right, #fda92c ${(time / duration) * 100}%, #eff0f0 ${(time / duration) * 100}%)`,
              }}
              onChange={(e) => setTime(+e.target.value)}
            />
            <span>
              {Math.floor(time / 60)}:
              {String(Math.floor(time % 60)).padStart(2, "0")}
            </span>
          </label>
          <span>0:32</span>
          <button
            aria-label="全屏播放"
            onClick={() => {
              if (document.fullscreenElement) void document.exitFullscreen();
              else void player.current?.requestFullscreen?.();
            }}
          >
            ⛶
          </button>
        </div>
      </div>
    </Modal>
  );
}
function Generator({
  s,
  dispatch,
  onClose,
  notice,
}: {
  s: State;
  dispatch: Dispatch<Action>;
  onClose: () => void;
  notice: (text: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "processing" | "generated">(
    "idle",
  );
  const [requestId, setRequestId] = useState(uid);
  const generatedResult = demoServices.generatedSticker();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const generate = () => {
    if (s.wallet.pigment < 1) {
      notice("颜料不够啦，去钱包领今天的颜料吧！");
      return;
    }
    setStatus("processing");
    timer.current = setTimeout(() => setStatus("generated"), 1000);
  };
  return (
    <Modal label="说一说，变贴纸" onClose={onClose} className="generator-modal">
      <div
        className="generator-frame"
        style={{ backgroundImage: `url(${asset("woodGenerator")})` }}
      >
        <h2>说一说，变贴纸</h2>
        <Cost />
        <p className="generator-prompt">
          {status === "idle"
            ? "想要什么？说给团团听"
            : status === "processing"
              ? "团团正在找彩虹魔法…"
              : "彩虹贴纸来啦！"}
        </p>
        <div className={"generated-sticker " + status}>
          {status === "generated" ? (
            <img
              src={asset(generatedResult.assetId)}
              alt={generatedResult.name}
            />
          ) : status === "processing" ? (
            <div className="loading-dots">
              <i />
              <i />
              <i />
            </div>
          ) : null}
        </div>
        {status === "generated" ? (
          <div className="generator-actions">
            <Button
              variant="outline"
              icon="refresh"
              onClick={() => {
                setStatus("idle");
                setRequestId(uid());
              }}
            >
              再试一次
            </Button>
            <Button
              icon="check"
              onClick={() => {
                if (s.wallet.pigment < 1) {
                  notice("颜料不够啦。");
                  return;
                }
                dispatch({ type: "generate", requestId });
                notice("新贴纸已经放进收藏啦！");
                onClose();
              }}
            >
              就要这张
            </Button>
          </div>
        ) : (
          <div className="generator-mic">
            <Mic
              label={
                status === "processing" ? "正在变贴纸…" : "按住说话，松开结束"
              }
              disabled={status === "processing"}
              onFinish={generate}
            />
          </div>
        )}
        <p className="demo-note">演示生成 · 接受贴纸时使用颜料 1</p>
      </div>
    </Modal>
  );
}

export default function App() {
  const [s, dispatch] = useReducer(reducer, null, () => {
    try {
      return restoreState(localStorage.getItem(storageKey));
    } catch {
      return initialState();
    }
  });
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [storageFailed, setStorageFailed] = useState(false);
  const notice = (message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
  };
  const go = (screen: Screen) => {
    dispatch({ type: "navigate", screen });
    setOverlay(null);
  };
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(s));
    } catch {
      setStorageFailed(true);
    }
  }, [s]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  useEffect(() => {
    document.title =
      (s.screen === "home"
        ? "故事岛大冒险"
        : s.screen === "collection"
          ? "贴纸图鉴"
          : "快乐的一天") + " · 故事岛";
  }, [s.screen]);
  const bg =
    s.screen === "home" || s.screen === "results"
      ? "homeBackground"
      : s.screen === "island"
        ? "islandBackground"
        : s.screen === "town" || s.screen === "collection"
          ? "townBackground"
          : "flowBackground";
  return (
    <div
      className={`game screen-${s.screen}`}
      style={{ backgroundImage: `url(${asset(bg)})` }}
    >
      <Hud
        s={s}
        dispatch={dispatch}
        open={setOverlay}
        onCollection={() => go("collection")}
      />
      <div key={s.screen} className="screen-transition">
        {s.screen === "home" && (
          <main className="home">
            <Logo />
            <Button
              className="start-adventure"
              icon="play"
              onClick={() => go("island")}
            >
              开始冒险
            </Button>
            <img
              className="home-sign"
              src={asset("sign")}
              alt="出发！寻找故事！"
            />
            <img
              className="home-cloud"
              src={asset("cloud")}
              alt="一句话大王的灰雾"
            />
            <Character pose="idle" />
          </main>
        )}
        {s.screen === "island" && <Island s={s} go={go} notice={notice} />}
        {s.screen === "town" && <Town s={s} go={go} notice={notice} />}
        {s.screen === "scene" && (
          <SceneSelection s={s} dispatch={dispatch} go={go} />
        )}
        {s.screen === "composition" && (
          <Composition
            s={s}
            dispatch={dispatch}
            go={go}
            generate={() => setOverlay("generator")}
          />
        )}
        {s.screen === "narration" && (
          <Narration s={s} dispatch={dispatch} go={go} />
        )}
        {(s.screen === "complete" || s.screen === "edit") && (
          <StoryBook s={s} dispatch={dispatch} go={go} notice={notice} />
        )}
        {["filming", "voiceover", "preview"].includes(s.screen) && (
          <MovieFlow s={s} dispatch={dispatch} go={go} />
        )}
        {s.screen === "results" && (
          <Results s={s} dispatch={dispatch} go={go} />
        )}
        {s.screen === "collection" && (
          <Collection
            s={s}
            generate={() => setOverlay("generator")}
            onMovie={setMovie}
            notice={notice}
          />
        )}
      </div>
      {overlay === "wallet" && (
        <Modal
          label="资源钱包"
          onClose={() => setOverlay(null)}
          className="wallet-modal"
        >
          <div className="wallet-row">
            <Icon name="droplet" />
            <div>
              <h2>颜料 {s.wallet.pigment}</h2>
              <p>变贴纸、改一改要用</p>
            </div>
            <Button
              disabled={s.dailyClaim === today()}
              onClick={() => {
                dispatch({ type: "daily", date: today() });
                notice("今天的颜料到账啦！");
              }}
            >
              {s.dailyClaim === today() ? "今天已领取" : "领今天的 +5"}
            </Button>
          </div>
          <div className="wallet-row">
            <Icon name="diamond" />
            <div>
              <h2>宝石 {s.wallet.gems}</h2>
              <p>拍电影用，可换颜料</p>
            </div>
            <Button
              variant="outline"
              onClick={() => notice("这是前端演示，家长入口与兑换暂未接入。")}
            >
              问问爸爸妈妈
            </Button>
          </div>
        </Modal>
      )}
      {overlay === "generator" && (
        <Generator
          s={s}
          dispatch={dispatch}
          onClose={() => setOverlay(null)}
          notice={notice}
        />
      )}
      {movie && <MoviePlayer movie={movie} onClose={() => setMovie(null)} />}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
      {storageFailed && (
        <span className="storage-notice">
          浏览器未允许本地保存，本次进度仅在当前页面保留
        </span>
      )}
      <div className="portrait-hint">把平板横过来，和团团一起冒险吧！</div>
    </div>
  );
}
