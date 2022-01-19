import { SocketEvent, User, UsersEvent } from "../types";
import {
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  colors,
} from "@mui/material";
import { useActiveUser, useSetActiveUser } from "../context/users";

type ListUserProps = {
  user: User;
};

export const ListUserItem = ({ user }: ListUserProps) => {
  const set = useSetActiveUser();
  const active = useActiveUser();

  return (
    <ListItem
      button
      onClick={() => set(user)}
      sx={{
        backgroundColor: user.email === active?.email ? colors.grey[200] : "",
      }}
    >
      <ListItemAvatar>
        <Avatar>{user?.email?.charAt(1)}</Avatar>{" "}
      </ListItemAvatar>
      <ListItemText primary={user?.email} />
    </ListItem>
  );
};
