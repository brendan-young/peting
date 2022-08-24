import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'




import CreateReview from './components/CreateReview'
import NavigationBar from './components/Nav/NavigationBar'
import Home from './components/Home';
import ToyDetails from './components/ToyDetails';
import Login from './components/Users/Login'
import Register from './components/Users/Register'
import Logout from './components/Users/Logout';



const App = () => {
  const [toys, setToys] = useState([])
  const [reviews, setReviews] = useState([])
  const [pets, setPets] = useState([])
  const [authorised, setAuthorised] = useState(null)

  const navigate = useNavigate();

  const getToys = async () => {
    const url = '/toys'
    const res = await fetch(url)
    const data = await res.json()
    setToys(data)
  }

  const getReviews = async () => {
    const url = '/reviews'
    const res = await fetch(url)
    const data = await res.json()
    setReviews(data)
  }

  const getPets = async () => {
    const url = '/pets'
    const res = await fetch(url)
    const data = await res.json()
    setPets(data)
  }


  useEffect(() => {
    getToys()
  }, [])
 
  useEffect(() => {
    getReviews()
  }, [])

  useEffect(() => {
    getPets()
  }, [])

  const handleAuthentification = (authed) => {
    setAuthorised(authed)
    navigate("/")
  }

  const handleLogout = () => {
    setAuthorised(false)
    navigate("/")
  }

  return (
    <div className='App'>
      < NavigationBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              toys && (
                < Home toys={toys} />
              )
            }
          />

          <Route 
            path="/:toyID"
            element={
              toys && (
                <ToyDetails toys={toys} reviews={reviews} pets={pets}/>
              )
            }
          />

          <Route
            path="/review/new"
            element={
              <CreateReview />
            } />

          <Route
            path="/login"
            element={<Login handleLogin={handleAuthentification} /> } />

          <Route 
            path="/register"
            element={<Register handleRegister={handleAuthentification} />} />
          
          <Route 
            path="/logout"
            element={<Logout handleLogout={handleLogout} />} />

        </Routes>
      </main>
    </div>
  )
}

export default App;
