import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { timer } from '../Common/Timer';

const NoAuth = () => {
  const navigate = useNavigate()
  const [countTime, setCountTime] = useState<number>(5)

  timer(countTime, setCountTime)

  if (countTime === 0) {
    navigate("/admin")
  }

  return(
    <>
      <label>移動先にアクセスする権限がありません。</label>
      <label>ホーム画面に戻ります。</label>

      <Button
        type="primary"
        onClick={()=>{navigate(`/admin`)}}
      >
        戻る
      </Button>
    </>
  );
}

export default NoAuth;