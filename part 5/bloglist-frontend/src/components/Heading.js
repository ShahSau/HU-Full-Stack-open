import React from 'react'
import Success from './Success'
import PropTypes from 'prop-types'
const Heading = ({
  successMessage,
  user,
  logout

}) => {
  return (
    <div>
      <h2>blogs</h2>
      <Success message={successMessage} />
      {user.name} is logged in <button onClick={logout}> logout</button>
    </div>
  )}

Heading.prototype={
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired
}

export default Heading