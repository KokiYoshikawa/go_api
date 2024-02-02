import { useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Form, Input, Button, message} from 'antd'
import axios from "axios";
import { LoginAndAuthInfoContext, setLoginAndAutoInfoToLocalStorage } from "../Auth/AuthContextProvider";

type AdminLoginForm = {
  mailAddress: string;
  passWord: string;
}

const AdminLogin = () => {
  const { state } = useLocation()
  const isLogout = useRef(state);
  const loginAndAuth = useContext(LoginAndAuthInfoContext);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: AdminLoginForm) => {
    axios.post("http://localhost:8000/go_api/admin/login", {
      mailAddress: values.mailAddress,
      passWord: values.passWord
    },)
    .then(function (response) {
      if (response.status === 200) {
        setLoginAndAutoInfoToLocalStorage({
          admin: {adminUserId: response.data.adminUserId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            rollId: response.data.rollId},
          isLogin: true,
        });
        navigate("/")
      } else {
        failure()
      }
    })
    .catch(function (error) {
      console.log(error);
      failure()
    });
  }

  const failure = () => {
    messageApi.open({
      type: 'error',
      content: 'ログインに失敗しました。',
    });
  };

  const loggedOut = () => {
    messageApi.open({
      type: 'warning',
      content: 'ログアウトしています！',
    });
  };

  useEffect(() => {
    if (!isLogout.current) {
      isLogout.current = true;
      loggedOut()
    }
  }, [])

  if (loginAndAuth.isLogin) {
    return (
      <Navigate to="/"/>
    );
  }

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