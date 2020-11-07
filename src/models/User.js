const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "/images/profile/user.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "supervisor", "admin"],
  },
});

module.exports = model("User", UserSchema);
