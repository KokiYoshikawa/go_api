import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message} from 'antd'
import { CheckLoginAndAuth } from '../Auth/Check';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import axios from "axios";

type UserForm = {
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  mailAddress: string;
  passWord: string;
}

const UserCreate = () => {
  const navigate = useNavigate();
  const authLoginState = useSelector((state:RootState) => state);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: UserForm) => {
    axios.post("http://localhost:8000/go_api/user/create", {
      firstName: values.firstName,
      lastName: values.lastName,
      firstNameKana: values.firstNameKana,
      lastNameKana: values.lastNameKana,
      mailAddress: values.mailAddress,
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
      {CheckLoginAndAuth(authLoginState)}
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}

      >
        <Form.Item
          label="姓"
          name="firstName"
          rules={[
            { required: true, message: "姓は入力必須です！" },
            { min: 1, max: 50, message: "1文字〜50文字で入力してください" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="名"
          name="lastName"
          rules={[
            { required: true, message: "名は入力必須です！" },
            { min: 1, max: 50, message: "1文字〜50文字で入力してください" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="姓カナ"
          name="firstNameKana"
          rules={[
            { required: true, message: "姓カナは入力必須です！" },
            { min: 1, max: 50, message: "1文字〜50文字で入力してください" },
            { pattern: /^[ァ-ヴ]+$/, message: "全角カナ文字で入力してください" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="名カナ"
          name="lastNameKana"
          rules={[
            {required: true, message: "名カナは入力必須です！"},
            { min: 1, max: 50, message: "1文字〜50文字で入力してください" },
            { pattern: /^[ァ-ヴ]+$/, message: "全角カナ文字で入力してください" }
          ]}
        >
          <Input />
        </Form.Item>
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
          <Button type="primary" onClick={()=>{navigate(`/`)}}>
            戻る
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UserCreate;