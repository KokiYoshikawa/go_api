import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
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

const AdminUserDetail = () => {
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();
  const [admin_user, setData] = useState<AdminUser>()
  useEffect(() => {
    axios
    .get(`http://localhost:8000/go_api/admin/${param.id}`)
    .then((response) => {
      // データが取得できた時の処理
      setData(response.data)
    })
  }, [])

  const ToDelete = () => {
    navigate(`../admin/delete/${param.id}`, { state: admin_user })
  }

  return (
    <>
    <div>
      <label>姓：{admin_user?.firstName}</label>
      <label>名：{admin_user?.lastName}</label>
      <label>姓カナ：{admin_user?.firstNameKana}</label>
      <label>名カナ：{admin_user?.lastNameKana}</label>
      <label>メールアドレス：{admin_user?.mailAddress}</label>
      <label>権限：{admin_user?.rollName}</label>
      <Button
        onClick = {()=> ToDelete()}
      >
        削除
      </Button>

      <Button type="primary" onClick={()=>{navigate(`/admin/list`)}}>
        戻る
      </Button>

    </div>
    </>
  );
}

export default AdminUserDetail;