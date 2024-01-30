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
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;