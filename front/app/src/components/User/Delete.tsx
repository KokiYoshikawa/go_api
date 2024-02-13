import { Form, Button, message} from 'antd'
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import DefaultLayout from '../Common/Layout';

const UserDelete = ()=> {
  const { state } = useLocation()
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = () => {
    axios.delete(`http://localhost:8000/go_api/user/delete/${state.userId}`, {
      data: {userId: state.userId}}).then(res => {
        if (res.data === 1) {
          navigate("/user/complete", { state: {user:state, word:"削除"} })
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
      <DefaultLayout>
        {contextHolder}
        <div>
          <label>本当にこのユーザを削除しますか？</label>
        </div>
        <label>姓：{state.firstName}</label>
        <label>名：{state.lastName}</label>
        <label>姓カナ：{state.firstNameKana}</label>
        <label>名カナ：{state.lastNameKana}</label>
        <label>メールアドレス：{state.mailAddress}</label>

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
            <Button type="primary" htmlType="submit" onClick={()=>{navigate(`/user/${state.userId}`)}}>
              戻る
            </Button>
          </Form.Item>
        </Form>
      </DefaultLayout>
    </>
  )
}

export default UserDelete;