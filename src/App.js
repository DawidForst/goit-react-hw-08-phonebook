import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NavBar from "./components/NavBar/NavBar";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter basename="/goit-react-hw-08-phonebook">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<PrivateRoute />}>
          <Route path="/contacts" element={<ContactsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
