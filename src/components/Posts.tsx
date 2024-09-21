"use client";

import { HashSet } from "effect";
import { useActionState, useState } from "react";
import { likePost } from "../actions/like-post";
import type { Post } from "../services/schema";

export default function Posts({
  posts,
}: {
  posts: readonly (typeof Post.Encoded)[];
}) {
  const [checkedPosts, setCheckedPosts] = useState(HashSet.empty<number>());
  return (
    <div>
      {posts.map((post) => (
        <SinglePost
          key={post.id}
          post={post}
          checked={HashSet.has(checkedPosts, post.id)}
          onChecked={() =>
            setCheckedPosts(HashSet.toggle(checkedPosts, post.id))
          }
        />
      ))}
    </div>
  );
}

const SinglePost = ({
  post,
  onChecked,
  checked,
}: {
  post: typeof Post.Encoded;
  checked: boolean;
  onChecked: () => void;
}) => {
  const [_, setLiked, pending] = useActionState(() => likePost(post.id), null);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button disabled={pending} onClick={setLiked}>
        Like
      </button>
      <input type="checkbox" checked={checked} onChange={onChecked} />
    </div>
  );
};
