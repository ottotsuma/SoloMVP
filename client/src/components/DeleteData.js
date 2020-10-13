import React, {useState} from 'react'
import axios from 'axios'


const DeleteData = ({ userData }) => {
  let url = 'https://stagesolo.herokuapp.com/'
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState('');

  const updateStore = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/update`,
        {
          email: userData[0],
          message: message,
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setFeedback("Your message deleted!")}
    } catch (error) {
      console.log(error);
      setFeedback("Username or Password is invalid!");
    }
  };

  const upStore = (e) => {
    e.preventDefault()
    updateStore(e)
  }

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
    <h2>Delete Item</h2>
    <form onSubmit={upStore} className="search-form">
      {/* <div>Email: </div>
      <input className="search-bar" type="text" value={query} onChange={updateUser} /> */}
      <div>Message: </div>
      <input
        className="search-bar"
        type="text"
        value={message}
        onChange={updateMessage}
      />
      <button className="search-button" type="submit">
        Delete
      </button>
      <div>You just deleted: {feedback}</div>
    </form>
    </div>
  )
}

export default DeleteData
