import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import logo from "./Group1.png";
require("dotenv").config();

let url = 'https://stagesolo.herokuapp.com/'

if(process.env.NODE_ENV === 'development') {
  console.log('Running locally')
  url = 'http://localhost:3000/'
}


const App = () => {
  const [password, setPassword] = useState("ScottPass");
  const [query, setQuery] = useState("Scott@Smith.com");
  const [message, setMessage] = useState('');
  const [loggedIn, setLogin] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [replacement, setReplacement] = useState('');
  const [feedback, setFeedback] = useState('');
  const [arr, setArr] = useState([]);

  const MakeList = (props) => {
    const array = props.numbers;
    console.log(array)
    const listItems = array.map((items) =>
      <li key={items.toString()}>
        {items}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  useEffect(() => {
    console.log("The program has started.")
  }, []);

  // retrieves user store && logs user in
  const getMessage = async () => {
    try {
      const response = await axios.post(
        `${url}api/user/login`,
        {
          email: query,
          password: password,
        }
      );
      console.log(response);
      console.log(response.data.user.tags);
      setArr(response.data.user.tags);
      setLogin(true);
    } catch (error) {
      console.log(error);
      setFeedback("Username or Password is invalid!");
    }
  };

    // logs user in
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
        setLogin(true);
      } catch (error) {
        console.log(error);
        setFeedback("Username or Password is invalid!");
      }
    };

  // makes a new user
  const registerMessage = async () => {
    try {
      const response = await axios.post(
        `${url}api/user/register`,
        {
          email: query,
          message: message,
          password: password
        }
      );
      console.log(response);
      setFeedback("Successful registration");
    } catch (error) {
      console.log(error);
      setFeedback("Username or Password is use!");
    }
  };

  // deletes the user 
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `${url}api/user/delete`,
        {data: {
          email: "beansy@codechrysalis.com"
        }}
      );
      console.log(response);
      setMessage(response.data);
    } catch (error) {
      console.log(error);
      setFeedback("Username is invalid!");
    }
  };

  // changes the message on the user 
  const patchUser = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/patch`,
        {
          email: query,
          message: message,
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

  // adds item to store 
  const patchArray = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/store`,
        {
          email: query,
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

  // deletes item in the store
  const updateStore = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/update`,
        {
          email: query,
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

  
  // adds NEW item to store 
  const newItem = async () => {
    try {
      const response = await axios.patch(
        `${url}api/user/store`,
        {
          email: query,
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

  const upUser = (e) => {
    e.preventDefault();
    if(query === '') {console.log("poo")}
    else if(password === '') {console.log("poo")}
    else if(message === '') {console.log("poo")}
    else {patchUser(e)}
  };

  const updatePass = (e) => {
    setPassword(e.target.value);
  };
  const updateUser = (e) => {
    setQuery(e.target.value);
  };
  const updateMessage = (e) => {
    setMessage(e.target.value);
  };
  const updateReplacement = (e) => {
    setReplacement(e.target.value);
  };

  const logThisIn = (e) => {
    e.preventDefault();
    loginFunction();
  };

  const getSearch = (e) => {
    e.preventDefault();
    getMessage();
  };

  const sendReg = (e) => {
    e.preventDefault();
    registerMessage();
  };

  const delU = (e) => {
    e.preventDefault();
    deleteUser();
  };

  const getLogged = (e) => {
    e.preventDefault();
    getMessage();
  };

  const addStore = (e) => {
    e.preventDefault()
    patchArray(e)
  }

  const upStore = (e) => {
    e.preventDefault()
    updateStore(e)
  }

  const swapStore = (e) => {
    e.preventDefault()
    // remove the item
    updateStore(e)
    // put new one in
    newItem(e)
  }

  const forgotRoute = (e) => {
    e.preventDefault()
    console.log("here")
    forgotPasswordRoute();
  }

    // changes the message on the user 
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

  if(forgot === true) {
    return (
      <div className="App">
        <h1>The Secret Box</h1>
        <div className="image"><img src={logo}></img></div>
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
          type="text"
          value={password}
          onChange={updatePass}
        />
        <button className="search-button" type="submit">
          Change!
        </button>
      </form>
      <div className="Message">{feedback}</div>
      <div className="Buffer"> </div>
      <button className="search-button" onClick={function() {setForgot(false)}}>Back</button>
      </div> // app end
    )
  }
  else if(loggedIn === true) {
    return (
      <div className="App">
      <h1>The Secret Box</h1>
      <div className="image"><img src={logo}></img></div>
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
      <MakeList numbers={arr} />
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
      
      </div>// App end
    )
  } else {
  return (
    <div className="App">
      <h1>The Secret Box</h1>
      <div className="image"><img src={logo}></img></div>
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
          type="text"
          value={password}
          onChange={updatePass}
        />
        <button className="search-button" type="submit">
          Login
        </button>
      </form>
      <div className="Message">{feedback}</div>
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
          type="text"
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
      <div className="Buffer"> </div>
      <button className="search-button" onClick={function() {setForgot(true)}}>Forgot Password</button>
    </div> // ending div
  );
 } // else
}; // app 

export default App;
