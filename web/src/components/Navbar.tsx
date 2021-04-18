import React from 'react'
import {Link} from "react-router-dom";
import {useMeQuery} from "../generated/graphql";

export const Navbar: React.FC = () => {
  const {data} = useMeQuery({fetchPolicy: "network-only"})
  console.log(data)
  return (
    <header>
      <ul>
        <li>
          <Link to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/register'>
            Register
          </Link>
        </li>
        <li>
          <Link to='/login'>
            Login
          </Link>
        </li>
        <li>
          <Link to='/bye'>
            Bye
          </Link>
        </li>
      </ul>

      {data && data.me ? (<div>You are login as {data.me.email}</div>) : (<div>Not logged in</div>)}

    </header>
  )
}