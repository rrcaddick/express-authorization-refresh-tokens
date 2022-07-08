const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    refreshTokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.revokeRefreshTokens = async function (refreshToken) {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  try {
    const { userId } = jwt.verify(refreshToken, refreshSecret, { ignoreExpiration: true });
    const user = await this.findById(userId);
    if (user) await user.clearRefreshTokens();
  } catch (error) {
    error.status = 403;
    error.message = "Forbidden";
    throw error;
  }
};

userSchema.methods.clearRefreshTokens = async function () {
  this.refreshTokens = [];
  await this.save();
};
userSchema.methods.removeRefreshToken = async function (refreshToken) {
  this.refreshTokens = this.refreshTokens.filter((rt) => rt !== refreshToken);
  await this.save();
};
userSchema.methods.addRefreshToken = async function (refreshToken) {
  this.refreshTokens.push(refreshToken);
  await this.save();
};
userSchema.methods.recycleRefreshToken = async function (oldRefreshToken, newRefreshToken) {
  await this.removeRefreshToken(oldRefreshToken);
  await this.addRefreshToken(newRefreshToken);
};

module.exports = mongoose.model("User", userSchema);
