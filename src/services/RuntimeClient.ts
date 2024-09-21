import { Geolocation } from "@effect/platform-browser";
import { Layer, ManagedRuntime } from "effect";

const MainLayer = Layer.mergeAll(Geolocation.layer);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
