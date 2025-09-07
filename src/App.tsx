import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import RouteDetails from './pages/RouteDetails'
import ScrollTopButton from './components/ScrollTopButton'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routes/:routeId" element={<RouteDetails />} />
      </Routes>
      <ScrollTopButton />
    </div>
  )
}

export default App
