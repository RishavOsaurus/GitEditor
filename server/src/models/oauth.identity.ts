import mongoose from "mongoose";

const oauthIdentitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    provider: {
      type: String,
      enum: ["github", "gitlab"],
      required: true
    },
    providerUserId: {
      type: String,
      required: true
    },
    lastLoginAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

oauthIdentitySchema.index(
  { provider: 1, providerUserId: 1 },
  { unique: true }
);

const OauthIdentity = mongoose.model("OauthIdentity", oauthIdentitySchema);

export default OauthIdentity;