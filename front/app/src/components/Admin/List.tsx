import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";
import { Button, Table } from 'antd'
import type { TableColumnsType } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import DefaultLayout from '../Common/Layout';

type AdminUser = {
  adminUserId: number;
  nickName: string;
  rollName: number;
}

const columns: TableColumnsType<AdminUser> = [
  {
    title: 'ID',
    dataIndex: 'adminUserId',
  },
  {
    title: 'ニックネーム',
    dataIndex: 'nickName',
  },
  {
    title: '権限',
    dataIndex: 'rollName',
  },
  {
    title: '',
    dataIndex: 'action',
    render: (_, record) => (
      <Link to={`/user/${record.adminUserId}`}>詳細</Link>
    ),
  },
];

const AdminUserList = () => {
  const navigate = useNavigate();
  const authLoginState = useSelector((state:RootState) => state);
  const [adminUsers, setData] = useState<AdminUser[]>([]);
  useEffect(() => {
    axios
    .get("http://localhost:8000/go_api/admin/list")
    .then((response) => {
      // データが取得できた時の処理
      setData(response.data)
    })
  }, [])

  console.log("list", authLoginState)

  return (
    <>
      <DefaultLayout>
        <div>
          <Table columns={columns} dataSource={adminUsers} rowKey={'adminUserId'}/>
        </div>
        <Button type="primary" onClick={()=>{navigate("/admin")}}>
          戻る
        </Button>
      </DefaultLayout>
    </>
  );
};

export default AdminUserList;