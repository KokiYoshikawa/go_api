import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from 'antd'
import {timer} from "../Common/Timer"
import DefaultLayout from '../Common/Layout';

const AdminComplete = () => {
  const { state } = useLocation()
  const navigate = useNavigate();
  const [countTime, setCountTime] = useState<number>(5)

  timer(countTime, setCountTime)

  if (countTime === 0) {
    navigate("/admin/list")
  }

  return (
    <>
      <DefaultLayout>
        <label>ユーザ{state.word}が完了しました。</label>
        <label>姓：{state.user.firstName}</label>
        <label>名：{state.user.lastName}</label>
        <label>姓カナ：{state.user.firstNameKana}</label>
        <label>名カナ：{state.user.lastNameKana}</label>
        <label>メールアドレス：{state.user.mailAddress}</label>
        <label>パスワード{state.user.passWord}</label>

        <Button
          type="primary"
          onClick={()=>{navigate(`/admin/list`)}}
        >
          戻る
        </Button>
      </DefaultLayout>
    </>
  );
}
export default AdminComplete;