import { Layer, ManagedRuntime } from "effect";

const MainLayer = Layer.empty;

export const RuntimeServer = ManagedRuntime.make(MainLayer);
