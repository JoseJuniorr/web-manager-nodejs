const { model, Schema } = require("mongoose");
const slug = require("mongoose-url-slugs");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "title",
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    images: [{ url: String, public_id: String }],
    categoria: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categorias",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(slug("title", { update: true }));

module.exports = model("Post", PostSchema);
