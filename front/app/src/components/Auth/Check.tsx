import { useNavigate, Navigate } from 'react-router-dom';
import { LoginAndAuth }  from '../../redux/Type/LoginAndAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

export function CheckLoginAndAuth(props:LoginAndAuth) {
  const navigate = useNavigate();
  if (props.loggedIn.isLogin) {
    if (props.auth.adminUserId === 0 || props.auth.rollId !== 1) {
      return (
        navigate("/")
      );
    }
  } else {
    return (
      navigate("/admin/login")
    );
  }
}

type Props = {
  children?: React.ReactNode
}

export const Check:React.FC<Props> = (props) => {
  const authLoginState = useSelector((state:RootState) => state);

  if (authLoginState.loggedIn.isLogin) {
    if (authLoginState.auth.adminUserId === 0 || authLoginState.auth.rollId !== 1) {
      return (
        <>
          <Navigate to={"/"}/>
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