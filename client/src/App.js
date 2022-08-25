import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'




import CreateReview from './components/CreateReview'
import NavigationBar from './components/Nav/NavigationBar'
import Home from './components/Home';
import ToyDetails from './components/ToyDetails';
import Login from './components/Users/Login'
import Register from './components/Users/Register'
import Logout from './components/Users/Logout';
import CreatePet from './components/CreatePet';
import PetsDetails from './components/PetsDetails';
import UpdatePet from './components/UpdatePet';



const App = () => {
  const [toys, setToys] = useState([])
  const [reviews, setReviews] = useState([])
  const [pets, setPets] = useState([])
  const [users, setUsers] = useState([])

  console.log(pets, "Pets fetched at App.js")


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

  const getUsers = async () => {
    const url = '/users'
    const res = await fetch(url)
    const data = await res.json()
    setUsers(data)
  }


  useEffect(() => {
    getToys()
    getPets()
    getReviews()
    getUsers()
  }, [])
 

  const handleCreatePet = async (petObj) => {
    console.log (petObj, "Pet obj in handleCreate")
    const formData = new FormData()
    for (let field in petObj) {
      formData.append(field, petObj[field])
    }
    const res = await fetch('/pets/new', {
      method: "POST",
      body: formData,
    })
    if (res.ok) {
      const newPet = await res.json()
      setPets([...pets, newPet])
      navigate('/')
    } else {
      console.log("Error creating new pet")
    }
  }

  const handleUpdatePet = async ( petObj, petID) => {
    const formData = new FormData()
    for (let field in petObj) {
      formData.append(field, petObj[field])
    }
    const res = await fetch(`/pets/${petID}`, {
      method: "PUT",
      body: formData,
    })
    if (res.ok) {
      getPets()
      let updatedPet = {...pets.find((pet) => pet.id === petID) }
      const index = pets.findIndex((pet) => pet.id === petID)
      setPets([...pets.slice(0, index), updatedPet, ...pets.slice(index + 1)])
      navigate(`/pets`)
    } else {
      console.log("Error editing pet ", petID);
    }
  }

  const handleDeletePet = async (petID) => {
    await fetch(`/pets/${petID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setPets(pets.filter((pet) => pet.id !== petID));
    navigate(`/`)
  }

  const handleAuthentification = (authed) => {
    navigate("/")
  }

  const handleLogout = () => {
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
              !!toys.length && (
                < Home toys={toys} />
              )
            }
          />

          <Route 
            path="/users/:userID" 
            element={
              !!users.length && (
                <PetsDetails users={users} pets={pets} handleDeletePet={handleDeletePet}/> )}
            />

          <Route 
            path="/:toyID"
            element={
              !!toys.length && (
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
            path="/pets/new" 
            element={
             !!pets.length && <CreatePet handleCreatePet={handleCreatePet}/>
            }/>
          
          <Route 
            path="/pets/:petID/update"
            element={!!pets.length && <UpdatePet pets={pets} handleUpdatePet={handleUpdatePet}/>
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
