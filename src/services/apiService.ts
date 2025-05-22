export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch("/data/blogs.json");
  const data: Blog[] = await res.json();
  return data;
};
