import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAdminForm from './components/CreateAdminForm';
import CreateUserForm from './components/CreateUserForm';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import HomeAnon from './pages/HomeAnon';
import HomeLogged from './pages/HomeLogged'

function App() {
  return (
    <div className="App">
      <Navbar />


      <Routes>
        <Route path='/admin/create-user' element={<CreateUserForm />} />
        <Route path="/" element={<HomeAnon />} />
        <Route path='/admin/create-admin' element={<CreateAdminForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/' element={<HomeLogged /> } />
      </Routes>


    </div>
  );
}

export default App;
