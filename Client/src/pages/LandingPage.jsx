import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      <div>This is the Landing page</div>
      <Link to={'/register'}>
      Login or Signup
      </Link>
    </div>
  )
}

export default LandingPage
