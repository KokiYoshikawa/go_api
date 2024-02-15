import { Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/Store';
import { setAuth, AuthInitialState } from '../redux/authentification/UserAuth';
import { setLoginState } from '../redux/login/LoggedIn';
import { useSelector, useDispatch } from 'react-redux';

const AppHome = () => {
  const dispatch:AppDispatch = useDispatch();
  const authLoginState = useSelector((state:RootState) => state);
  const navigate = useNavigate();
  const logout = () => {
    const auth:AuthInitialState = {
      userId: 0,
      nickName: "",
    }
    dispatch(setAuth(auth))
    dispatch(setLoginState(false))
    navigate("/app/user/logout")
  }

  const LoginButton = () => {
    return (
      <>
        <Button href={'/app/user/login'}>
          ログイン
        </Button>
      </>
    );
  }

  const LogoutButton = () => {
    return (
      <>
        <Button onClick={()=>{logout()}}>
          ログアウト
        </Button>
      </>
    );
  }

  return (
    <>
      app名にようこそ！ <br/>
      <Button href={'/app/user/create'}>
        ユーザ登録
      </Button>
      { authLoginState.loggedIn.isLogin ? <LogoutButton/>: <LoginButton/> }
    </>
  );
}
export default AppHome;
