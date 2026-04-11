# 成語怪物（Idiom Monster）

給親子共玩的成語競賽小遊戲。  
目前支援單人與雙人對戰、三段難度、錯題回顧、搞笑選項。

## 直接玩

直接開啟 `index.html`。

## 目前專案重點

- 題庫獨立管理：`idiom-bank.js`
- 遊戲設定集中管理：`game-config.js`
- 遊戲主邏輯：`script.js`
- 樣式與版面：`styles.css`、`index.html`

## 功能開關（Feature Toggles）

在 `game-config.js` 可以調整：

- `features.enableFunnyOption`  
  `true`：每題固定帶一個搞笑選項（來源：題庫 `funnyMeaning`）  
  `false`：關閉搞笑選項，改回全語意選項

- `features.showIdiomImage`  
  `false`（預設）：不顯示題目圖片  
  `true`：若題目資料有 `image` 才顯示

## 題庫擴充

題庫格式與欄位說明請看：
- `docs/題庫資料格式.md`

## 上線分享（建議：GitHub Pages）

完整流程請看：
- `docs/部署與跨機開發.md`
