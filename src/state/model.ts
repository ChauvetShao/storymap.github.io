export type Screen =
  | "home"
  | "island"
  | "town"
  | "scene"
  | "composition"
  | "narration"
  | "complete"
  | "edit"
  | "filming"
  | "voiceover"
  | "preview"
  | "results"
  | "collection";
export interface Sticker {
  id: string;
  assetId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}
export interface Element {
  label: string;
  icon: string;
  text: string;
  stars: number;
}
export interface Movie {
  id: string;
  title: string;
  text: string;
  sceneId: string;
  stickers: Sticker[];
  voiceover: boolean;
  createdAt: string;
}
export interface State {
  version: 1;
  screen: Screen;
  history: Screen[];
  sceneId: string;
  sessionId: string;
  stickers: Sticker[];
  messages: { id: string; role: "guide" | "player"; text: string }[];
  elements: Element[];
  draft: string;
  turn: number;
  wallet: { pigment: number; gems: number };
  owned: string[];
  movies: Movie[];
  transactions: string[];
  dailyClaim: string | null;
  paidMovie: boolean;
  voiceover: boolean;
  completed: boolean;
}
// All unknown business rules belong to this demo configuration, never to presentation.
export const demoConfig = {
  costs: { sticker: 1, movie: 1 },
  rewards: { pigment: 3 },
  dailyPigment: 5,
  passFilledElements: 5,
  filmDurationMs: 8000,
  previewDurationMs: 16000,
  resultDurationMs: 8000,
};
export const storageKey = "story-island-demo-v1";
const blankElements = (): Element[] => [
  { label: "谁", icon: "people", text: "男孩和小猫", stars: 2 },
  { label: "在哪里", icon: "location", text: "", stars: 0 },
  { label: "发生了什么", icon: "pen", text: "", stars: 0 },
  { label: "先后", icon: "sparkles", text: "先跑来跑去，再回家", stars: 2 },
  { label: "为什么", icon: "why", text: "", stars: 0 },
  { label: "后来呢？", icon: "time", text: "", stars: 0 },
];
const location = (id: string) =>
  ({ park: "公园", riverside: "小河边", homeInterior: "家里", school: "学校" })[
    id
  ] ?? "公园";
export function storyText(sceneId: string) {
  return `有一天，男孩和小猫来到了${location(sceneId)}。男孩先跑来跑去地玩，然后一口气跑回了家。因为男孩玩得太累啦。天快黑了，小猫和男孩开开心心地说了再见。`;
}
export function initialState(): State {
  return {
    version: 1,
    screen: "home",
    history: [],
    sceneId: "park",
    sessionId: "happy-day-demo-1",
    stickers: [],
    messages: [
      { id: "seed-1", role: "player", text: "有男孩，还有小猫" },
      {
        id: "seed-2",
        role: "player",
        text: "男孩先跑来跑去地玩，然后一口气跑回了家。",
      },
    ],
    elements: blankElements(),
    draft: "",
    turn: 0,
    wallet: { pigment: 6, gems: 2 },
    owned: Array.from({ length: 21 }, (_, i) => "rainbow-" + i),
    movies: [],
    transactions: [],
    dailyClaim: null,
    paidMovie: false,
    voiceover: false,
    completed: false,
  };
}
export type Action =
  | { type: "navigate"; screen: Screen }
  | { type: "back" }
  | { type: "scene"; id: string }
  | { type: "place"; sticker: Sticker }
  | { type: "move"; id: string; x: number; y: number }
  | { type: "transform"; id: string; scale?: number; rotation?: number }
  | { type: "remove"; id: string }
  | { type: "narrate"; text: string }
  | { type: "draft"; text: string }
  | { type: "generate"; requestId: string }
  | { type: "film" }
  | { type: "voiceover"; enabled: boolean }
  | { type: "reward" }
  | { type: "save" }
  | { type: "daily"; date: string }
  | { type: "reset" };
export const isPassed = (s: State) =>
  s.elements.filter((e) => e.text).length >= demoConfig.passFilledElements;
export function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "navigate":
      return s.screen === a.screen
        ? s
        : {
            ...s,
            history: [...s.history.slice(-19), s.screen],
            screen: a.screen,
          };
    case "back": {
      const fallback: Partial<Record<Screen, Screen>> = {
        island: "home",
        town: "island",
        scene: "town",
        composition: "scene",
        narration: "composition",
        complete: "narration",
        edit: "complete",
        filming: "edit",
        voiceover: "edit",
        preview: "edit",
        results: "preview",
        collection: "home",
      };
      return {
        ...s,
        screen: s.history.at(-1) ?? fallback[s.screen] ?? "home",
        history: s.history.slice(0, -1),
      };
    }
    case "scene":
      return {
        ...s,
        sceneId: a.id,
        draft: s.draft === storyText(s.sceneId) ? storyText(a.id) : s.draft,
      };
    case "place":
      return { ...s, stickers: [...s.stickers, a.sticker] };
    case "move":
      return {
        ...s,
        stickers: s.stickers.map((p) =>
          p.id === a.id
            ? {
                ...p,
                x: Math.min(0.96, Math.max(0.04, a.x)),
                y: Math.min(0.94, Math.max(0.06, a.y)),
              }
            : p,
        ),
      };
    case "transform":
      return {
        ...s,
        stickers: s.stickers.map((p) =>
          p.id === a.id
            ? {
                ...p,
                scale: Math.min(2, Math.max(0.5, a.scale ?? p.scale)),
                rotation: a.rotation ?? p.rotation,
              }
            : p,
        ),
      };
    case "remove":
      return { ...s, stickers: s.stickers.filter((p) => p.id !== a.id) };
    case "narrate": {
      const turn = s.turn + 1;
      const elements = s.elements.map((e) => ({ ...e }));
      if (turn === 1) {
        elements[1] = { ...elements[1], text: location(s.sceneId), stars: 2 };
        elements[2] = { ...elements[2], text: "一起开心地玩耍", stars: 2 };
      } else if (turn === 2)
        elements[4] = { ...elements[4], text: a.text, stars: 2 };
      else elements[5] = { ...elements[5], text: a.text, stars: 3 };
      return {
        ...s,
        turn,
        elements,
        messages: [
          ...s.messages,
          { id: "turn-" + turn, role: "player", text: a.text },
        ],
        draft: s.draft || storyText(s.sceneId),
      };
    }
    case "draft":
      return { ...s, draft: a.text };
    case "generate": {
      const tx = "sticker:" + a.requestId;
      if (
        s.transactions.includes(tx) ||
        s.wallet.pigment < demoConfig.costs.sticker
      )
        return s;
      return {
        ...s,
        wallet: {
          ...s.wallet,
          pigment: s.wallet.pigment - demoConfig.costs.sticker,
        },
        owned: [...s.owned, "generated-" + a.requestId],
        transactions: [...s.transactions, tx],
      };
    }
    case "film":
      if (s.paidMovie) return { ...s, screen: "filming" };
      if (s.wallet.gems < demoConfig.costs.movie) return s;
      return {
        ...s,
        wallet: { ...s.wallet, gems: s.wallet.gems - demoConfig.costs.movie },
        paidMovie: true,
        screen: "filming",
        history: [...s.history, "edit"],
        transactions: [...s.transactions, "film:" + s.sessionId],
      };
    case "voiceover":
      return { ...s, voiceover: a.enabled };
    case "reward": {
      const tx = "reward:" + s.sessionId;
      if (s.transactions.includes(tx)) return s;
      return {
        ...s,
        completed: true,
        wallet: {
          ...s.wallet,
          pigment: s.wallet.pigment + demoConfig.rewards.pigment,
        },
        transactions: [...s.transactions, tx],
        owned: s.owned.includes("rainbow-21")
          ? s.owned
          : [...s.owned, "rainbow-21"],
      };
    }
    case "save": {
      const m: Movie = {
        id: s.sessionId,
        title: "快乐的一天",
        text: s.draft || storyText(s.sceneId),
        sceneId: s.sceneId,
        stickers: s.stickers.map((x) => ({ ...x })),
        voiceover: s.voiceover,
        createdAt: new Date().toISOString(),
      };
      return { ...s, movies: [m, ...s.movies.filter((x) => x.id !== m.id)] };
    }
    case "daily":
      return s.dailyClaim === a.date
        ? s
        : {
            ...s,
            dailyClaim: a.date,
            wallet: {
              ...s.wallet,
              pigment: s.wallet.pigment + demoConfig.dailyPigment,
            },
          };
    case "reset":
      return initialState();
  }
}
const screens = new Set([
  "home",
  "island",
  "town",
  "scene",
  "composition",
  "narration",
  "complete",
  "edit",
  "filming",
  "voiceover",
  "preview",
  "results",
  "collection",
]);
export function restoreState(raw: string | null): State {
  try {
    const parsed = JSON.parse(raw ?? "null");
    if (
      !parsed ||
      parsed.version !== 1 ||
      !screens.has(parsed.screen) ||
      !Array.isArray(parsed.stickers) ||
      !Array.isArray(parsed.movies) ||
      !Array.isArray(parsed.owned) ||
      !Array.isArray(parsed.history) ||
      !Array.isArray(parsed.transactions) ||
      !Array.isArray(parsed.messages) ||
      !Array.isArray(parsed.elements) ||
      parsed.elements.length !== 6 ||
      !Number.isFinite(parsed.wallet?.pigment) ||
      !Number.isFinite(parsed.wallet?.gems)
    )
      return initialState();
    return {
      ...initialState(),
      ...parsed,
      screen: parsed.screen === "filming" ? "edit" : parsed.screen,
    };
  } catch {
    return initialState();
  }
}
