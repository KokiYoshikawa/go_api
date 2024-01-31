import { Form, Button, message} from 'antd'
import { useLocation } from "react-router-dom"
import axios from "axios";

const AdminUserDelete = ()=> {
  const { state } = useLocation()
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = () => {
    axios.delete(`http://localhost:8000/go_api/admin/delete/${state.adminUserId}`, {
      data: {adminUserId: state.adminUserId}}).then(res => {
        if (res.data === 1) {
          success()
        } else {
          error()
        }
   })
  }
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'ユーザの削除に成功しました。',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'ユーザの削除に失敗しました。',
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <label>本当にこのユーザを削除しますか？</label>
      </div>
      <label>姓：{state.firstName}</label>
      <label>名：{state.lastName}</label>
      <label>姓カナ：{state.firstNameKana}</label>
      <label>名カナ：{state.lastNameKana}</label>
      <label>メールアドレス：{state.mailAddress}</label>
      <label>権限：{state.rollName}</label>

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
          <Button type="primary" htmlType="submit" href={`/admin/${state.adminUserId}`}>
            戻る
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AdminUserDelete;