import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { setLoginAndAutoInfoToLocalStorage } from "./Auth/AuthContextProvider";

const Home = () => {
  const navigate = useNavigate();
  const logout = () => {
    setLoginAndAutoInfoToLocalStorage({
      admin: {adminUserId: 0,
        firstName: "",
        lastName: "",
        rollId: 0},
      isLogin: false,
    });
    navigate("/admin/login", {state: false})
  }

  return (
    <>
    <div>ようこそ！</div>
    <div>
      <Button
        href={"/user/list"}
      >
        利用ユーザ一覧
      </Button>
      <Button
        href={"/user/create"}
      >
        利用ユーザ新規登録
      </Button>
    </div>
    <div>
      <Button
        href={"/admin/list"}
      >
        管理ユーザ一覧
      </Button>
      <Button
        href={"/admin/create"}
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