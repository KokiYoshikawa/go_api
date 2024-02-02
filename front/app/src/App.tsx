import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
import Home from './components/Home';
import UserDetail from './components/User/Detail';
import UserList from './components/User/List';
import UserCreate from './components/User/Create';
import UserDelete from './components/User/Delete';
import UserComplete from './components/User/Complete';
import AdminLogin from './components/Admin/Login';
import AdminDetail from './components/Admin/Detail';
import AdminList from './components/Admin/List';
import AdminCreate from './components/Admin/Create';
import AdminDelete from './components/Admin/Delete';
import AdminComplete from './components/Admin/Complete';
import NotFound from './components/NotFound';
import { ToLogin} from './components/Auth/AuthContextProvider';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ToLogin><Home /></ToLogin>} />
          <Route path="/user/:id" element={<ToLogin><UserDetail/></ToLogin>} />
          <Route path="/user/list" element={<ToLogin><UserList/></ToLogin>} />
          <Route path="/user/create" element={<ToLogin><UserCreate/></ToLogin>} />
          <Route path="/user/delete/:id" element={<ToLogin><UserDelete/></ToLogin>} />
          <Route path="/user/complete" element={<ToLogin><UserComplete/></ToLogin>} />
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/:id" element={<ToLogin><AdminDetail/></ToLogin>} />
          <Route path="/admin/list" element={<ToLogin><AdminList/></ToLogin>} />
          <Route path="/admin/create" element={<ToLogin><AdminCreate/></ToLogin>} />
          <Route path="/admin/delete/:id" element={<ToLogin><AdminDelete/></ToLogin>} />
          <Route path="/admin/complete" element={<AdminComplete/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;