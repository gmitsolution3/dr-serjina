export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: unknown;
  status: "published" | "draft";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}