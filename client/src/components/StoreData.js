import React, {useState} from 'react'
import axios from 'axios'


const StoreData = ({ userData }) => {
  let url = 'https://stagesolo.herokuapp.com/'
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState('');

  const patchArray = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/store`,
        {
          email: userData[0],
          message: message
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setFeedback("Your message was stored!")}
    } catch (error) {
      console.log(error);
      setFeedback("Username or Password is invalid!");
    }
  };

  const addStore = (e) => {
    e.preventDefault()
    patchArray(e)
  }

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
    <h2>Store Items</h2>
    <form onSubmit={addStore} className="search-form">
      {/* <div>Email: </div>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={updateUser}
      />
      <div>Password: </div>
      <input
        className="search-bar"
        type="text"
        value={password}
        onChange={updatePass}
      /> */}
      <div>Message: </div>
      <input
        className="search-bar"
        type="text"
        value={message}
        onChange={updateMessage}
      />
      <button className="search-button" type="submit">
        Store
      </button>
    </form>
    <div>You just stored: {feedback}</div>
    </div>
  )

}

export default StoreData
