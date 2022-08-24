import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'




import CreateReview from './components/CreateReview'
import NavigationBar from './components/Nav/NavigationBar'
import Home from './components/Home';
import ToyDetails from './components/ToyDetails';



const App = () => {
  const [toys, setToys] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [pets, setPets] = useState(null)

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

        </Routes>
      </main>
    </div>
  )
}

export default App;
