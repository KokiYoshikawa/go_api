import { Button, Form, message } from 'antd';
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";

const AppUserDelete = () => {
  const { state } = useLocation()
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = () => {
    axios.delete(`http://localhost:8000/go_api/user/delete/${state.userId}`, {
      data: {userId: state.userId}}).then(res => {
        if (res.data === 1) {
          navigate('/app/user/complete', { state: { user: { nickName: state.nickName, passWord: "****" }, word:"削除" } })
        } else {
          error()
        }
   })
  }

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'ユーザの削除に失敗しました。',
    });
  };

  return (
    <>
      {contextHolder}
      <label>ユーザ登録を解除します。よろしいですか？</label>
      <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" danger={true} htmlType="submit">
              削除
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit"
              onClick={()=>{navigate(`/app/user/mypage`)}}
            >
              戻る
            </Button>
          </Form.Item>
        </Form>
    </>
  );
}

export default AppUserDelete;