import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthStorage from './helper/AuthStorage'
import { ApiGet } from "./helper/API/ApiData";
// import Administration from "./pages/Administration";
import Dashboard from "./pages/Home/Dashboard";
import Settings from "./pages/Settings";
import AdminLogin from "./pages/admin/AdminLogin";
import Users from "./pages/administration/users/Users";
import Logins from "./pages/forms/Logins";
import Products from "./pages/products/Products";
import Transactions from "./pages/transactions/Transactions";
import Edit_Transactions from "./pages/transactions/Edit_Transactions"
import Entities from "./pages/administration/entities/Entities";
import Add_Edit_Entities from "./pages/administration/entities/addEditEntities/Add_Edit_Entities";
import RiskAssessment from './pages/transactions/riskAssessment/RiskAssessment'
import Admin from "./pages/corporation/Admintable";
import EditAdmin from "./pages/corporation/EditAdmin";
import Add_Edit_User from "./pages/administration/users/Add_Edit_User";
import Add_Edit_Product from "./pages/products/Add_Edit_Product";
import EntitiesRole from "./pages/entitiesRole/EntitiesRole";
import CreateAdmin from "./pages/corporation/CreateAdmin";
import RatingAgencies from './pages/ratingAgencies/RatingAgencies'
import RatingAgenciesEdit from './pages/ratingAgencies/RatingAgenciesEdit'
import Countries from "./pages/administration/masterData/countries/Countries";
import Ports from "./pages/administration/masterData/ports/Ports";
import AirBases from "./pages/administration/masterData/airBases/AirBases";
import CreateUserPassword from "./pages/forms/createPasswords/CreateUserPassword";
import CreateAdminPassword from "./pages/forms/createPasswords/CreateAdminPassword";
import AdminForgetPassword from "./pages/forms/forgetPassword/AdminForgetPassword";
import LoginContainer from "./pages/forms/LoginContainer";
import Sidebar from "./layout/sidebar/sidebar";
import Layout from "./layout/Layout";
import NotFoundPage from './utils/NotFoundPage'
import setupAxiosInterceptors from './utils/axiosConfig'
import STORAGEKEY from "./config/APP/app.config";
import Home from "./pages/Home/HeroPage/Home";
import UserForgetPassword from "./pages/forms/forgetPassword/UserForgetPassword";


const pathForLayout = ["/signin", "/admin-login", "/fa-login", "/verify-user", "/verify-admin", "/admin-reset", "/user-reset"];


const NetworkErrorPage = () => (
  <NotFoundPage message="The network is slow, or a request timed out." />
);

const Index = () => {

  setupAxiosInterceptors();

  const location = useLocation();
  const navigate = useNavigate();

  const userRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/transactions", component: Transactions },
    { path: "/edit-transactions", component: Edit_Transactions },
    { path: "/risk-assessment", component: RiskAssessment },
    { path: "/entities", component: Entities },
    { path: "/add-edit-entities", component: Add_Edit_Entities },
    // { path: "/final-page", element: FinalPage },
  ]

  const AdminRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/admins", component: Admin },
    { path: "/add-edit-entities", component: Add_Edit_Entities },
    { path: "/admin-edit", component: EditAdmin },
    { path: "/transactions", component: Transactions },
    { path: "/edit-transactions", component: Edit_Transactions },
    { path: "/add-user", component: Add_Edit_User },
    { path: "/edit-user", component: Add_Edit_User },
    { path: "/users", component: Users },
    // { path: "/final-page",  component: FinalPage },
  ];

  const superAdminRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/add-product", component: Add_Edit_Product },
    { path: "/edit-product", component: Add_Edit_Product },
    { path: "/products", component: Products },
    { path: "/entities", component: Entities },
    { path: "/entities-role", component: EntitiesRole },
    { path: "/add-edit-entities", component: Add_Edit_Entities },
    { path: "/admins", component: Admin },
    { path: "/create-admin", component: CreateAdmin },
    { path: "/admin-edit", component: EditAdmin },
    { path: "/transactions", component: Transactions },
    { path: "/edit-transactions", component: Edit_Transactions },
    { path: "/rating-agencies", component: RatingAgencies },
    { path: "/rating-agencies-edit", component: RatingAgenciesEdit },
    { path: "/add-user", component: Add_Edit_User },
    { path: "/edit-user", component: Add_Edit_User },
    { path: "/users", component: Users },
    { path: "/countries", component: Countries },
    { path: "/ports", component: Ports },
    { path: "/airports", component: AirBases },
    { path: "/risk-assessment", component: RiskAssessment },
    { path: "/settings", component: Settings },

    // { path: "/final-page", component: FinalPage },
  ];

  // Define primary links based on role
  const userRole = AuthStorage.getStorageData(STORAGEKEY.roles);
  let primaryLinks = [];

  if (userRole === "user") {
    primaryLinks = userRoutes;
  } else if (userRole === "admin") {
    primaryLinks = AdminRoutes;
  } else if (userRole === "superAdmin") {
    primaryLinks = superAdminRoutes;
  }


  const handleInvalidToken = () => {
    if (pathForLayout.includes(location.pathname)) {
      navigate(location.pathname);
    } else {
      navigate("/");
    }
    localStorage.clear();
  };

  const checkUserRoleAndNavigate = () => {
    if (AuthStorage.isUserAuthenticated()) {
      ApiGet("user/validateToken")
        .then((res) => {
          if (res.status === 200) {
            const currentPath = location.pathname;
            const validPaths = primaryLinks.map((link) => link.path);

            // Redirect to dashboard if the current path isn't valid for the role
            if (!validPaths.includes(currentPath)) {
              navigate("/dashboard");
            }
          } else {
            handleInvalidToken();
          }
        })
        .catch(handleInvalidToken);
    }
  };

  useEffect(() => {
    checkUserRoleAndNavigate();
  }, [checkUserRoleAndNavigate]);

  // if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
  //   primaryLinks = userRoutes;
  //   // console.log(primaryLinks);
  // } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
  //   primaryLinks = AdminRoutes;
  // } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
  //   primaryLinks = superAdminRoutes;
  // }

  return (
    <>

      {/* Main Layout Wrapper */}
      {location.pathname === "/" && (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      )}

      {/* Login Container Wrapper */}
      {pathForLayout.includes(location.pathname) && (
        <LoginContainer>
          <Routes>
            <Route path="/signin" element={<Logins />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/fa-login" element={<Logins />} />
            <Route path="/verify-user" element={<CreateUserPassword />} />
            <Route path="/verify-admin" element={<CreateAdminPassword />} />
            <Route path="/admin-reset" element={<AdminForgetPassword />} />
            <Route path="/user-reset" element={<UserForgetPassword />} />
          </Routes>
        </LoginContainer>
      )}

      {/* Sidebar Wrapper for Authenticated Routes */}
      {primaryLinks.find((obj) => obj.path === location.pathname) && (
        <Sidebar>
          <Routes>
            {primaryLinks.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<item.component />}
              />
            ))}
          </Routes>
        </Sidebar>
      )}

      {/* Catch-all Routes for 404 and Network Error */}
      {!pathForLayout.includes(location.pathname) &&
        !primaryLinks.find((obj) => obj.path === location.pathname) &&
        location.pathname !== "/" && (
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/network-error" element={<NetworkErrorPage />} />
          </Routes>
        )}
    </>
  )
}
export default Index;