"use client";

import { Geolocation } from "@effect/platform-browser";
import { Effect } from "effect";
import { useActionState } from "react";
import { RuntimeClient } from "../services/RuntimeClient";

const action = Effect.gen(function* () {
  const geolocation = yield* Geolocation.Geolocation;
  return yield* geolocation.getCurrentPosition();
});

export default function Location() {
  const [location, getLocation, pending] = useActionState(
    () => RuntimeClient.runPromise(action),
    null
  );
  return (
    <div>
      <button disabled={pending} onClick={getLocation}>
        Get Location
      </button>
      <p>
        Location:{" "}
        {location !== null
          ? `${location.coords.latitude} ${location.coords.longitude}`
          : "-"}
      </p>
    </div>
  );
}
