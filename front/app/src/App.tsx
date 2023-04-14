import { useState, useEffect } from 'react';
import axios from "axios";

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  mailAddress: string;
}

const App = () => {
  const [users, setData] = useState<User[]>();

  useEffect(() => {
    axios
    .get("http://localhost:8000/go_api/all")
    .then((response) => {
      // データが取得できた時の処理
      setData(response.data)
    })
  }, [])

  if (!users) return null;

  return (
    <div>
      {users.map( user => (
        <p key={user.userId}>
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
          <span>{user.firstNameKana}</span>
          <span>{user.lastNameKana}</span>
          <span>{user.mailAddress}</span>
        </p>
      ))}
    </div>
  );
}

export default App;