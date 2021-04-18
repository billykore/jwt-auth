import React, {useState} from "react";
import {useRegisterMutation} from "../generated/graphql";
import {RouteComponentProps} from 'react-router-dom'

export const Register: React.FC<RouteComponentProps> = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register] = useRegisterMutation()

  return (
    <form onSubmit={async event => {
      event.preventDefault()
      await register({variables: {email, password}})

      history.push('/')
    }}>
      <input type="email" placeholder='email' onChange={event => setEmail(event.target.value)}/>
      <input type="password" placeholder='password' onChange={event => setPassword(event.target.value)}/>
      <button type='submit'>Register</button>
    </form>
  )
}
