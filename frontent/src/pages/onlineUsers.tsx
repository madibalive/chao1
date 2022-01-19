import { useAuth0 } from "@auth0/auth0-react";
import {
  List,
  Box,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  colors,
} from "@mui/material";

import { useFilterUsers } from "../context/users";
import { ListUserItem } from "../components/listUserItem";

export const OnlineUsers = () => {
  const auth0Context = useAuth0();
  const user = auth0Context.user!;

  const users = useFilterUsers();

  return (
    <Box
      sx={{
        minHeight: "50vh",
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>{user?.email?.charAt(1)}</Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Loggined User" primary={user?.email} />
      </ListItem>

      <Box>
        <List>
          {users.map((user) => (
            // @ts-ignore
            <ListUserItem key={user.email} user={user} />
          ))}
        </List>
      </Box>
    </Box>
  );
};
