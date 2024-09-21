"use client";

import { Console, Effect } from "effect";
import { useActionState } from "react";
import { FormData } from "../services/FormData";
import { RuntimeClient } from "../services/RuntimeClient";

const program = Effect.gen(function* () {
  const username = yield* FormData.get("username");
  yield* Console.log(username);
});

export default function Form() {
  const [_, action] = useActionState(
    (_: unknown, payload: globalThis.FormData) =>
      RuntimeClient.runPromise(
        program.pipe(Effect.provideService(FormData, payload))
      ),
    null
  );
  return (
    <form action={action}>
      <input type="text" name="username" />
      <button>Submit</button>
    </form>
  );
}
