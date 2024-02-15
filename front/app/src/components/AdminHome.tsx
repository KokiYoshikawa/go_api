import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from 'antd'
import { AppDispatch, RootState } from '../redux/Store';
import { setAuth, AuthInitialState } from '../redux/authentification/Auth';
import { setLoginState } from '../redux/login/LoggedIn';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from './Common/Layout';

const AdminHome = () => {
  const dispatch:AppDispatch = useDispatch();
  const authLoginState = useSelector((state:RootState) => state);
  const navigate = useNavigate();
  const logout = () => {
    const auth:AuthInitialState = {
      adminUserId: 0,
      nickName: "",
      rollId: 0,
    }
    dispatch(setAuth(auth))
    dispatch(setLoginState(false))
    navigate("/admin/login")
  }

  if (!authLoginState.loggedIn.isLogin) {
    return(
      <>
        <Navigate to="/admin/login"/>
      </>
    );
  }

  return (
    <>
      <DefaultLayout>
        <div>
          ようこそ！
          <label>
            {authLoginState.auth.nickName}
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
      </DefaultLayout>
    </>
  );
}

export default AdminHome;