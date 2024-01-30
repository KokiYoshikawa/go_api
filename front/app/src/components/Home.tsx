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
    </div>
    <div>
      <Button
        href={"/user/create"}
      >
        新規登録
      </Button>
    </div>
  </>
  );
}

export default Home;