import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* more routes */}
        </Routes>
      </Router>
    </>
  )
}

export default App
