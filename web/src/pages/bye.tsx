import React from "react";
import {useByeQuery} from "../generated/graphql";


export const Bye: React.FC = () => {
  const {loading, error, data} = useByeQuery({fetchPolicy: 'network-only'})

  if (loading) return <div>Loading...</div>

  if (error) {
    return <div>Error!</div>
  }

  if (!data) return <div>No data!</div>

  return (
    <div>
      {data.bye}
    </div>
  )
}