import React from "react";

  const LoginForm = ({
    handleSubmit,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange

  }) => {
    return (
        <div>
       <form onSubmit={handleSubmit}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  );
};

export default LoginForm;