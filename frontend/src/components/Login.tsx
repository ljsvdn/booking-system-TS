import axios from 'axios'
import { FC, FormEvent, useState } from 'react'
import HttpError from '../utils/http-error'

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      })

      if (response.status < 200 || response.status >= 300) {
        throw new HttpError(response.status, response.statusText)
      }

      localStorage.setItem('token', response.data.token)
    } catch (error) {
      if (error instanceof HttpError) {
        setError('Invalid email or password!')
      } else {
        console.error('Error:', error)
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log in</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login
