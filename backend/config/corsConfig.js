// This could be fetched from a database
const allowedOrigins = ["https://rrcaddick-goal-setter.herokuapp.com/"];

const corsOptions = {
  origin: (origin, callback) => {
    const originAllowed = process.env.NODE_ENV === "development" || allowedOrigins.includes(origin);
    callback(null, allowedOrigins);
  },
};

module.exports = {
  allowedOrigins,
  corsOptions,
};
