import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import axios from "axios";
import DefaultLayout from '../Common/Layout';

type UserForm = {
  nickName: string;
  passWord: string;
}

const UserCreate = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: UserForm) => {
    axios.post("http://localhost:8000/go_api/user/create", {
      nickName: values.nickName,
      passWord: values.passWord
    },)
    .then(function (response) {
      if (response.status === 201) {
        navigate("/user/complete", { state: {user:values, word:"登録"} })
      } else {
        failure()
      }
    })
    .catch(function (error) {
      failure()
      console.log(error);
    });
  }

  const failure = () => {
    messageApi.open({
      type: 'error',
      content: 'ユーザの登録に失敗しました。',
    });
  };

  return (
    <>
      <DefaultLayout>
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
              { required: true, message: "ニックネームは入力必須です！" },
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
              { min: 8, max: 50, message: "8文字〜50文字で入力してください" },
              { pattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, message:"半角英数字で記入してください"}
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登録
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={()=>{navigate(`/admin`)}}>
              戻る
            </Button>
          </Form.Item>
        </Form>
      </DefaultLayout>
    </>
  );
}

export default UserCreate;