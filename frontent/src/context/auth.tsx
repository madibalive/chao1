import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "../redux/store";

export const AuthContext = React.createContext<any>(undefined);

const AuthProvider = (props: any) => {
  const [accessToken, setaccessToken] = useState();

  useEffect(() => {}, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setaccessToken,
      }}
    >
      {props.children && React.Children.only(props.children)}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useToken = () => {
  const context = React.useContext(AuthContext);
  return context.accessToken;
};

export const useSetToken = () => {
  const context = React.useContext(AuthContext);
  return context.setaccessToken;
};
