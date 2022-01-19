import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../config";
import { useToken } from "./auth";

export const SocketContext = React.createContext<any>(undefined);

const SocketProvider = (props: any) => {
  const accessToken = useToken();
  const [connected, setConnected] = React.useState(false);
  const connection = useRef<any>(null);

  const connect = (accessToken: any) => {
    connection.current = io(API_URL, {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    connection.current.connect();
    setConnected(true);
  };

  const disconnect = () => {
    if (connection.current) {
      connection.current.disconnect();
      setConnected(false);
    }
    connection.current = undefined;
  };

  React.useEffect(() => {
    if (accessToken) connect(accessToken);
    else disconnect();
    // return () => disconnect();
  }, [accessToken]);

  return (
    <SocketContext.Provider
      value={{
        connection,
        connect,
        disconnect,
        connected,
      }}
    >
      {props.children && React.Children.only(props.children)}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocketConnection = () => {
  const { connection } = React.useContext(SocketContext);
  return connection;
};

export const useConnect = () => {
  const { connected } = React.useContext(SocketContext);
  return connected;
};

export function useSocketListener(
  event: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: any
) {
  const { connection, connected } = React.useContext(SocketContext);

  useEffect(() => {
    if (connected) connection.current.on(event, fn);

    return () => {
      if (connection.current) connection.current.off(event, fn);
    };
  }, [event, fn, connected, connection]);
}
