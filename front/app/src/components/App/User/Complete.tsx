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
        <label>ニックネーム：{state.nickName}</label>
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