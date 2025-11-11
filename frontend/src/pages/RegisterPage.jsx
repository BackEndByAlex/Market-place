import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function RegisterPage() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name,
      email,
      password
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', formData)

      // TODO: After successful registration, navigate to login page
    // navigate('/login')

      console.log('User registered successfully:', response.data)
    } catch (error) {
      console.error('Error registering user:', error)
      alert('Fel vid registrering: ' + error.response.data.message)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-3xl font-bold text-center'>Registrera</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='mb-2 block font-semibold' htmlFor='name'>
              Namn
            </label>
            <input
              type='text'
              id='name'
              className='w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Your Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='mb-2 block font-semibold' htmlFor='email'>
              E-post
            </label>
            <input
              type='email'
              id='email'
              className='w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Your Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label className='mb-2 block font-semibold' htmlFor='password'>
              Lösenord
            </label>
            <input
              type='password'
              id='password'
              className='w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
              placeholder='Your Password'
              autoComplete=''
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700'
          >
            Registrera
          </button>
          <div className='mt-4 text-center'>
            <Link to='/login' className='text-blue-500 hover:underline'>
             Do you have an account? Logga in här
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage