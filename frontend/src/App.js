import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Contexts";
import Bus from "./Pages/Admin/Bus";
import AddBus from "./Pages/Admin/Bus/AddBus";
import Coupons from "./Pages/Admin/Coupons";
import Bookings from "./Pages/Admin/Bookings";
import Home from "./Pages/Admin/Home";
import HomePage from "./Pages/User/HomePage";
import Admin from "./Pages/Admin/Admin";
import Buses from "./Pages/User/Buses";
import Booking from "./Pages/User/Booking";
import Dashboard from "./Pages/User/Dashboard";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buses/:name/:city/:date" element={<Buses />} />
            <Route
              path="/booking/:movieDetails/:seatNo"
              element={<Booking />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Home />} />
              <Route path="/admin/bus" element={<Bus />} />
              <Route path="/admin/addbus" element={<AddBus />} />
              <Route path="/admin/coupons" element={<Coupons />} />
              <Route path="/admin/bookings" element={<Bookings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
