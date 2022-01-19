const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

export const requireAuth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-tgdlv40g.us.auth0/.well-known/jwks.json",
  }),
  // audience: AUTH0_AUDIENCE,
  issuer: "https://dev-tgdlv40g.us.auth0/",
  algorithms: ["RS256"],
});
