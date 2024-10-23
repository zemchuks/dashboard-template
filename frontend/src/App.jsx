import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthRoutes, HomeRoutes, FormsRoute } from './router'
import AuthLayout from './layout/AuthLayout'
import Sidebar from './layout/sidebar/sidebar'
import Layout from './layout/Layout'
import CompanySignup from './pages/forms/CompanySignup'
import NotFoundPage from './utils/NotFoundPage'
import setupAxiosInterceptors from './utils/axiosConfig'
import AdminForgotPassword from './pages/forms/AdminPass'
// Add this in App.js
const NetworkErrorPage = () => (
  <NotFoundPage message="The network is slow, or a request timed out." />
);


function App() {
  // Set up axios interceptors
  setupAxiosInterceptors();

  return (
    <BrowserRouter>

      <Routes>
        {HomeRoutes.map((item, index) => (
          <Route key={index} path={item.name} element={<Layout><item.element /></Layout>} />
        ))}
        
        {FormsRoute.map((item, index) => (
           <Route key={index} path={item.name} element={
            <CompanySignup>
              <item.element />
            </CompanySignup>} />
        ))}
          
        {AuthRoutes.map((item, index) => (
          <Route key={index} path={item.name} element={
            <Sidebar>
              <item.element />
            </Sidebar>} />
        ))}

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Route for network timeouts */}
        <Route path="/network-error" element={<NetworkErrorPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
