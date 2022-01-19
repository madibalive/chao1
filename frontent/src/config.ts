const isDev = process.env.NODE_ENV === "development";

const API_URL = true
  ? "http://localhost:4000"
  : "https://chao-backend.herokuapp.com/";

const AuthO_Domain = "dev-tgdlv40g.us.auth0.com";
const AuthO_Client = "5DSthllBtfn6I7NuxPo6QrQiwNoV7KY5";

export { AuthO_Domain, API_URL, AuthO_Client };
