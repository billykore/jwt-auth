import React, {useState} from "react";
import {RouteComponentProps} from 'react-router-dom'
import {useLoginMutation} from "../generated/graphql";
import {setAccessToken} from "../accessToken";

export const Login: React.FC<RouteComponentProps> = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()

  return (
    <form onSubmit={async event => {
      event.preventDefault()
      const response = await login({variables: {email, password}})

      history.push('/')

      if (response && response.data) {
        setAccessToken(response.data.login.accessToken)
      }

    }}>
      <input type="email" placeholder='email' onChange={event => setEmail(event.target.value)}/>
      <input type="password" placeholder='password' onChange={event => setPassword(event.target.value)}/>
      <button type='submit'>Login</button>
    </form>
  )
}
