import { Context, Effect, Layer } from "effect";
import { JsonPlaceholderClient } from "./JsonPlaceholderClient";

const make = Effect.map(JsonPlaceholderClient, (client) => ({
  getPosts: Effect.dieMessage("TODO"),
  getPostById: (id: string) => Effect.dieMessage("TODO"),
}));

export class Api extends Context.Tag("Api")<Api, typeof make>() {
  static readonly Live = Layer.succeed(this, make).pipe(
    Layer.provide(JsonPlaceholderClient.Live)
  );
}
