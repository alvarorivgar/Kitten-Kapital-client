import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAdminForm from './components/CreateAdminForm';
import CreateUserForm from './components/CreateUserForm';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/admin/create' element={<CreateAdminForm />} />
        <Route path='/admin/create-user' element={<CreateUserForm />} />
        <Route path='/login' element={<Login />} />
      </Routes>


    </div>
  );
}

export default App;
