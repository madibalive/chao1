// import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Message, MessageEvent, User, UsersEvent } from "../types";
import { useConnect, useSocketConnection, useSocketListener } from "./socket";
import { RootState, useDispatch, useSelector } from "../redux/store";
import {
  addMessages,
  addMessage,
  MessageSetAll,
} from "../redux/slices/message";
import { useAuth0 } from "@auth0/auth0-react";
import { useActiveUser } from "./users";

export const MessageContext = React.createContext<any>(undefined);

const MessageProvider = (props: any) => {
  const connection = useSocketConnection();
  const connected = useConnect();
  const dispatch = useDispatch();
  const auth0Context = useAuth0();
  const user = auth0Context.user!;
  const [currentConversationMgs, setCurrentConversationMsgs] = useState({});
  const activeUser = useActiveUser();

  const messagesList = useSelector((state: RootState) => state.message);

  useEffect(() => {
    let refactoredMessage = {};
    if (Object.values(messagesList.entities).length > 0 && activeUser) {
      refactoredMessage = Object.values(messagesList.entities).filter((msg) => {
        return (
          // @ts-ignore
          (msg.from === activeUser.email || msg.from === user.email!) &&
          // @ts-ignore
          (msg.to === activeUser.email || msg.to === user.email!)
        );
      });
    }
    setCurrentConversationMsgs(refactoredMessage);
  }, [messagesList, activeUser]);

  const sendMessage = (message: Message) => {
    // @ts-ignore
    dispatch(addMessage(message));
    if (connected)
      connection.current.emit(MessageEvent.MESSAGE, message, (ack: any) => {
        console.log("Message has been sent to the socket server", ack);
      });
  };

  const addNewMessage = (message: Message) => {
    // addMessage(message);
    // @ts-ignore
    dispatch(addMessage(message));
  };

  const onReceiveMessage = useCallback((message: Message) => {
    console.log("new message", message);
    // if (!isEmpty(message)) {
    // @ts-ignore
    dispatch(addMessage(message));
  }, []);

  useSocketListener(MessageEvent.MESSAGE, onReceiveMessage);

  const onReceiveAllMessages = useCallback((data: any) => {
    dispatch(MessageSetAll(data));
  }, []);

  useSocketListener(MessageEvent.ACTIVE_USER_MESSAGES, onReceiveAllMessages);

  useEffect(() => {
    if (connected && connection.current) {
      connection.current.emit(MessageEvent.ACTIVE_USER_MESSAGES, activeUser);
    }
    return () => {};
  }, [connected, connection.current, activeUser]);

  return (
    <MessageContext.Provider
      value={{
        addNewMessage,
        currentConversationMgs,
        sendMessage,
      }}
    >
      {props.children && React.Children.only(props.children)}
    </MessageContext.Provider>
  );
};

export default MessageProvider;

export const useAddNewMessage = () => {
  const context = React.useContext(MessageContext);
  return context.addNewMessage;
};

export const useSendMessage = () => {
  const context = React.useContext(MessageContext);
  return context.sendMessage;
};

export const useRefactoredMessages = () => {
  const context = React.useContext(MessageContext);
  return Object.values(context.currentConversationMgs);
};
