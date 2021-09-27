export const BASE_URI =
  process.env.NODE_ENV === "production"
    ? "https://vp-pokedex.herokuapp.com"
    : "http://localhost:4000";
