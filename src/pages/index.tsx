import { Effect } from "effect";
import { Api } from "../services/Api";
import { RuntimeServer } from "../services/RuntimeServer";

export const getConfig = async () => {
  return {
    render: "static",
  };
};

const main = Effect.gen(function* () {
  const api = yield* Api;
  return yield* api.getPosts;
}).pipe(Effect.scoped);

export default async function HomePage() {
  const posts = await RuntimeServer.runPromise(main);
  return (
    <div>
      <title>Index</title>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
