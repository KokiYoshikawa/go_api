import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { Button} from 'antd'
import DefaultLayout from '../Common/Layout';

type AdminUser = {
  adminUserId: number;
  nickName: string;
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
     <DefaultLayout>
      <div>
        <label>ニックネーム：{admin_user?.nickName}</label>
        <label>権限：{admin_user?.rollName}</label>
      </div>
      <div>
        <Button
          onClick = {()=> ToDelete()}
        >
          削除
        </Button>

        <Button type="primary" onClick={()=>{navigate(`/admin/list`)}}>
          戻る
        </Button>
      </div>
     </DefaultLayout>
    </>
  );
}

export default AdminUserDetail;