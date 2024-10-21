import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthRoutes, HomeRoutes } from './router'
import Sidebar from './components/sidebar'
import Layout from './pages/layout/Layout'
import CompanySignup from './pages/forms/CompanySignup'
import NotFoundPage from './utils/NotFoundPage'
import setupAxiosInterceptors from './utils/axiosConfig'
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
        <Route path='/entitysignup' element={<CompanySignup />} />
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
