import { Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/Store';
import { setAuth, AuthInitialState } from '../redux/authentification/UserAuth';
import { setLoginState } from '../redux/login/LoggedIn';
import { useSelector, useDispatch } from 'react-redux';
// import { AppStyle } from '../components/Common/Layout';

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

  const IsLogout = () => {
    return (
      <>
        <Button onClick={()=>{navigate('/app/user/create')}}>
          ユーザ登録
        </Button>
        <Button href={'/app/user/login'}>
          ログイン
        </Button>
      </>
    );
  }

  const IsLogin = () => {
    return (
      <>
        <Button onClick={()=>{navigate('/app/user/mypage')}}>
          マイページ
        </Button>
        <Button onClick={()=>{logout()}}>
          ログアウト
        </Button>
      </>
    );
  }

  return (
    <>
      {/* <AppStyle> */}
        app名にようこそ！ <br/>
        { authLoginState.loggedIn.isLogin ? <IsLogin/>: <IsLogout/> }
      {/* </AppStyle> */}
    </>
  );
}
export default AppHome;
