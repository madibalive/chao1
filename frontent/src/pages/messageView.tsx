import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Message } from "../types";
import { MessageItem } from "../components/messageItem";
import {
  Stack,
  IconButton,
  Box,
  TextField,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/SendRounded";
import logo from "../logo.svg";

import { useRefactoredMessages, useSendMessage } from "../context/message";
import {
  useActiveUser,
  useRequestBlockUser,
  useRequestUnBlockUser,
} from "../context/users";

export const MessageView = () => {
  const send = useSendMessage();
  const block = useRequestBlockUser();
  const unblock = useRequestUnBlockUser();
  const messages = useRefactoredMessages();

  const auth0Context = useAuth0();
  const user = auth0Context.user!;
  const [content, setContent] = useState("");
  const activeUser = useActiveUser();

  function commitMessage() {
    if (!content.trim()) return;
    const messageToSend: Message = {
      localKey: nanoid(),
      content: content,
      from: user.email!,
      to: activeUser!.email,
      localDate: new Date(),
    };
    send(messageToSend);
    setContent("");
  }

  function onchangeHandler(e: any) {
    if (e.target.value !== "\n") setContent(e.target.value);
  }

  function onKeyPresshandler(e: any) {
    if (e.key === "Enter" && !e.shiftKey) commitMessage();
  }

  return (
    <Box height="100%" width="100%" flexDirection="column">
      {activeUser === null ? (
        <Box
          sx={{
            maxWidth: 480,
            margin: "auto",
            minHeight: "50vh",
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
              Select a user to start chatting
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
          }}
        >
          {messages ? (
            <Box
              sx={{
                flex: 1,
                height: "70vh",
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                {activeUser && (
                  <Typography variant="h6">{activeUser.email}</Typography>
                )}
                {activeUser.isBlockedByUser ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      unblock(activeUser);
                    }}
                  >
                    UnBlock
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      block(activeUser);
                    }}
                  >
                    block
                  </Button>
                )}
              </Stack>

              <Box
                sx={{
                  p: 1,
                  height: "90%",
                  overflowY: "scroll",
                }}
              >
                <ul>
                  {messages.map((message: any) => (
                    <MessageItem key={message.localKey} message={message} />
                  ))}
                </ul>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="flex-end"
          >
            {activeUser.isBlockedByUser ? (
              <Typography variant="h6">Unblock to continue chat</Typography>
            ) : (
              <>
                <TextField
                  sx={{
                    flex: 1,
                  }}
                  // variant="standard"
                  name="body"
                  placeholder="Type a message"
                  value={content}
                  onChange={onchangeHandler}
                  onKeyPress={onKeyPresshandler}
                />

                <IconButton onClick={commitMessage}>
                  <PlayCircleOutlineIcon />
                </IconButton>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
