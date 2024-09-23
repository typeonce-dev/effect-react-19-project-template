import { Schema } from "@effect/schema";
import { Effect, Match } from "effect";
import Form from "../components/Form";
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
  return yield* Schema.encode(Post.Array)(posts);
});

export default async function HomePage() {
  return (
    <div>
      <title>Index</title>
      <Location />
      <Form />
      {await RuntimeServer.runPromise(
        main.pipe(
          Effect.match({
            onFailure: Match.valueTags({
              ParseError: (error) => <span>ParseError</span>,
              RequestError: (error) => <span>RequestError</span>,
              ResponseError: (error) => <span>ResponseError</span>,
            }),
            onSuccess: (posts) => <Posts posts={posts} />,
          })
        )
      )}
    </div>
  );
}
