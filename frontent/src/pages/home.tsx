import { useCallback, useEffect } from "react";
import { MessageView } from "./messageView";
import {
  Grid,
  Box,
  CardContent,
  Card,
  CardHeader,
  Container,
} from "@mui/material";

import { DashboardNavBar } from "../components/Header";
import { OnlineUsers } from "./onlineUsers";

export const HomePage = () => {
  return (
    <Box
      style={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <DashboardNavBar />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          sx={{
            paddingTop: 10,
          }}
        >
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="User's online " />
              <CardContent
                sx={{
                  px: 0,
                }}
              >
                <OnlineUsers />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <MessageView />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
