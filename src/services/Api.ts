import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { Context, Effect, flow, Layer } from "effect";
import { Post } from "./schema";

const make = Effect.gen(function* () {
  const baseClient = yield* HttpClient.HttpClient;
  const client = baseClient.pipe(
    HttpClient.mapRequest(
      flow(
        HttpClientRequest.prependUrl("https://jsonplaceholder.typicode.com"),
        HttpClientRequest.acceptJson
      )
    )
  );

  return {
    getPosts: client
      .get("/posts")
      .pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Post.Array)),
        Effect.scoped
      ),
    getPostById: (id: string) =>
      client
        .get(`/posts/${id}`)
        .pipe(
          Effect.flatMap(HttpClientResponse.schemaBodyJson(Post)),
          Effect.scoped
        ),
  } as const;
});

export class Api extends Context.Tag("Api")<
  Api,
  Effect.Effect.Success<typeof make>
>() {
  static readonly Live = Layer.effect(this, make).pipe(
    Layer.provide(FetchHttpClient.layer)
  );
}
