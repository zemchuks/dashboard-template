import Administration from "./pages/Administration";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import AdminForgotPassword from "./pages/forms/AdminPass";
// import CompanySignup from "./pages/forms/CompanySignup";
import Logins from "./pages/forms/Logins";
// import CompanySignup from "./pages/forms/CompanySignup";
import SignIn from "./pages/forms/SignIn";
import SignUp from "./pages/forms/SignUp";
import forgetPassword from "./pages/forms/forgetPassword";

export const AuthRoutes = [
  // { name: "/", element: Home },
  { name: "/dashboard", element: Dashboard },
  { name: "/administration", element: Administration },
  // { name: "/home", element: Home },
  { name: "/settings", element: Settings },
]
export const FormsRoute = [
  // { name: "/adminpassword", element: AdminForgotPassword },
  { name: "/forgotpassword", element: forgetPassword },
  { name: "/login", element: Logins },
]

export const HomeRoutes = [
  {name: '/', element: Home},
  {name: '/signin', element: SignIn},
  {name: '/signup', element: SignUp},
  // {name: '/entitysignup', element: CompanySignup},
]
export const CorporateRoutes = []