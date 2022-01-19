import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Button, Box, Container, Typography } from "@mui/material";
import logo from "../logo.svg";

export const LandingPage = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          maxWidth: 480,
          margin: "auto",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack alignItems="center" spacing={4}>
          <Box
            component="img"
            src={logo}
            sx={{ width: 68, height: 68, mr: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            Welcome to Chao Talk
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            A simple chat app built with React, TypeScript, and Auth0.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={loginWithRedirect}
          >
            Click Here to get started
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
