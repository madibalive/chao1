import React, { FC, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSetToken } from "../context/auth";
import { LoadingScreen } from "./loadingScreen";
import { LandingPage } from "../pages/landing";
import { Box } from "@mui/material";

interface Props {}

const AuthWrapper: FC<Props> = ({ children }) => {
  const { isLoading, isAuthenticated, error, getAccessTokenSilently } =
    useAuth0();

  const setAccessToken = useSetToken();

  useEffect(() => {
    const initToken = async () => {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    };

    if (isAuthenticated) {
      initToken().catch();
    } else {
      setAccessToken(null);
    }
  }, [isAuthenticated, setAccessToken, getAccessTokenSilently]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Box>Oops... {error.message}</Box>;
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
