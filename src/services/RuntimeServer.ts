import { Layer, ManagedRuntime } from "effect";
import { Api } from "./Api";

const MainLayer = Layer.mergeAll(Api.Live);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
