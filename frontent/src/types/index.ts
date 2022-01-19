export interface User {
  email: string;
  date: string;
  isBlockedByUser: boolean;
  isBlocked: boolean;
}

export interface Message {
  localKey: string;
  content: string;
  from: string;
  to: string;
  done?: boolean;
  localDate: Date | string;
}

export enum SocketEvent {
  DISCONNECTED = "SOCKET:DISCONNECTED",
  CONNECTED = "SOCKET:CONNECTED",
}

/* eslint-disable no-shadow */
export enum MessageEvent {
  MESSAGE = "MESSAGE:MESSAGE",
  ACTIVE_USER_MESSAGES = "MESSAGE:ACTIVE_USER_MESSAGES",
  STARTED_TYPING = "message:started-typing",
  FINISHED_TYPING = "message:finished-typing",
}

export enum UsersEvent {
  NEW_USER = "USER:NEW_USER",
  FETCH_USERS = "USER:FETCH_USERS",
  ACTIVE_USERS = "USER:ACTIVE_USERS",
  BLOCK_USER = "USER:BLOCK_USER",
  UN_BLOCK_USER = "USER:UN_BLOCK_USER",
  BLOCKED = "USER:BLOCKED",
  UN_BLOCKED = "USER:UN_BLOCKED",
}
