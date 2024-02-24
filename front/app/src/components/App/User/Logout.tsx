import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from 'antd'
import { timer } from "../../Common/Timer"

const AppUserLogout = () => {
  const navigate = useNavigate();
  const [countTime, setCountTime] = useState<number>(5)

  timer(countTime, setCountTime)

  if (countTime === 0) {
    navigate("/app")
  }

  return (
    <>
      <label>ログアウトしました！</label>
      <label>{countTime}秒後にホーム画面に戻ります</label>

      <Button type="primary" onClick={()=>{navigate(`/app`)}}>
        戻る
      </Button>
    </>
  );
}

export default AppUserLogout;