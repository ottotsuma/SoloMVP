import React, {useState} from 'react'
import axios from "axios";


const ChangePassForm = ({ onChange }) => {
  let url = 'https://stagesolo.herokuapp.com/'
  const [query, setQuery] = useState("Scott@Smith.com");
  const [password, setPassword] = useState("ScottPass");
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const forgotRoute = (e) => {
    e.preventDefault()
    console.log("here")
    forgotPasswordRoute();
  }

  const forgotPasswordRoute = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/forgot`,
        {
          email: query,
          password: password,
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setFeedback("Your password was updated!")}
    } catch (error) {
      console.log(error);
      setFeedback("Username is invalid!");
    }
  };

  const updatePass = (e) => {
    setPassword(e.target.value);
  };

  const updateUser = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
    <h2>Change Password:</h2>
    <form onSubmit={forgotRoute} className="search-form">
      <div>Email: </div>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={updateUser}
      />
      <div>New Password: </div>
      <input
        className="search-bar"
        type="password"
        value={password}
        onChange={updatePass}
      />
      <button className="search-button" type="submit">
        Change!
      </button>
    </form>
    <div className="Message">{feedback}</div>
    <div className="Buffer"> </div>
    <button className="search-button" onClick={() => onChange(false)}>Back</button>
    </div>
  )
}

export default ChangePassForm
