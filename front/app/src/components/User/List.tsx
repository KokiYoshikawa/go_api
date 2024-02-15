import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";
import { Button, Table } from 'antd'
import type { TableColumnsType } from 'antd';
import DefaultLayout from '../Common/Layout';

type User = {
  userId: number;
  nickName: string;
}

const columns: TableColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'userId',
  },
  {
    title: 'ニックネーム',
    dataIndex: 'nickName',
  },
  {
    title: '',
    dataIndex: 'action',
    render: (_, record) => (
      <Link to={`/user/${record.userId}`}>詳細</Link>
    ),
  },
];

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
      <DefaultLayout>
        <div>
          <Table columns={columns} dataSource={users} rowKey={'userId'}/>
        </div>
        <Button type="primary" onClick={()=>{navigate(`/admin`)}}>
          戻る
        </Button>
      </DefaultLayout>
    </>
  );
};

export default UserList;