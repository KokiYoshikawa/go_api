import { Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { RootState } from '../../../redux/Store';
import { useSelector } from 'react-redux';

const Mypage = () => {
  const navigate = useNavigate();
  const authLoginState = useSelector((state:RootState) => state);
  return (
    <>
      <label>ニックネーム：{authLoginState.userAuth.nickName}</label>
      <Button onClick={()=>{navigate('/app')}}>
        戻る
      </Button>
    </>
  );
}

export default Mypage;