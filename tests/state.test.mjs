import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  reducer,
  restoreState,
  isPassed,
  storyText,
} from "../src/state/model.ts";
test("scene, stickers and edited story survive navigation and reload", () => {
  let s = initialState();
  s = reducer(s, { type: "scene", id: "school" });
  s = reducer(s, {
    type: "place",
    sticker: {
      id: "one",
      assetId: "cat",
      x: 0.4,
      y: 0.5,
      scale: 1,
      rotation: 15,
    },
  });
  s = reducer(s, { type: "draft", text: "我自己讲的故事。" });
  s = reducer(s, { type: "navigate", screen: "narration" });
  s = reducer(s, { type: "back" });
  const restored = restoreState(JSON.stringify(s));
  assert.equal(restored.sceneId, "school");
  assert.equal(restored.stickers[0].assetId, "cat");
  assert.equal(restored.draft, "我自己讲的故事。");
});
test("passing is independent of full stars; supplementary narration stays available", () => {
  let s = initialState();
  s = reducer(s, { type: "narrate", text: "在公园" });
  s = reducer(s, { type: "narrate", text: "因为累了" });
  assert.equal(isPassed(s), true);
  assert.equal(s.elements.filter((e) => e.text).length, 5);
  assert.ok(s.elements.some((e) => e.stars < 3));
  s = reducer(s, { type: "narrate", text: "后来他们告别了" });
  assert.equal(s.elements.filter((e) => e.text).length, 6);
});
test("sticker accept, film and reward transactions are idempotent", () => {
  let s = initialState();
  for (let i = 0; i < 3; i++)
    s = reducer(s, { type: "generate", requestId: "same" });
  assert.equal(s.wallet.pigment, 5);
  assert.equal(s.owned.length, 22);
  for (let i = 0; i < 3; i++) s = reducer(s, { type: "film" });
  assert.equal(s.wallet.gems, 1);
  for (let i = 0; i < 5; i++) s = reducer(s, { type: "reward" });
  assert.equal(s.wallet.pigment, 8);
  assert.equal(s.owned.filter((x) => x === "rainbow-21").length, 1);
});
test("daily claim is local-date scoped and insufficient resources never go negative", () => {
  let s = initialState();
  s.wallet = { pigment: 0, gems: 0 };
  s = reducer(s, { type: "generate", requestId: "none" });
  s = reducer(s, { type: "film" });
  assert.deepEqual(s.wallet, { pigment: 0, gems: 0 });
  for (let i = 0; i < 3; i++)
    s = reducer(s, { type: "daily", date: "2026-10-25" });
  assert.equal(s.wallet.pigment, 5);
  s = reducer(s, { type: "daily", date: "2026-10-26" });
  assert.equal(s.wallet.pigment, 10);
});
test("saving updates one work and snapshots scene and sticker composition", () => {
  let s = initialState();
  s = reducer(s, { type: "scene", id: "riverside" });
  s = reducer(s, {
    type: "place",
    sticker: {
      id: "one",
      assetId: "kite",
      x: 0.5,
      y: 0.6,
      scale: 1,
      rotation: 0,
    },
  });
  s = reducer(s, { type: "save" });
  s = reducer(s, { type: "move", id: "one", x: 0.8, y: 0.4 });
  assert.equal(s.movies[0].stickers[0].x, 0.5);
  s = reducer(s, { type: "save" });
  assert.equal(s.movies.length, 1);
  assert.equal(s.movies[0].sceneId, "riverside");
  assert.equal(s.movies[0].text, storyText("riverside"));
});
test("malformed or old local data falls back safely and interrupted filming resumes in editor", () => {
  for (const raw of ["{", "null", '{"version":0}', '{"version":1}'])
    assert.deepEqual(restoreState(raw), initialState());
  assert.equal(
    restoreState(JSON.stringify({ ...initialState(), screen: "filming" }))
      .screen,
    "edit",
  );
});
test("drag coordinates and sticker scale are clamped to the scene bounds", () => {
  let s = initialState();
  s = reducer(s, {
    type: "place",
    sticker: {
      id: "one",
      assetId: "cat",
      x: 0.5,
      y: 0.5,
      scale: 1,
      rotation: 0,
    },
  });
  s = reducer(s, { type: "move", id: "one", x: 10, y: -10 });
  s = reducer(s, { type: "transform", id: "one", scale: 99 });
  assert.equal(s.stickers[0].x, 0.96);
  assert.equal(s.stickers[0].y, 0.06);
  assert.equal(s.stickers[0].scale, 2);
});
