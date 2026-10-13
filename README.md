# NCDC フロントエンド課題

バックエンドAPI（[recruit-frontend](https://github.com/ncdcdev/recruit-frontend)）と連携するページ管理アプリのフロントエンドです。

## 技術スタック

| 項目 | 選定 | 理由 |
|------|------|------|
| フレームワーク | React + TypeScript | 型安全かつ広く使われている標準的な選択 |
| ビルドツール | Vite | 高速なHMRとビルド |
| データ取得 | TanStack Query | ローディング・エラー・キャッシュを宣言的に管理でき、簡易 |
| スタイリング | CSS Modules | スコープ付きCSS。追加ライブラリ不要でVite標準対応 |
| テスト | Vitest + Testing Library | Viteとの統合が良く、高速に動作 |

## セットアップ

### 前提

- Node.js v18以上
- バックエンドAPI（[recruit-frontend](https://github.com/ncdcdev/recruit-frontend)）が `http://localhost:3000` で起動済み

### 起動手順

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# テストの実行
npx vitest run

# ビルド
npm run build
```

開発サーバーは `http://localhost:5173/` で起動します。

## 設計方針

### ディレクトリ構成

```
src/
├── layouts/       レイアウト（配置のみを責務とする）
├── features/      画面固有のコンポーネント（Sidebar / Main / Footer）
├── components/    再利用可能なUI部品（Button / Input / Textarea / Icon）
├── api/           API呼び出し関数
├── types/         型定義
├── utils/         バリデーション等のユーティリティ
└── assets/        アイコン素材
```

- **layouts** と **features** を分離し、レイアウトの配置責務とコンテンツの表示責務を明確に分けています
- **components** には再利用可能なUI部品を配置し、features内の複数箇所から利用しています
- **api** にAPI呼び出しを集約し、エンドポイントの変更が1ファイルで済むようにしています

### ボタンコンポーネント

`ActionButton` は `variant`（filled / outlined）と `color`（primary / normal）の組み合わせで、デザイン仕様のすべてのボタンバリエーションを1つのコンポーネントで表現しています。

### 状態管理

- グローバルな状態管理ライブラリは使用せず、Appコンポーネントで `selectedId` をuseStateで管理
- データ取得・キャッシュは TanStack Query に委譲し、`useMutation` + `invalidateQueries` でCRUD後のデータ同期を自動化

### バリデーション

バリデーションロジックを `utils/validation.ts` に切り出し、コンポーネントとテストの両方から利用しています。

- タイトル: 1文字以上、50文字以下
- 本文: 10文字以上、2000文字以下

### CSS設計

- CSS Modulesでコンポーネントごとにスコープ
- デザイントークン（カラー・フォントサイズ）は `:root` のCSS変数で一元管理

## テスト

バリデーションロジックの境界値テストを実装しています。タイトル・本文それぞれの最小値・最大値・境界値を検証し、ビジネスルールの正しさを担保しています。

```bash
npx vitest run
```

## 未実装・改善余地

- レスポンシブ対応
- エラー時のトースト通知
- ページ選択状態のURL管理（React Router）
- E2Eテスト
