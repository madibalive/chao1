import { useAuth0 } from "@auth0/auth0-react";
import { Message } from "../types";
import { Icon, Stack, Paper, Box, Typography, colors } from "@mui/material";

type MessageItemProp = {
  message: Message;
};

export const MessageItem = ({ message }: MessageItemProp) => {
  const { user } = useAuth0();
  const isOwnMessage = user?.email === message.from;

  return (
    <Box
      paddingY={0.5}
      display="flex"
      justifyContent={isOwnMessage ? "flex-end" : "flex-start"}
      component="li"
    >
      <Stack>
        <Box>
          <Paper
            sx={{
              p: 1,
              background: isOwnMessage
                ? colors.lightBlue[100]
                : colors.grey[200],
            }}
          >
            <Typography variant="body2">{message.content}</Typography>
          </Paper>
        </Box>
        <Stack
          sx={{
            opacity: 0.6,
          }}
          justifyContent={isOwnMessage ? "flex-start" : "flex-end"}
        >
          <Typography variant="caption">{message.from}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
