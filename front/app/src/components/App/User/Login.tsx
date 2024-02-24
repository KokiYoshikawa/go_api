import { useNavigate, Navigate } from 'react-router-dom'
import { Form, Input, Button, message} from 'antd'
import axios from "axios";
import { AppDispatch, RootState } from '../../../redux/Store';
import { setAuth } from '../../../redux/authentification/UserAuth';
import { setLoginState } from '../../../redux/login/LoggedIn';
import { useSelector, useDispatch } from 'react-redux';

type UserLoginForm = {
  nickName: string;
  passWord: string;
}

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();
  const authLoginState = useSelector((state:RootState) => state);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: UserLoginForm) => {
    axios.post("http://localhost:8000/go_api/user/login", {
      nickName: values.nickName,
      passWord: values.passWord
    },)
    .then(function (response) {
      if (response.status === 200) {
        const authInfo= {
          userId: response.data.userId,
          nickName: response.data.nickName,
        }
        dispatch(setAuth(authInfo));
        dispatch(setLoginState(true))
        navigate("/app")
      } else {
        failure()
      }
    })
    .catch(function (error) {
      failure()
    });
  }

  const failure = () => {
    messageApi.open({
      type: 'error',
      content: 'ログインに失敗しました。',
    });
  };

  if (authLoginState.loggedIn.isLogin) {
    return (
      <Navigate to="/app"/>
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
            label="ニックネーム"
            name="nickName"
            rules={[
              { required: true, message: "姓は入力必須です！" },
              { min: 1, max: 50, message: "1文字〜50文字で入力してください" }
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
export default UserLogin;