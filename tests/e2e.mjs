import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
fs.mkdirSync("test-results", { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.STORY_BROWSER_PATH || undefined,
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1024, height: 768 },
  hasTouch: true,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const state = () =>
  page.evaluate(() => JSON.parse(localStorage.getItem("story-island-demo-v1")));
const screen = async (name) => {
  await page.waitForFunction(
    (n) => document.querySelector(".screen-" + n),
    name,
  );
  await page.waitForTimeout(350);
};
async function hold(label) {
  const b = page.getByRole("button", { name: label, exact: true });
  const r = await b.boundingBox();
  await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(300);
  await page.mouse.up();
  await page.waitForTimeout(800);
}
try {
  await page.goto(process.env.STORY_BASE_URL || "http://127.0.0.1:5173");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("button", { name: "开始冒险", exact: true }).click();
  await screen("island");
  await page.getByRole("button", { name: "我的小镇", exact: true }).click();
  await screen("town");
  await page.getByRole("button", { name: "快乐的一天", exact: true }).click();
  await page.getByRole("button", { name: "出发！", exact: true }).click();
  await screen("scene");
  await page.getByRole("button", { name: "小河边", exact: true }).click();
  await page.getByRole("button", { name: "就在这里!", exact: true }).click();
  await screen("composition");
  assert.equal((await state()).sceneId, "riverside");
  await page.getByRole("button", { name: "添加男孩", exact: true }).click();
  await page
    .getByRole("button", { name: "添加彩虹贴纸", exact: true })
    .first()
    .click();
  let before = await state();
  const sticker = page.locator(".placed-sticker").last();
  const r = await sticker.boundingBox();
  await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await page.mouse.down();
  await page.mouse.move(r.x + r.width / 2 + 60, r.y + r.height / 2 - 30, {
    steps: 8,
  });
  await page.mouse.up();
  assert.notEqual((await state()).stickers[1].x, before.stickers[1].x);
  await page.getByRole("button", { name: /说一说，变贴纸/ }).click();
  await hold("按住说话，松开结束");
  await page.getByRole("button", { name: "就要这张", exact: true }).waitFor();
  await page.getByRole("button", { name: "就要这张", exact: true }).click();
  assert.equal((await state()).wallet.pigment, 5);
  await page.getByRole("button", { name: "拼好啦", exact: true }).click();
  await screen("narration");
  await hold("按住说话");
  await hold("按住说话");
  await hold("按住说话");
  assert.equal((await state()).elements.filter((e) => e.text).length, 6);
  await page.getByRole("button", { name: "翻开故事本", exact: true }).click();
  await screen("complete");
  await page.waitForTimeout(500);
  await page
    .getByRole("button", { name: "看看团团记下的故事", exact: true })
    .click();
  await screen("edit");
  const story = page.getByRole("textbox", {
    name: "修改故事正文",
    exact: true,
  });
  await story.fill(
    "小猫和男孩在小河边玩。先放风筝，再捉迷藏。因为天快黑了，他们约好明天再见。",
  );
  await page.reload();
  await screen("edit");
  assert.equal(
    await story.inputValue(),
    "小猫和男孩在小河边玩。先放风筝，再捉迷藏。因为天快黑了，他们约好明天再见。",
  );
  await page.getByRole("button", { name: /改好啦，开拍电影/ }).click();
  await screen("filming");
  await screen("voiceover");
  await page.getByRole("button", { name: "先不配", exact: true }).click();
  await screen("preview");
  await page.getByRole("button", { name: "第四幕", exact: true }).click();
  assert.equal((await state()).screen, "preview");
  await page.waitForTimeout(4700);
  await screen("results");
  assert.equal((await state()).wallet.pigment, 8);
  assert.equal((await state()).wallet.gems, 1);
  await page.waitForTimeout(3900);
  await page
    .getByRole("button", { name: "保存给爸爸妈妈", exact: true })
    .click();
  await screen("collection");
  assert.equal((await state()).movies.length, 1);
  assert.equal((await state()).movies[0].sceneId, "riverside");
  assert.equal((await state()).movies[0].stickers.length, 2);
  await page
    .getByRole("button", { name: "播放快乐的一天", exact: true })
    .click();
  await page.getByRole("button", { name: "播放电影", exact: true }).click();
  await page.waitForTimeout(500);
  await page.getByRole("slider", { name: "电影进度" }).press("End");
  await page.getByRole("button", { name: "关闭", exact: true }).click();
  await page.getByRole("button", { name: "返回上一页", exact: true }).click();
  await screen("results");
  await page.reload();
  await screen("results");
  assert.equal((await state()).wallet.pigment, 8);
  await page.getByRole("button", { name: /资源钱包/ }).click();
  await page.getByRole("button", { name: "领今天的 +5", exact: true }).click();
  assert.equal((await state()).wallet.pigment, 13);
  await page.keyboard.press("Escape");
  await page.screenshot({ path: "test-results/e2e-final.png" });
  assert.deepEqual(errors, []);
  console.log(
    "PASS: full flow, drag, generation, narration, edit persistence, four acts, save/player, reward idempotency, daily claim, 1024×768 touch context",
  );
} finally {
  await browser.close();
}
