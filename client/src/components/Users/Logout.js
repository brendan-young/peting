import React from 'react'

import Button from 'react-bootstrap/Button';

const Logout = (props) => {

  const handleLogout = async () => {
    console.log("Logged Out")
    const res = await fetch('/logout', {
      method: 'POST'
    })
  }

  return (
    <Button onClick={props.handleLogout}> Logout </Button>
  )
}

export default Logout