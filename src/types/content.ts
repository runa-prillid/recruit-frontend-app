export type Content = {
  id: number;
  title: string | null;
  body: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateContentDTO = {
  title: string;
  body: string;
};

export type UpdateContentDTO = {
  title: string;
  body: string;
};
