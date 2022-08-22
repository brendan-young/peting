import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'



import Form from './components/CreateReview'
import toys from './data/seed'
import NavigationBar from './components/Nav/NavigationBar'
import Home from './components/Home';
import ToyDetails from './components/ToyDetails';
import CreateReview from './components/CreateReview';

// console.log(toys)


const App = () => {
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
                <ToyDetails toys={toys} />
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
