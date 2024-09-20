import { HttpClientResponse } from "@effect/platform";
import { Schema } from "@effect/schema";
import { Context, Effect, Layer } from "effect";
import { JsonPlaceholderClient } from "./JsonPlaceholderClient";
import { Post } from "./schema";

const make = Effect.map(JsonPlaceholderClient, (client) => ({
  getPosts: client
    .get("/posts")
    .pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(Post)))
    ),
  getPostById: (id: string) =>
    client
      .get(`/posts/${id}`)
      .pipe(Effect.flatMap(HttpClientResponse.schemaBodyJson(Post))),
}));

export class Api extends Context.Tag("Api")<
  Api,
  Effect.Effect.Success<typeof make>
>() {
  static readonly Live = Layer.effect(this, make).pipe(
    Layer.provide(JsonPlaceholderClient.Live)
  );
}
