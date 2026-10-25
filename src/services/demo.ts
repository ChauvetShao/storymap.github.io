import { sceneName } from "../assets";
/** Replace this small boundary with real services later. It performs no network or recording. */
export interface StoryServices {
  transcript(sceneId: string, turn: number): string;
  generatedSticker(): { assetId: string; name: string };
  storyboard(text: string): string[];
}
export const demoServices: StoryServices = {
  transcript(sceneId, turn) {
    return [
      `那天，我们在${sceneName(sceneId)}一起玩耍。`,
      "因为男孩玩得太累啦。",
      "天快黑了，小猫和男孩开开心心地说了再见。",
    ][Math.min(turn, 2)];
  },
  generatedSticker() {
    return { assetId: "rainbow", name: "彩虹贴纸" };
  },
  storyboard(text) {
    const sentences = text.split(/(?<=[。！？])/).filter(Boolean);
    return Array.from(
      { length: 4 },
      (_, i) => sentences[i] ?? sentences.at(-1) ?? "",
    );
  },
};
