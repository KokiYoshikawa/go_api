import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from 'antd'
import { AppDispatch, RootState } from '../redux/Store';
import { setAuth, AuthInitialState } from '../redux/authentification/Auth';
import { setLoginState } from '../redux/login/LoggedIn';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch:AppDispatch = useDispatch();
  const authLoginState = useSelector((state:RootState) => state);
  const navigate = useNavigate();
  const logout = () => {
    const auth:AuthInitialState = {
      adminUserId: 0,
      firstName: "",
      lastName: "",
      rollId: 0,
    }
    dispatch(setAuth(auth))
    dispatch(setLoginState(false))
    navigate("/admin/login")
  }

  console.log("home", authLoginState)

  if (!authLoginState.loggedIn.isLogin) {
    return(
      <>
        <Navigate to="/admin/login"/>
      </>
    );
  }

  return (
    <>
      <div>
        ようこそ！
        <label>
          {authLoginState.auth.firstName + authLoginState.auth.lastName}
        </label>
      </div>
      <div>
        <Button
          onClick={()=>(
            navigate("/user/list")
          )}
        >
          利用ユーザ一覧
        </Button>
        <Button
          onClick={()=>(
            navigate("/user/create")
          )}
        >
          利用ユーザ新規登録
        </Button>
      </div>
      <div>
        <Button
          onClick={()=>(
            navigate("/admin/list")
          )}
        >
          管理ユーザ一覧
        </Button>
        <Button
          onClick={()=>(
            navigate("/admin/create")
          )}
        >
          管理ユーザ新規登録
        </Button>
      </div>
      <div>
        <Button
          onClick={() => logout()}
        >
          ログアウト
        </Button>
      </div>
    </>
  );
}

export default Home;