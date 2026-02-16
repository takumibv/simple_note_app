# UI Design Document - Notes App

## 1. 画面構成

### デスクトップレイアウト (lg:1024px+)
```
+------------------+------------------------+------------------------+
|    Sidebar       |      Note List         |     Note Editor        |
|    (240px)       |       (320px)          |       (flex-1)         |
|                  |                        |                        |
| [Groups]         | [Search]               | [Title]                |
| - All Notes      | +--------------------+ | +--------------------+ |
| - Group A        | | Note Card          | | |                    | |
| - Group B        | +--------------------+ | +--------------------+ |
| + Add Group      | | Note Card          | |                        |
|                  | +--------------------+ | [Content]              |
|                  |                        | +--------------------+ |
|                  |                        | |                    | |
|                  |                        | |                    | |
|                  |                        | +--------------------+ |
|                  |                        |                        |
|                  |                        | [Save] [Delete]        |
+------------------+------------------------+------------------------+
```

### タブレットレイアウト (md:768px - lg:1024px)
- サイドバー: 折りたたみ可能（ハンバーガーメニュー）
- Note List + Note Editor を横並び

### モバイルレイアウト (~md:768px)
- サイドバー: オーバーレイで表示
- Note List と Note Editor を切り替え表示

## 2. コンポーネント構成

### Layout Components
```
components/
├── layout/
│   ├── Sidebar.tsx          # グループナビゲーション
│   ├── Header.tsx           # モバイル用ヘッダー
│   └── MainLayout.tsx       # 3カラムレイアウト
```

### Note Components
```
├── notes/
│   ├── NoteList.tsx         # メモ一覧
│   ├── NoteCard.tsx         # メモカード
│   ├── NoteEditor.tsx       # メモ編集フォーム
│   └── NoteSearch.tsx       # 検索フィルタ
```

### Group Components
```
├── groups/
│   ├── GroupList.tsx        # グループ一覧
│   ├── GroupItem.tsx        # グループアイテム
│   └── GroupForm.tsx        # グループ追加フォーム
```

### UI Components (共通)
```
├── ui/
│   ├── Button.tsx           # ボタン
│   ├── Input.tsx            # テキスト入力
│   ├── Textarea.tsx         # テキストエリア
│   └── IconButton.tsx       # アイコンボタン
```

## 3. カラーパレット

### Light Mode
| 用途 | Tailwind Class | Hex |
|------|---------------|-----|
| Background | bg-white | #FFFFFF |
| Surface | bg-zinc-50 | #FAFAFA |
| Border | border-zinc-200 | #E4E4E7 |
| Text Primary | text-zinc-900 | #18181B |
| Text Secondary | text-zinc-600 | #52525B |
| Text Muted | text-zinc-400 | #A1A1AA |
| Accent | bg-zinc-900 | #18181B |
| Accent Hover | bg-zinc-800 | #27272A |

### Dark Mode
| 用途 | Tailwind Class | Hex |
|------|---------------|-----|
| Background | dark:bg-zinc-950 | #09090B |
| Surface | dark:bg-zinc-900 | #18181B |
| Border | dark:border-zinc-800 | #27272A |
| Text Primary | dark:text-zinc-50 | #FAFAFA |
| Text Secondary | dark:text-zinc-400 | #A1A1AA |
| Text Muted | dark:text-zinc-600 | #52525B |
| Accent | dark:bg-white | #FFFFFF |
| Accent Hover | dark:bg-zinc-200 | #E4E4E7 |

## 4. タイポグラフィ

| 用途 | Class |
|------|-------|
| Page Title | text-2xl font-semibold |
| Section Title | text-lg font-medium |
| Card Title | text-base font-medium |
| Body | text-sm |
| Caption | text-xs text-zinc-500 |

フォント: Geist Sans (--font-geist-sans)

## 5. スペーシング

8pxベースのグリッドシステム:
- xs: 4px (p-1, gap-1)
- sm: 8px (p-2, gap-2)
- md: 16px (p-4, gap-4)
- lg: 24px (p-6, gap-6)
- xl: 32px (p-8, gap-8)

## 6. コンポーネント詳細

### Sidebar
```tsx
// 幅: w-60 (240px)
// 背景: bg-zinc-50 dark:bg-zinc-900
// ボーダー: border-r border-zinc-200 dark:border-zinc-800

- ロゴ/タイトル: text-lg font-semibold p-4
- グループリスト:
  - アイテム: px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md
  - 選択中: bg-zinc-200 dark:bg-zinc-800
  - アイコン: Lucide FolderIcon (16px)
- 新規グループ追加: + アイコン付きボタン
```

### NoteCard
```tsx
// 背景: bg-white dark:bg-zinc-900
// ボーダー: border border-zinc-200 dark:border-zinc-800
// 角丸: rounded-lg
// パディング: p-4
// ホバー: hover:border-zinc-300 dark:hover:border-zinc-700
// 選択中: ring-2 ring-zinc-900 dark:ring-white

- タイトル: text-base font-medium truncate
- プレビュー: text-sm text-zinc-500 line-clamp-2
- 日付: text-xs text-zinc-400
```

### NoteEditor
```tsx
// 背景: bg-white dark:bg-zinc-950
// パディング: p-6

- タイトル入力:
  - text-2xl font-semibold
  - border-none outline-none
  - placeholder:text-zinc-300

- コンテンツ入力:
  - textarea
  - min-h-[400px]
  - resize-none
  - text-base leading-relaxed
```

### Button
```tsx
// Primary
className="px-4 py-2 bg-zinc-900 text-white rounded-md
           hover:bg-zinc-800 dark:bg-white dark:text-zinc-900
           dark:hover:bg-zinc-200"

// Secondary
className="px-4 py-2 border border-zinc-200 rounded-md
           hover:bg-zinc-50 dark:border-zinc-700
           dark:hover:bg-zinc-800"

// Ghost
className="px-4 py-2 hover:bg-zinc-100 rounded-md
           dark:hover:bg-zinc-800"
```

## 7. アイコン

Lucide React を使用:
- Folder (グループ)
- FileText (メモ)
- Plus (追加)
- Search (検索)
- Trash2 (削除)
- Menu (ハンバーガー)
- X (閉じる)
- ChevronRight (展開)

サイズ: 16px (w-4 h-4) または 20px (w-5 h-5)

## 8. レスポンシブ対応

### ブレイクポイント
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

### 動作
| 画面サイズ | サイドバー | ノート一覧 | エディタ |
|-----------|----------|----------|---------|
| < md | オーバーレイ | 全幅 | 全幅（切り替え）|
| md - lg | 折りたたみ | 固定幅 | flex-1 |
| >= lg | 常時表示 | 固定幅 | flex-1 |

## 9. インタラクション

### トランジション
- 背景色変更: transition-colors duration-150
- サイドバー開閉: transition-transform duration-200

### フィードバック
- ボタンホバー: 背景色変化
- カードホバー: ボーダー色変化
- 選択状態: リング表示
- ローディング: opacity-50 + スピナー

## 10. アクセシビリティ

- フォーカス表示: focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900
- キーボード操作: Enter/Spaceで選択、Escで閉じる
- スクリーンリーダー: 適切なaria-label, role属性
