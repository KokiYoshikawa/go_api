import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from 'antd'
import {timer} from "../Common/Timer"
import DefaultLayout from '../Common/Layout';

const UserComplete = () => {
  const { state } = useLocation()
  const navigate = useNavigate();
  const [countTime, setCountTime] = useState<number>(5)

  timer(countTime, setCountTime)

  if (countTime === 0) {
    navigate("/user/list")
  }

  return (
    <>
      <DefaultLayout>
        <label>ユーザ{state.word}が完了しました。</label>
        <label>ニックネーム：{state.user.nickName}</label>
        <label>パスワード{state.user.passWord}</label>

        <Button type="primary" onClick={()=>{navigate(`/user/list`)}}>
          戻る
        </Button>
      </DefaultLayout>
    </>
  );
}
export default UserComplete;