import { useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  AppBar,
  Toolbar,
  Stack,
  Container,
  Typography,
  Button,
} from "@mui/material";

export const DashboardNavBar = () => {
  const { logout } = useAuth0();

  return (
    <AppBar position="fixed" color="inherit" elevation={0}>
      <Toolbar>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">Chao Talk</Typography>
            <Button
              variant="contained"
              onClick={() => {
                logout({ returnTo: window.location.origin });
              }}
            >
              Logout
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
