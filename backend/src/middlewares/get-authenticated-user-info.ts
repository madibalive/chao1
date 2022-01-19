import axios from "axios";
import { RequestHandler } from "express";
export const AUTH0_DOMAIN = "https://dev-tgdlv40g.us.auth0.com";

export const getAuthenticatedUserDetails: RequestHandler = async (
  req,
  res,
  next
) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) next();
  const { data } = await axios.get(`${AUTH0_DOMAIN}/userinfo`, {
    headers: { Authorization: bearerToken },
  });

  req.user = data;
  next();
};
