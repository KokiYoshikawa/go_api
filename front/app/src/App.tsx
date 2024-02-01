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

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetail/>} />
          <Route path="/user/list" element={<UserList/>} />
          <Route path="/user/create" element={<UserCreate/>} />
          <Route path="/user/delete/:id" element={<UserDelete/>} />
          <Route path="/user/complete" element={<UserComplete/>} />
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/:id" element={<AdminDetail/>} />
          <Route path="/admin/list" element={<AdminList/>} />
          <Route path="/admin/create" element={<AdminCreate/>} />
          <Route path="/admin/delete/:id" element={<AdminDelete/>} />
          <Route path="/admin/complete" element={<AdminComplete/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;