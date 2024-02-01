import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message} from 'antd'
import axios from "axios";

type AdminLoginForm = {
  mailAddress: string;
  passWord: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: AdminLoginForm) => {
    axios.post("http://localhost:8000/go_api/admin/login", {
      mailAddress: values.mailAddress,
      passWord: values.passWord
    },)
    .then(function (response) {
      if (response.status === 200) {
        navigate("/")
      } else {
        failure()
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const failure = () => {
    messageApi.open({
      type: 'error',
      content: 'ログインに失敗しました。',
    });
  };

  return (
    <>
      {contextHolder}
      <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      >
        <Form.Item
          label="メールアドレス"
          name="mailAddress"
          rules={[
            {required: true, message: "メールアドレスは入力必須です！"},
            { min: 1, max: 100, message: "1文字〜100文字で入力してください" },
            { pattern: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, message:"入力規則に反した文字です"}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="パスワード"
          name="passWord"
          rules={[
            {required: true, message: "パスワードは入力必須です！"},
            { min: 1, max: 50, message: "8文字〜50文字で入力してください" },
            { pattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, message:"半角英数字で記入してください"}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          ログイン
        </Button>
      </Form.Item>
      </Form>
    </>
  );
}
export default AdminLogin;