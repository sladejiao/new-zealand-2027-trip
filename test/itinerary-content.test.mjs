import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../index.html", import.meta.url), "utf8");

for (const expected of [
  "SHANGHAI → NEW ZEALAND · 2027.01.06–01.17",
  "12天路线，一路向南",
  "D5 1/10</b>ROT → CHC<br>凯库拉",
  "D6 1/11</b>凯库拉 → Tekapo",
  "D12 1/17</b>皇后镇返程",
  "NZ636：ZQN 18:20 → AKL 20:10；AKL 停留3小时45分；NZ289：23:55 → PVG 07:00+1",
  "Kaikōura｜1/10–1/11 · 1晚",
  "Queenstown｜1/14–1/17 · 3晚",
  "还车<br>1/17",
  "D11 · 1/16",
  "出发：2027.01.06 上海｜离境：2027.01.17 皇后镇｜人数：4人",
]) {
  assert.ok(page.includes(expected), `Missing updated itinerary content: ${expected}`);
}

assert.ok(!page.includes("D11 1/16</b>皇后镇返程"), "Old 1/16 return day remains");
assert.ok(!page.includes("回程｜1月16–17日"), "Old return flight dates remain");
