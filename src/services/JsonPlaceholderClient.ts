import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";
import { Context, Effect, Layer } from "effect";

const make = HttpClient.HttpClient.pipe(
  Effect.map(
    HttpClient.mapRequest(
      HttpClientRequest.prependUrl("https://jsonplaceholder.typicode.com")
    )
  )
);

export class JsonPlaceholderClient extends Context.Tag("JsonPlaceholderClient")<
  JsonPlaceholderClient,
  Effect.Effect.Success<typeof make>
>() {
  static readonly Live = Layer.effect(this, make).pipe(
    Layer.provide(FetchHttpClient.layer)
  );
}
