import React,{useState} from 'react'
import axios from 'axios'


const UpdateData = ({ userData }) => {
  let url = 'https://stagesolo.herokuapp.com/'
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState('');
  const [replacement, setReplacement] = useState('');

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

  const newItem = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/store`,
        {
          email: userData[0],
          message: replacement
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setFeedback("Your message updated!")}
    } catch (error) {
      console.log(error);
      setFeedback("Username or Password is invalid!");
    }
  };

  const swapStore = (e) => {
    e.preventDefault()
    // remove the item
    updateStore(e)
    // put new one in
    newItem(e)
  }

  const updateReplacement = (e) => {
    setReplacement(e.target.value);
  };

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
    <h2>Update Items</h2>
    <form onSubmit={swapStore} className="search-form">
      {/* <div>Email: </div>
      <input className="search-bar" type="text" value={query} onChange={updateUser} /> */}
      <div>Old Message: </div>
      <input
        className="search-bar"
        type="text"
        value={message}
        onChange={updateMessage}
      />
       <div>New Message: </div>
      <input
        className="search-bar"
        type="text"
        value={replacement}
        onChange={updateReplacement}
      />
      <button className="search-button" type="submit">
        Update
      </button>
      <div>You just Updated: {feedback}</div>
    </form>
    </div>
  )
}

export default UpdateData
