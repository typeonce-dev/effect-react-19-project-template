"use server";

import { Effect } from "effect";
import { RuntimeServer } from "../services/RuntimeServer";

export const likePost = async (id: number) =>
  RuntimeServer.runPromise(Effect.sleep("2 seconds"));
