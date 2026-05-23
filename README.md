# 斑泥 Bānní — personal site

Next.js 個人網站。文章以 Markdown 放在 `content/`，由 `lib/posts.js` 讀取並在 `/posts/[slug]` 顯示。

## 開發

```bash
npm install
npm run dev
```

本機預覽：<http://localhost:3000>

建置與正式環境：

```bash
npm run build
npm start
```

## 新增文章

**沒有專用的 `npm run new-post` 指令。** 建立新文章 = 在對應專區新增 `.md` 檔（與可選的圖片資料夾），存檔後重新整理或重啟 `npm run dev` 即可看到。

### 1. 選專區（collection）

| 資料夾 | 網站列表頁 | 說明 |
|--------|------------|------|
| `content/Life/` | [/salon](http://localhost:3000/salon) | 文字日常、新詩、隨筆等 |
| `content/Travel/` | [/travel](http://localhost:3000/travel) | 遊記攝影 |
| `content/Discussion/` | [/discussion](http://localhost:3000/discussion) | 經濟討論、專欄 |

所有文章也會出現在 [/blog](http://localhost:3000/blog)。

### 2. 建立檔案（範例指令）

檔名會變成網址 slug（小寫、空白變 `-`）。建議用 `YYYY-MM-主題` 這類名稱。

**生活／沙龍（Life）：**

```bash
SLUG="2026-05-my-new-post"
mkdir -p "content/Life/${SLUG}"
touch "content/Life/${SLUG}.md"
```

**遊記（Travel）：**

```bash
SLUG="my-trip"
mkdir -p "content/Travel/${SLUG}"
touch "content/Travel/${SLUG}.md"
```

**討論（Discussion）：**

```bash
SLUG="my-article"
mkdir -p "content/Discussion/${SLUG}"
touch "content/Discussion/${SLUG}.md"
```

圖片、影片等靜態檔請放在**與 `.md` 同名的資料夾**裡，例如 `content/Life/2026-05-my-new-post/photo.jpg`。正文與 front matter 裡用相對路徑引用即可（見下方）。

### 3. 填寫 front matter 與正文

檔案開頭為 YAML front matter（`---` 包起來），下面是常用欄位：

```yaml
---
title: 文章標題
date: 2026-05-23
category: 新詩
series: 系列名稱（可留空）
info: 列表頁顯示的簡短說明
author: 斑泥 Bānní
thumbnail: cover.jpg
tags:
  - 標籤一
  - 標籤二
images:
  - img1.jpg
  - img2.jpg
---
```

正文寫在第二個 `---` 之後，使用一般 Markdown。

**欄位說明：**

- `title`、`date`：建議必填；`date` 決定列表排序。
- `category`、`series`：列表篩選用；內頁點擊會連到對應專區並帶 `?category=` / `?series=`。
- `thumbnail`：列表縮圖；可寫檔名（相對於同名資料夾）或 `./檔名`。
- `images`：攝影集版面用（見下方特殊版面）。
- `tags`：標籤陣列；部分 tag 會觸發特殊版面。
- 檔名含 `copy` 的 `.md` 會被忽略，不會上架。

### 4. 圖片路徑

若文章為 `content/Life/my-post.md`，資源目錄為 `content/Life/my-post/`，網站會對應到 `/content/Life/my-post/`。

在 front matter 或 Markdown 裡可用相對路徑，例如：

```markdown
![說明](photo.jpg)
```

```yaml
thumbnail: photo.jpg
```

### 5. 特殊版面（可選）

由 `app/posts/[slug]/page.jsx` 依 `category` / `tags` 決定：

| 條件 | 版面 |
|------|------|
| `category: 新詩` 或 tag 含 `詩文` | 新詩詩箋 |
| `category: 攝影集` 或 tag 含 `攝影` | 直向捲動攝影集（常用 `images` 列表） |

### 6. 預覽與上線

```bash
npm run dev
```

在瀏覽器開啟 <http://localhost:3000/posts/你的-slug>（slug 來自檔名，例如 `2026-05-my-new-post`）。

確認無誤後 commit、push，部署流程依你目前的 hosting 設定即可。

## 專案結構（摘要）

```
content/
  Life/          # .md + 同名資料夾（媒體）
  Travel/
  Discussion/
app/             # Next.js 頁面
lib/posts.js     # 讀取與解析文章
components/      # UI 元件
```
