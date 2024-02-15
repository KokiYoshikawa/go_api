import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
import AppHome from './components/AppHome';
import AppUserLogin from './components/App/User/Login';
import AppUserLogout from './components/App/User/Logout';
import AppUserCreate from './components/App/User/Create';
import Mypage from './components/App/User/MyPage';
import AppComplete from './components/App/User/Complete';
import AdminHome from './components/AdminHome';
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
import NoAuth from './components/Auth/NoAuth';
import NotFound from './components/NotFound';
import { LoginCheck, AuthCheck } from './components/Auth/Check';
import store from './redux/Store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store)

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/app" element={<AppHome />} />
              <Route path="/app/user/login" element={<AppUserLogin />} />
              <Route path="/app/user/logout" element={<AppUserLogout />} />
              <Route path="/app/user/create" element={<AppUserCreate />} />
              <Route path="/app/user/complete" element={<AppComplete/>} />
              <Route path="/app/user/mypage" element={<Mypage/>} />
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/user/:id" element={<LoginCheck><UserDetail/></LoginCheck>} />
              <Route path="/user/list" element={<LoginCheck><UserList/></LoginCheck>} />
              <Route path="/user/create" element={<AuthCheck><UserCreate/></AuthCheck>} />
              <Route path="/user/delete/:id" element={<AuthCheck><UserDelete/></AuthCheck>} />
              <Route path="/user/complete" element={<AuthCheck><UserComplete/></AuthCheck>} />
              <Route path="/admin/login" element={<AdminLogin/>} />
              <Route path="/admin/:id" element={<LoginCheck><AdminDetail/></LoginCheck>} />
              <Route path="/admin/list" element={<LoginCheck><AdminList/></LoginCheck>} />
              <Route path="/admin/create" element={<AuthCheck><AdminCreate/></AuthCheck>} />
              <Route path="/admin/delete/:id" element={<AuthCheck><AdminDelete/></AuthCheck>} />
              <Route path="/admin/complete" element={<AuthCheck><AdminComplete/></AuthCheck>} />
              <Route path="/admin/noauth" element={<NoAuth/>} />
              <Route path="/*" element={<NotFound/>} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;