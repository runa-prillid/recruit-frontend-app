export function validateTitle(title: string): string | null {
  if (title.length < 1) return "タイトルは1文字以上で入力してください";
  if (title.length > 50) return "タイトルは50文字以下で入力してください";
  return null;
}

export function validateBody(body: string): string | null {
  if (body.length < 10) return "本文は10文字以上で入力してください";
  if (body.length > 2000) return "本文は2000文字以下で入力してください";
  return null;
}
