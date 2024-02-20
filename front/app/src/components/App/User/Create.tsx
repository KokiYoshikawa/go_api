import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import axios from "axios";

type UserForm = {
  nickName: string;
  passWord: string;
}

const AppUserCreate = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: UserForm) => {
    axios.post("http://localhost:8000/go_api/user/create", {
      nickName: values.nickName,
      passWord: values.passWord
    },)
    .then(function (response) {
      if (response.status === 201) {
        navigate("/app/user/complete", { state: {user:values, word:"登録"} })
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
      content: '登録に失敗しました。時間を置いて再度お試しください。',
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
          <Button type="primary" onClick={()=>{navigate(`/app`)}}>
            戻る
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AppUserCreate;