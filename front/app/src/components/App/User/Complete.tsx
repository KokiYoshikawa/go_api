import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from 'antd'
import {timer} from "../../Common/Timer"
import DefaultLayout from '../../Common/Layout';

const AppUserComplete = () => {
  const { state } = useLocation()
  const navigate = useNavigate();
  const [countTime, setCountTime] = useState<number>(5)

  timer(countTime, setCountTime)

  if (countTime === 0) {
    navigate("/app")
  }

  return (
    <>
      <DefaultLayout>
        <label>登録が完了しました。</label>
        <label>姓：{state.firstName}</label>
        <label>名：{state.lastName}</label>
        <label>姓カナ：{state.firstNameKana}</label>
        <label>名カナ：{state.lastNameKana}</label>
        <label>メールアドレス：{state.mailAddress}</label>
        <label>パスワード{state.passWord}</label>

        <div>
          <label>あと{countTime}秒でホーム画面に戻ります。</label>
        </div>

        <Button type="primary" onClick={()=>{navigate(`/app`)}}>
          戻る
        </Button>
      </DefaultLayout>
    </>
  );
}
export default AppUserComplete;