"use client";

import type { Post } from "../services/schema";

export default function Posts({ posts }: { posts: readonly Post[] }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
