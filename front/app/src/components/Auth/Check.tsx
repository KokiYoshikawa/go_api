import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

type Props = {
  children?: React.ReactNode
}

export const LoginCheck:React.FC<Props> = (props) => {
  const loginState = useSelector((state:RootState) => state);

  if (loginState.loggedIn.isLogin) {
    return (
      <>{props.children}</>
    );
  } else {
    return (
      <>
        <Navigate to={"/admin/login"}/>
      </>
    );
  }
}

export const AuthCheck:React.FC<Props> = (props) => {
  const authLoginState = useSelector((state:RootState) => state);

  if (authLoginState.loggedIn.isLogin) {
    if (authLoginState.auth.adminUserId === 0 || authLoginState.auth.rollId !== 1) {
      return (
        <>
          <Navigate to={"/admin/noauth"}/>
        </>
      );
    } else {
      return (
        <>{props.children}</>
      );
    }
  } else {
    return (
      <>
        <Navigate to={"/admin/login"}/>
      </>
    );
  }
}