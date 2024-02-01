import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from 'antd'
import {timer} from "../Common/Timer"

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
      <label>管理者{state.word}が完了しました。</label>
      <label>姓：{state.user.firstName}</label>
      <label>名：{state.user.lastName}</label>
      <label>姓カナ：{state.user.firstNameKana}</label>
      <label>名カナ：{state.user.lastNameKana}</label>
      <label>メールアドレス：{state.user.mailAddress}</label>
      <label>パスワード{state.user.passWord}</label>

      <Button type="primary" href={`/user/list`}>
        戻る
      </Button>
    </>
  );
}
export default UserComplete;