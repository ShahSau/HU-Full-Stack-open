import React from "react";
import Success from './Success'
const heading = ({
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


export default heading;