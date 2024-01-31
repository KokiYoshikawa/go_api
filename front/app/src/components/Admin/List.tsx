import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import { Button} from 'antd'

type AdminUser = {
  adminUserId: number;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  mailAddress: string;
  rollName: number;
}

const AdminUserList = () => {
  const [adminUsers, setData] = useState<AdminUser[]>([]);
  useEffect(() => {
    axios
    .get("http://localhost:8000/go_api/admin/list")
    .then((response) => {
      // データが取得できた時の処理
      setData(response.data)
    })
  }, [])

  return (
    <>
    <div>
      {adminUsers.length > 0 && adminUsers.map((item) => (
        <div>
          <label>ID：{item.adminUserId}</label>
          <label>姓：{item.firstName}</label>
          <label>名：{item.lastName}</label>
          <label>姓カナ：{item.firstNameKana}</label>
          <label>名カナ：{item.lastNameKana}</label>
          <label>メールアドレス：{item.mailAddress}</label>
          <label>権限：{item.rollName}</label>
          <Link to={`/admin/${item.adminUserId}`}>詳細</Link>
        </div>
      ))}
    </div>
    <Button type="primary" href={`/`}>
      戻る
    </Button>
    </>
  );
};

export default AdminUserList;