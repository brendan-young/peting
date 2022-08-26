import React from 'react'

import Button from 'react-bootstrap/Button';
import { useUser } from '../../context/user';

const Logout = ({ handleLogout }) => {
  const [user, setUser] = useUser()
  const logMeOut = async () => {
    console.log("Logged Out")
    const res = await fetch('/logout', {
      method: 'POST'
    })
    setUser(null)
    handleLogout()
  }

  return (
    <Button onClick={logMeOut} className="m-2"> Logout </Button>
  )
}

export default Logout