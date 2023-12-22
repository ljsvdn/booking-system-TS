import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { BookingProvider } from './contexts/BookingContext'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Router>
        <BookingProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* more routes */}
          </Routes>
        </BookingProvider>
      </Router>
    </>
  )
}

export default App
