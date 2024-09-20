import { Effect, Match } from "effect";
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
  return (
    <div>
      <title>Index</title>
      {await RuntimeServer.runPromise(
        main.pipe(
          Effect.mapError((errors) =>
            Match.value(errors).pipe(
              Match.tagsExhaustive({
                ParseError: (error) => <span>ParseError</span>,
                RequestError: (error) => <span>RequestError</span>,
                ResponseError: (error) => <span>ResponseError</span>,
              })
            )
          ),
          Effect.map((posts) => (
            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )),
          Effect.catchAll(Effect.succeed)
        )
      )}
    </div>
  );
}
