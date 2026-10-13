import type { Content, CreateContentDTO, UpdateContentDTO } from "../types/content";

const BASE_URL = "http://localhost:3000";

export const contentApi = {
  async getContents(): Promise<Content[]> {
    const res = await fetch(`${BASE_URL}/content`);
    if (!res.ok) throw new Error("Failed to fetch contents");
    return res.json();
  },

  async getContent(id: number): Promise<Content> {
    const res = await fetch(`${BASE_URL}/content/${id}`);
    if (!res.ok) throw new Error("Failed to fetch content");
    return res.json();
  },

  async createContent(data: CreateContentDTO): Promise<Content> {
    const res = await fetch(`${BASE_URL}/content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create content");
    return res.json();
  },

  async updateContent(id: number, data: UpdateContentDTO): Promise<Content> {
    const res = await fetch(`${BASE_URL}/content/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update content");
    return res.json();
  },

  async deleteContent(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/content/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete content");
  },
};
