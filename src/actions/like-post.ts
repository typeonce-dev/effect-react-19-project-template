"use server";

import { Effect } from "effect";
import { RuntimeServer } from "../services/RuntimeServer";

export const likePost = (id: number) =>
  RuntimeServer.runPromise(Effect.sleep("2 seconds"));
