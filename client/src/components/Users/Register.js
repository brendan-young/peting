import { useState } from 'react'
import { useUser } from '../../context/user'

const Register = (props) => {
  const [user, setUser] = useUser()
  const [fields, setFields] = useState({ username: "", password: "" })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/register", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields)
    })
    const data = await res.json()
    console.log(data)
    setUser(data.user)
    props.handleRegister(data.authorised)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register a new account.</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={fields.username}
          onChange={handleChange}
          name="username"
          type="text"
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={fields.password}
          onChange={handleChange}
          name="password"
          type="password"
          id="password"
        />
      </div>
      <input type="submit" value="Register" />
    </form>
  )
}

export default Register