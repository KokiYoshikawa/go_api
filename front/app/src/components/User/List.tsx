import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
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

const UserList = () => {
  const navigate = useNavigate();
  const [users, setData] = useState<User[]>([]);
  useEffect(() => {
    axios
    .get("http://localhost:8000/go_api/user/list")
    .then((response) => {
      // データが取得できた時の処理
      setData(response.data)
    })
  }, [])

  return (
    <>
    <div>
      {users.length > 0 && users.map((item) => (
        <div>
          <label>ID：{item.userId}</label>
          <label>姓：{item.firstName}</label>
          <label>名：{item.lastName}</label>
          <label>姓カナ：{item.firstNameKana}</label>
          <label>名カナ：{item.lastNameKana}</label>
          <label>メールアドレス：{item.mailAddress}</label>
          <Link to={`/user/${item.userId}`}>詳細</Link>
        </div>
      ))}
    </div>
    <Button type="primary" onClick={()=>{navigate(`/`)}}>
      戻る
    </Button>
    </>
  );
};

export default UserList;