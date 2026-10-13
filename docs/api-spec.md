# API仕様

バックエンドリポジトリ: [recruit-frontend](https://github.com/ncdcdev/recruit-frontend)

## Base URL

```
http://localhost:3000
```

## エンドポイント一覧

| メソッド | パス             | 説明               | レスポンス |
|---------|-----------------|-------------------|-----------|
| GET     | `/content`      | コンテンツ一覧取得    | Content[] |
| GET     | `/content/:id`  | コンテンツ1件取得     | Content   |
| POST    | `/content`      | コンテンツ作成       | Content   |
| PUT     | `/content/:id`  | コンテンツ更新       | Content   |
| DELETE  | `/content/:id`  | コンテンツ削除       | 204       |

## Content 型

```ts
type Content = {
  id: number;
  title: string | null;
  body: string | null;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
};
```

## リクエストBody

### POST `/content` — CreateContentDTO

```json
{
  "title": "Hello Title",
  "body": "Hello Body"
}
```

### PUT `/content/:id` — UpdateContentDTO

```json
{
  "title": "Update Title",
  "body": "Update Body"
}
```

## バリデーション（フロントエンド側で実施）

| フィールド | 制約             |
|-----------|-----------------|
| title     | 1文字以上、50文字以下  |
| body      | 10文字以上、2000文字以下 |
