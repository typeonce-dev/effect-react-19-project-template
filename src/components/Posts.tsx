"use client";

import { useActionState } from "react";
import { likePost } from "../actions/like-post";
import type { Post } from "../services/schema";

export default function Posts({
  posts,
}: {
  posts: readonly (typeof Post.Encoded)[];
}) {
  return (
    <div>
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}

const SinglePost = ({ post }: { post: typeof Post.Encoded }) => {
  const [error, setLiked, pending] = useActionState(async () => {
    try {
      await likePost(post.id);
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }, null);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button disabled={pending} onClick={setLiked}>
        Like
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};
