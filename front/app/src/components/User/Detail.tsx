import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { Button } from 'antd'
import DefaultLayout from '../Common/Layout';

type User = {
  userId: number;
  nickName: string;
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
    <>
      <DefaultLayout>
        <div>
          <label>ニックネーム：{user?.nickName}</label>
        </div>
        <div>
          <Button
            onClick = {()=> ToDelete()}
          >
            削除
          </Button>

          <Button type="primary" onClick={()=>{navigate(`/user/list`)}}>
            戻る
          </Button>
        </div>
      </DefaultLayout>
    </>
  );
}

export default UserDetail;