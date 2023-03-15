import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAccountForm from './components/CreateAccountForm';
import CreateAdminForm from "./components/CreateAdminForm";
import CreateTransferForm from "./components/CreateTransferForm";
import CreateUserForm from "./components/CreateUserForm";
import Navbar from "./components/Navbar";
import MyClients from "./pages/admin/MyClients";
import AccountDetails from "./pages/AccountDetails";
import SearchUsers from "./pages/admin/SearchUsers";
import UserDetails from "./pages/admin/UserDetails";
import Login from "./pages/auth/Login";
import HomeAnon from "./pages/HomeAnon";
import HomeLogged from "./pages/HomeLogged";
import Profile from "./pages/Profile";
import EditProfileForm from "./components/EditProfileForm";

function App() {

  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/admin/create-user" element={<CreateUserForm />} />
        <Route path="/admin/create-admin" element={<CreateAdminForm />} />
        <Route path="/admin/user-search" element={<SearchUsers />} />
        <Route path="/admin/user-details/:userId" element={<UserDetails />} />
        <Route path="/admin/my-clients" element={<MyClients />} />
        <Route path="/" element={<HomeAnon />} />
        <Route path="/user/" element={<HomeLogged />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/profile/edit" element={<EditProfileForm />} />
        <Route path="/create-account/:userId" element={<CreateAccountForm />} />
        <Route path="/transaction/create" element={<CreateTransferForm />} />
        <Route path="/user/:accountId/details" element={<AccountDetails />} />
      </Routes>
    </div>
  );
}

export default App;
