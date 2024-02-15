import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { Form, Input, Button, message} from 'antd'
import axios from "axios";
import DefaultLayout from '../Common/Layout';

type AdminUserForm = {
  nickName: string;
  rollId: number;
  passWord: string;
}

const AdminUserCreate = () => {
  const navigate = useNavigate();
  const authLoginState = useSelector((state:RootState) => state);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: AdminUserForm) => {
    axios.post("http://localhost:8000/go_api/admin/create", {
      nickName: values.nickName,
      rollId: values.rollId,
      passWord: values.passWord
    },)
    .then(function (response) {
      if (response.status === 201) {
        navigate("/admin/complete", { state: {user:values, word:"登録"} })
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
              { required: true, message: "姓は入力必須です！" },
              { min: 1, max: 50, message: "1文字〜50文字で入力してください" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="権限"
            name="rollId"
            rules={[
              {required: true, message: "権限は入力必須です！"},
              { pattern: /[1-2]{1}/, message:"1または2を入力してください"}
            ]}
          >
            <Input/>
            {/* <label>1:管理者、2:一般</label> */}
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
              登録
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              onClick={()=>{navigate(`/admin`)}}
            >
              戻る
            </Button>
          </Form.Item>
        </Form>
      </DefaultLayout>
    </>
  );
}

export default AdminUserCreate;