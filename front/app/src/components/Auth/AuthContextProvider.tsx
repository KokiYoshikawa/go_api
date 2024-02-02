import React, { useEffect, useContext } from "react";
import { Navigate} from 'react-router-dom';

export interface LoginAndAuthInfo {
  admin: AuthUserInfo;
  isLogin: boolean;
}

type AuthUserInfo = {
  adminUserId: number;
  firstName: string;
  lastName: string;
  rollId: number;
};

type Props = {
  children?: React.ReactNode;
};

export const LoginAndAuthInfoContext = React.createContext<LoginAndAuthInfo>({
  admin: {adminUserId: 0, firstName: "", lastName: "", rollId: 0},
  isLogin: false,
});

export const AuthContextProvider: React.FC<Props> = (props) => {
  const context: LoginAndAuthInfo = useContext(LoginAndAuthInfoContext);

  const loginAndAuth:LoginAndAuthInfo = {
    admin: context.admin,
    isLogin: context.isLogin,
  }

  useEffect(() => {
    if (!context.isLogin) {
      setLoginAndAutoInfoToLocalStorage(loginAndAuth);
    } else {
      setLoginAndAutoInfoToLocalStorage({
        admin: {adminUserId: 0, firstName: "", lastName: "", rollId: 0},
        isLogin: false});
    }
  }, [loginAndAuth]);
  return (
    <LoginAndAuthInfoContext.Provider value={loginAndAuth}>
      {props.children}
    </LoginAndAuthInfoContext.Provider>
  );
};

export const ToLogin: React.FC<Props> = (props) => {
  const loginAndAuth = getLoginAndAutoInfoToLocalStorage();

  if (loginAndAuth.isLogin) {
    return (
      <>
        {props.children}
      </>
    );
  } else {
    return (
      <Navigate to="/admin/login"/>
    );
  }
}

export function getLoginAndAutoInfoToLocalStorage(): LoginAndAuthInfo {
  const json = window.localStorage.getItem("loginAndAuth")
  let loginAndAuth:LoginAndAuthInfo = {
    admin: {
      adminUserId: 0,
      firstName: "",
      lastName: "",
      rollId: 0
    },
    isLogin: false,
  }

  if (json !== null) {
    loginAndAuth = JSON.parse(json)
  } else {
    return loginAndAuth
  }

  return loginAndAuth;
}

export function setLoginAndAutoInfoToLocalStorage(loginAndAuth: LoginAndAuthInfo): void {
  const isStringfy = JSON.stringify(loginAndAuth);
  window.localStorage.setItem("loginAndAuth", isStringfy);
}
