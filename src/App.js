import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAccountForm from "./components/CreateAccountForm";
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
import "bootstrap/dist/css/bootstrap.min.css";
import VideoCall from "./pages/VideoCall";
import NotFound from "./pages/errors/NotFound";
import Error from "./pages/errors/Error";

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
        <Route path="/create-account/:userId" element={<CreateAccountForm />} />
        <Route path="/transaction/create" element={<CreateTransferForm />} />
        <Route path="/user/:accountId/details" element={<AccountDetails />} />
        <Route path="/video" element={<VideoCall />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
