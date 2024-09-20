import { Effect, Layer } from "effect";

const make = {
  getPosts: Effect.dieMessage("TODO"),
  getPostById: (id: string) => Effect.dieMessage("TODO"),
};

export class Api extends Effect.Tag("Api")<Api, typeof make>() {
  static readonly Live = Layer.succeed(this, make);
}
