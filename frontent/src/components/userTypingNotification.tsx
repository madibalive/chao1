import React, { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useSocketListener } from "../context/socket";
import { MessageEvent, User } from "../types";

export const UserTypingNotification = React.memo(
  function UserTypingNotification() {
    const [users, setUsers] = useState<User[]>([]);

    const handleStartedTyping = useCallback(
      (actionType: "started" | "finished") => (user: User) => {
        switch (actionType) {
          case "started":
            setUsers((current) => [...current, user]);
            break;
          // case "finished":
          //   setTypingUsers((current) =>
          //     current.filter((typingUser) => typingUser.id !== user.id)
          //   );
          //   break;
        }
      },
      []
    );

    useSocketListener(
      MessageEvent.STARTED_TYPING,
      handleStartedTyping("started")
    );
    useSocketListener(
      MessageEvent.FINISHED_TYPING,
      handleStartedTyping("finished")
    );

    return (
      <Box visibility={users.length ? "visible" : "hidden"} paddingY={0.5}>
        <Typography variant="caption">
          {users.map((user) => user.email).join(", ")} is typing...
        </Typography>
      </Box>
    );
  }
);
