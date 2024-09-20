import { Schema } from "@effect/schema";

export class Post extends Schema.Class<Post>("Post")({
  userId: Schema.Number,
  id: Schema.Number,
  title: Schema.String,
  body: Schema.String,
}) {}
