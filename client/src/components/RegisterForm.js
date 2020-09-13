import React, {useState} from 'react'
import axios from "axios";

const RegisterForm = () => {
  let url = 'https://stagesolo.herokuapp.com/'
  const [query, setQuery] = useState("Scott@Smith.com");
  const [password, setPassword] = useState("ScottPass");
  const [feedback, setFeedback] = useState('');

  const sendReg = (e) => {
    e.preventDefault();
    registerMessage();
  };

  const updatePass = (e) => {
    setPassword(e.target.value);
  };

  const updateUser = (e) => {
    setQuery(e.target.value);
  };

  const registerMessage = async () => {
    try {
      const response = await axios.post(
        `${url}api/user/register`,
        {
          email: query,
          message: 'First Deploy',
          password: password,
        }
      );
      console.log(response);
      setFeedback("Successful registration");
    } catch (error) {
      console.log(error);
      setFeedback("Username or Password is use!");
    }
  };

  return (
    <div>
    <h2>Register Account</h2>
    <form onSubmit={sendReg} className="search-form">
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
      {/* <div>Message: </div>
      <input
        className="search-bar"
        type="text"
        value={message}
        onChange={updateMessage}
      /> */}
      <button className="search-button" type="submit">
        Register
      </button>
    </form>
    <div>{feedback}</div>
    </div>
  )
}

export default RegisterForm
