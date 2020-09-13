import React, {useState} from 'react'
import axios from 'axios'
import MessagesList from './MessagesList'


const RetrieveData = ({ userData }) => {
  const [arr, setArr] = useState([]);
  let url = 'https://stagesolo.herokuapp.com/'
  const getMessage = async () => {
    try {
      const response = await axios.post(
        `${url}api/user/login`,
        {
          email: userData[0],
          password: userData[1],
        }
      );
      console.log(response);
      console.log(response.data.user.tags);
      setArr(response.data.user.tags);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    getMessage();
  };

  return (
    <div>
    <h2>Retrieve Items:</h2>
    <form onSubmit={getSearch} className="search-form">
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
      <button className="search-button" type="submit">
        Get Data
      </button>
      </form>
      <div className="Message">Your data is:</div>
      <MessagesList numbers={arr} />
    </div>
  )
}


export default RetrieveData
