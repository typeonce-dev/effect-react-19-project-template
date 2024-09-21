import { Schema } from "@effect/schema";
import { Effect, Match } from "effect";
import Location from "../components/Location";
import Posts from "../components/Posts";
import { Api } from "../services/Api";
import { RuntimeServer } from "../services/RuntimeServer";
import { Post } from "../services/schema";

export const getConfig = async () => {
  return {
    render: "static",
  };
};

const main = Effect.gen(function* () {
  const api = yield* Api;
  const posts = yield* api.getPosts;
  return yield* Schema.encode(Schema.Array(Post))(posts);
}).pipe(Effect.scoped);

export default async function HomePage() {
  return (
    <div>
      <title>Index</title>
      <Location />
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
          Effect.map((posts) => <Posts posts={posts} />),
          Effect.catchAll(Effect.succeed)
        )
      )}
    </div>
  );
}
