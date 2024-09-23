import { Schema } from "@effect/schema";

export class Post extends Schema.Class<Post>("Post")({
  userId: Schema.Number,
  id: Schema.Number.pipe(Schema.brand("Id")),
  title: Schema.String,
  body: Schema.String,
}) {
  static readonly Array = Schema.Array(this);
}
