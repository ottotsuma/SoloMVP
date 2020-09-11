import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onChange, handleDataUser }) => {
  let url = 'https://stagesolo.herokuapp.com/'
  const [password, setPassword] = useState("ScottPass");
  const [query, setQuery] = useState("Scott@Smith.com");
  const [feedback, setFeedback] = useState('');

  const loginFunction = async () => {
    try {
      const response = await axios.post(
        `${url}api/user/login`,
        {
          email: query,
          password: password,
        }
      );
      console.log(response);
      // document.cookie = `Bearer ${response.data.token}`;
      // console.log(document.cookie)
      onChange(true);
      handleDataUser([query, password])
    } catch (error) {
      console.log(error);
      setFeedback("Username or Password is invalid!");
    }
  };

  const logThisIn = (e) => {
    e.preventDefault();
    loginFunction();
  };

  const updatePass = (e) => {
    setPassword(e.target.value);
  };

  const updateUser = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
    <h2>Loggin:</h2>
    <form onSubmit={logThisIn} className="search-form">
      <div>Email: </div>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={updateUser}
      />
      <div>Password: </div>
      <input
        className="search-bar"
        type="password"
        value={password}
        onChange={updatePass}
      />
      <button className="search-button" type="submit">
        Login
      </button>
    </form>
    <div className="Message">{feedback}</div>
    </div>
  )
}

export default LoginForm
