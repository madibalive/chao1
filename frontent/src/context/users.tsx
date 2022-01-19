import React, { useCallback, useEffect, useState } from "react";
import { RootState, useDispatch, useSelector } from "../redux/store";

import { SocketEvent, User, UsersEvent } from "../types";
import {
  addUser,
  removeUser,
  setActiveUser,
  UserSetAll,
  UserUpdate,
} from "../redux/slices/user";
import { useConnect, useSocketConnection, useSocketListener } from "./socket";

export const UsersContext = React.createContext<any>(undefined);

const UsersProvider = (props: any) => {
  const dispatch = useDispatch();
  const connection = useSocketConnection();
  const connected = useConnect();

  const [filterUsers, setFilteredUsers] = useState({});
  const users = useSelector((state: RootState) => state.user);
  const activeUser = useSelector((state: RootState) => state.user.active);

  const resetActiveUser = (user: User) => {
    // @ts-ignore
    dispatch(setActiveUser(user));
  };

  const requestBlockUser = (user: any) => {
    if (connected && connection.current) {
      connection.current.emit(UsersEvent.BLOCK_USER, user);
    }
  };

  const requestUnBlockUser = (user: any) => {
    if (connected && connection.current) {
      connection.current.emit(UsersEvent.UN_BLOCK_USER, user);
    }
  };

  const onNewUserConnected = (user: any) => {
    if (connected && connection.current)
      connection.current.emit(UsersEvent.FETCH_USERS);
  };

  const onRemoveUser = useCallback((disconnectedUser: any) => {
    dispatch(removeUser(disconnectedUser.email));
  }, []);

  const onActiveUsers = useCallback((activeUsers: any) => {
    dispatch(UserSetAll(activeUsers));
  }, []);

  const onBlock = (user: User) => {
    dispatch(
      UserUpdate({
        id: user.email,
        changes: user,
      })
    );
    // @ts-ignore
    if (user.email === activeUser?.email) dispatch(setActiveUser(user));
  };

  const onUnBlock = (user: User) => {
    dispatch(
      UserUpdate({
        id: user.email,
        changes: user,
      })
    );
    // @ts-ignore
    if (user.email === activeUser?.email) dispatch(setActiveUser(user));
  };

  useSocketListener(UsersEvent.BLOCKED, onBlock);
  useSocketListener(UsersEvent.UN_BLOCKED, onUnBlock);

  useSocketListener(UsersEvent.NEW_USER, onNewUserConnected);
  useSocketListener(UsersEvent.ACTIVE_USERS, onActiveUsers);
  useSocketListener(SocketEvent.DISCONNECTED, onRemoveUser);

  useEffect(() => {
    if (connected && connection.current) {
      connection.current.emit(UsersEvent.FETCH_USERS);
    }
  }, [connected]);

  useEffect(() => {
    let newUser = {};
    if (Object.values(users.entities).length > 0) {
      newUser = Object.values(users.entities).filter((user) => {
        return user?.isBlocked === false;
      });
    }
    setFilteredUsers(newUser);
  }, [users]);

  return (
    <UsersContext.Provider
      value={{
        filterUsers,
        requestBlockUser,
        requestUnBlockUser,
        activeUser,
        resetActiveUser,
      }}
    >
      {props.children && React.Children.only(props.children)}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

export const useFilterUsers = () => {
  const context = React.useContext(UsersContext);
  return Object.values(context.filterUsers);
};

export const useActiveUser = () => {
  const context = React.useContext(UsersContext);
  return context.activeUser;
};

export const useSetActiveUser = () => {
  const context = React.useContext(UsersContext);
  return context.resetActiveUser;
};

export const useRequestBlockUser = () => {
  const context = React.useContext(UsersContext);
  return context.requestBlockUser;
};

export const useRequestUnBlockUser = () => {
  const context = React.useContext(UsersContext);
  return context.requestUnBlockUser;
};
