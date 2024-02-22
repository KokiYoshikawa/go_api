import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { RootState } from '../../../redux/Store';
import { useSelector } from 'react-redux';

type UserForm = {
  userId: number;
  currentPassWord: string;
  passWord: string;
}

const Mypage = () => {
  const navigate = useNavigate();
  const authLoginState = useSelector((state:RootState) => state);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: UserForm) => {
    axios.post("http://localhost:8000/go_api/user/update", {
      userId: authLoginState.userAuth.userId,
      currentPassWord: values.currentPassWord,
      passWord: values.passWord,
    },)
    .then(function (response) {
      if (response.status === 201) {
        navigate("/app/user/complete", { state: {user:{nickName:authLoginState.userAuth.nickName, passWord:values.passWord}, word:"更新"} })
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
      content: '更新に失敗しました。時間を置いて再度お試しください。',
    });
  };

  const ToDelete = () => {
    navigate(`
    /app/user/delete/${authLoginState.userAuth.userId}`,
    { state: { userId: authLoginState.userAuth.userId, nickName: authLoginState.userAuth.nickName } },
    )
  }

  return (
    <>
      <label>ニックネーム：{authLoginState.userAuth.nickName}</label>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}

      >
        <Form.Item
          label="現在のパスワード"
          name="currentPassWord"
          rules={[
            { required: true, message: "現在のパスワードは入力必須です！" },
            { min: 8, max: 50, message: "8文字〜50文字で入力してください" },
            { pattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, message:"半角英数字で記入してください" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="新しいパスワード"
          name="passWord"
          rules={[
            { required: true, message: "新しいパスワードは入力必須です！"} ,
            { min: 8, max: 50, message: "8文字〜50文字で入力してください" },
            { pattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/, message:"半角英数字で記入してください" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登録
          </Button>
        </Form.Item>
      </Form>

      <Button onClick = {()=> ToDelete()}>
        削除
      </Button>

      <Button onClick={()=>{navigate('/app')}}>
        戻る
      </Button>
    </>
  );
}

export default Mypage;