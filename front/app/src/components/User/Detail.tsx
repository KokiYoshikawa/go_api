import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { Button} from 'antd'

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  mailAddress: string;
}

const UserDetail = () => {
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();
  const [user, setData] = useState<User>()
  useEffect(() => {
    axios
    .get(`http://localhost:8000/go_api/user/${param.id}`)
    .then((response) => {
      // データが取得できた時の処理
      setData(response.data)
    })
  }, [])

  const ToDelete = () => {
    navigate(`../user/delete/${param.id}`, { state: user })
  }

  return (
    <div>
      <label>姓：{user?.firstName}</label>
      <label>名：{user?.lastName}</label>
      <label>姓カナ：{user?.firstNameKana}</label>
      <label>名カナ：{user?.lastNameKana}</label>
      <label>メールアドレス：{user?.mailAddress}</label>

      <Button
        onClick = {()=> ToDelete()}
      >
        削除
      </Button>

      <Button type="primary" href={`/user/list`}>
        戻る
      </Button>

    </div>
  );
}

export default UserDetail;