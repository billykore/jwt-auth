import React, {useEffect, useState} from 'react'
import {Routes} from './Routes'
import {setAccessToken} from "./accessToken";

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {method: 'POST' ,credentials: 'include'})
      .then(async res => {
        const { accessToken } = await res.json()
        setAccessToken(accessToken)
        setLoading(false)
      })

    setLoading(false)
  }, [])

  if (loading) return <div>Loading...</div>

  return <Routes />
}