const ms = require("ms");

const development = process.env.NODE_ENV === "development";
const refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY;

const refreshTokenCookieOptions = development
  ? {
      httpOnly: true,
      sameSite: "strict",
      maxAge: ms(refreshExpiry),
    }
  : {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: ms(refreshExpiry),
    };

module.exports = {
  refreshTokenCookieOptions,
};
