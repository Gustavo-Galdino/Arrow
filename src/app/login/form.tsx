'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

import googleIcon from '@/assets/google.svg'

export const LoginForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setFormValues({ email: '', password: '' })

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      })

      setLoading(false)
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError('invalid email or password')
      }
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const inputStyle =
    'form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white'

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${inputStyle}`}
        />
      </div>
      <button
        type="submit"
        className="inline-block bg-blue-600 px-7 py-4 text-sm font-medium text-white"
        disabled={loading}
      >
        {loading ? 'loading...' : 'Sign In'}
      </button>

      <div className="my-4 flex items-center before:flex-1">
        <p className="mx-4 mb-0 text-center font-semibold">OR</p>
      </div>

      <a
        className="px-7 py-2 text-sm font-medium uppercase leading-snug text-white"
        style={{ backgroundColor: '#3b5998' }}
        onClick={() => signIn('google', { callbackUrl })}
        role="button"
      >
        <Image
          className="pr-2"
          src={googleIcon}
          alt=""
          style={{ height: '2rem' }}
        />
        Continue with Google
      </a>
    </form>
  )
}
