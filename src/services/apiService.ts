import { Blog } from "@/types";

export const getBlogInfos = async (): Promise<Blog[]> => {
  const res = await fetch("/data/blogs.json");
  const data: Blog[] = await res.json();
  return data;
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  const res = await fetch("/data/blogs.json");
  const blogs: Blog[] = await res.json();

  return blogs.find((blog) => blog.id === id);
};
