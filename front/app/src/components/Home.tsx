import { Button } from 'antd'

const Home = () => {

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
  </>
  );
}

export default Home;