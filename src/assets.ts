const base = import.meta.env.BASE_URL + "assets/";
const svg = new Set([
  "droplet",
  "diamond",
  "star",
  "starDisabled",
  "sticker",
  "ring",
  "townPath",
  "islandPath",
  "play",
  "arrowLeft",
  "close",
  "mic",
  "people",
  "paw",
  "tree",
  "cube",
  "sparkles",
  "check",
  "camera",
  "refresh",
  "location",
  "pen",
  "why",
  "time",
  "lock",
  "buttonBackground",
  "treasureChest",
  ...Array.from({ length: 6 }, (_, i) => "logo-part" + i),
]);
export const asset = (id: string) =>
  base + id + (svg.has(id) ? ".svg" : ".png");
export const scenes = [
  { id: "park", name: "公园" },
  { id: "riverside", name: "小河边" },
  { id: "homeInterior", name: "我的家" },
  { id: "school", name: "学校" },
] as const;
export const sceneName = (id: string) =>
  scenes.find((s) => s.id === id)?.name ?? "公园";
export const stickerCatalog = [
  { id: "boy", name: "男孩", category: 0 },
  { id: "cat", name: "小猫", category: 1 },
  { id: "kite", name: "红风筝", category: 3 },
  ...Array.from({ length: 34 }, (_, i) => ({
    id: "rainbow-" + i,
    name: i === 0 ? "彩虹" : "彩虹贴纸 " + (i + 1),
    category: i % 5,
  })),
];
export const stickerAsset = (id: string) =>
  asset(
    id.startsWith("rainbow") || id.startsWith("generated") ? "rainbow" : id,
  );
