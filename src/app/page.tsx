import { BloggPiece } from "@/components/BloggPiece/BloggPiece";

export default function Home() {
  const bloggPosts:Blogg[] = ;

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Welcome to what is going to be my portfolio!</h1>
      <div>
        <h4>This is where im going to stor my blogg for now</h4>
        {bloggPosts.map((bloggPosts) => (
          <BloggPiece title={bloggPosts.title} date={bloggPosts.date} bloggContent={bloggPosts.bloggContent} />
        ))}
      </div>
    </main>
  );
}
