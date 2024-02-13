import { Button } from 'antd';

const AppHome = () => {
  return (
    <>
      app名にようこそ！ <br/>
      <Button href={'/app/user/create'}>
        ユーザ登録
      </Button>
    </>
  );
}

export default AppHome;