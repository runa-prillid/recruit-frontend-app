# デザイン仕様

デザインソース: `recruit-frontend/Design/DesignSpec/index.html`

## 画面構成

4つの状態で構成される。

### 01. デフォルト表示

- 左: サイドバー（ページ一覧）
- 右: メインエリア（タイトル + 本文）
- 右上: Editボタン2つ（タイトル用・本文用）
- 下部: フッター

### 02. サイドバー編集モード

- 各ページの横にゴミ箱（削除）アイコン表示
- 下部に「+ New page」ボタンと「Done」ボタン

### 03. タイトル編集モード

- タイトルがテキスト入力欄に切り替わる
- 右上に Cancel / Save ボタン

### 04. 本文編集モード

- 本文がテキストエリアに切り替わる
- 右上に Cancel / Save ボタン

## カラースキーム

| 用途              | 色名             | コード     |
|------------------|-----------------|-----------|
| ブランド / primary | light blue      | `#4CB3F8` |
| テキスト通常       | black80         | `#333333` |
| テキスト薄         | black50         | `#4D4D4D` |
| ボタンnormal      | black30         | `#B3B3B3` |
| 背景Light         | bg light blue1  | `#F5F8FA` |
| 背景Dark          | bg light blue1  | `#C8E6FA` |
| 背景白            | white           | `#FFFFFF` |

## タイポグラフィ

フォント: **Noto Sans JP**（Google Fonts）

| サイズ | 用途      |
|-------|----------|
| 24px  | Title    |
| 16px  | Body     |
| 12px  | Caption  |
| 10px  | Minimum  |

## ボタン

- 高さ: 40px
- 最小幅: 40px
- アイコン内余白: 24px x 24px
- ボタン間隔: 10px

### バリエーション

| ボタン  | スタイル                          |
|--------|----------------------------------|
| Edit   | 背景 `#4CB3F8` + 白アイコン（filled / primary）  |
| Done   | 白背景 + `#4CB3F8` 枠線（outlined / primary） |
| Cancel | 背景 `#B3B3B3` + 白アイコン（filled / normal）   |
| Save   | 背景 `#4CB3F8` + 白アイコン（filled / primary）  |
| Delete | アイコンのみ、色 `#B3B3B3`         |

各ボタンに hover / pressed / disabled 状態あり。

## スペーシング

| 箇所                         | 値    |
|-----------------------------|-------|
| サイドバー左余白              | 20px  |
| サイドバーとメインの境界       | 1px 縦線 |
| メインエリア上余白            | 30px  |
| メインエリア左右余白           | 30px  |
| タイトル〜本文の間            | 20〜30px |
| メインエリア右端〜ボタン       | 30px  |
| メインエリア下余白             | 30px  |
| サイドバー選択項目            | 背景 `#F5F8FA`, 角丸 4px, 文字色 `#32A8F8`, bold |
| メイン背景                   | 白 `#FFFFFF`, 角丸 8px  |
| 本文背景                     | `#F5F8FA`, 角丸 16px |

## アイコン素材（SVG）

`recruit-frontend/Design/img/icon/` より取得:

| ファイル      | 用途                    |
|-------------|------------------------|
| logo.svg    | ヘッダーのサービスロゴ     |
| +.svg       | ページ追加ボタン          |
| edit.svg    | 編集ボタン               |
| delete.svg  | 削除ボタン               |
| save.svg    | 保存ボタン               |
| cancel.svg  | キャンセルボタン          |
| done.svg    | 完了ボタン               |

## フッター

- 左: `Copyright © 2021 Sample`
- 右: `運営会社`
