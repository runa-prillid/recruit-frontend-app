# アーキテクチャ設計

## 技術スタック

| 項目          | 選定               |
|--------------|-------------------|
| フレームワーク | React + TypeScript |
| ビルドツール   | Vite               |
| データ取得     | TanStack Query     |
| スタイリング   | CSS Modules        |
| テスト        | （要選定）          |

## ディレクトリ構成

```
src/
├── layouts/
│   └── AppLayout.tsx              # 2カラムレイアウト（Sidebar + Main）
├── features/
│   ├── Sidebar/
│   │   ├── Sidebar.tsx            # サイドバー本体（一覧 + 編集モード切替）
│   │   ├── Sidebar.module.css
│   │   ├── SidebarItem.tsx        # 各ページ行（タイトル + 削除ボタン）
│   │   └── SidebarItem.module.css
│   ├── Main/
│   │   ├── MainContent.tsx        # メインエリア本体
│   │   ├── MainContent.module.css
│   │   ├── TitleSection.tsx       # タイトル表示/編集切替
│   │   ├── TitleSection.module.css
│   │   ├── BodySection.tsx        # 本文表示/編集切替
│   │   └── BodySection.module.css
│   └── Footer/
│       ├── Footer.tsx
│       └── Footer.module.css
├── components/
│   ├── Button/
│   │   ├── ActionButton.tsx       # 共通ボタン（variant + color で切替）
│   │   └── ActionButton.module.css
│   ├── Input/
│   │   ├── TextInput.tsx          # タイトル用テキスト入力
│   │   └── TextInput.module.css
│   ├── Textarea/
│   │   ├── Textarea.tsx           # 本文用テキストエリア
│   │   └── Textarea.module.css
│   └── Icon/
│       └── Icon.tsx               # SVGアイコン表示
├── api/
│   └── contentApi.ts              # API呼び出し関数
├── types/
│   └── content.ts                 # Content型定義
├── assets/
│   └── icons/                     # SVGアイコンファイル
├── App.tsx                        # ルートコンポーネント
├── App.module.css
└── index.css                      # CSS変数・グローバルスタイル
```

## 設計方針

### レイヤー分離

- **layouts/** — レイアウトの配置のみを責務とする。中身のコンテンツは知らない
- **features/** — 画面固有のコンポーネント群。各機能領域ごとにまとめる
- **components/** — 再利用可能なUI部品。features内の複数箇所から利用される

### API層

`api/contentApi.ts` に全APIコールを集約する。  
HTTPクライアントは素の `fetch` を使用（axios等は導入しない）。

```ts
// api/contentApi.ts
const BASE_URL = "http://localhost:3000";

getContents():           Promise<Content[]>    // GET    /content
getContent(id: number):  Promise<Content>      // GET    /content/:id
createContent(data):     Promise<Content>      // POST   /content
updateContent(id, data): Promise<Content>      // PUT    /content/:id
deleteContent(id):       Promise<void>         // DELETE /content/:id
```

### データ取得 — TanStack Query

- `useQuery` で一覧・詳細の取得
- `useMutation` + `invalidateQueries` で作成・更新・削除後に自動再取得
- ローディング・エラー状態は TanStack Query に委譲

### 状態管理

```
App (selectedId を管理)
 ├── Sidebar   ← contents一覧はuseQueryで取得、選択/追加/削除
 └── MainContent ← 選択中のcontentをuseQueryで取得、タイトル/本文の編集・保存
```

グローバルな状態管理ライブラリ（Redux等）は使用しない。  
`selectedId` を App で useState 管理し、propsで子に渡す。

### CSS設計

- **CSS Modules** を使用し、コンポーネントごとにスコープされたスタイルを持つ
- **CSS変数** でデザイントークンを `index.css` の `:root` に一元定義

```css
:root {
  --color-primary: #4CB3F8;
  --color-text: #333333;
  --color-text-light: #4D4D4D;
  --color-button-normal: #B3B3B3;
  --color-bg-light: #F5F8FA;
  --color-bg-dark: #C8E6FA;
  --color-white: #FFFFFF;
  --color-sidebar-active: #32A8F8;
}
```

### ボタンコンポーネント設計

`ActionButton` は `variant` と `color` の組み合わせでデザインを切り替える。

```tsx
type ActionButtonProps = {
  variant: "filled" | "outlined";
  color: "primary" | "normal";
  icon?: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};
```

| variant    | color   | 見た目                                |
|-----------|---------|--------------------------------------|
| filled    | primary | 背景 `#4CB3F8`, 文字 白（Edit, Save） |
| filled    | normal  | 背景 `#B3B3B3`, 文字 白（Cancel）     |
| outlined  | primary | 背景 白, 枠線 `#4CB3F8`（Done）       |
