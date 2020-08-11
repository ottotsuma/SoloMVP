import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import logo from "./Group1.png";
require("dotenv").config();


const App = () => {
  const [password, setPassword] = useState("ScottPass");
  const [query, setQuery] = useState("Scott@Smith.com");
  const [message, setMessage] = useState('');
  const [loggedIn, setLogin] = useState(true);
  const [replacement, setReplacement] = useState('');

  useEffect(() => {
    console.log("The program has started.")
  }, []);

  // retrieves user store && logs user in
  const getMessage = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/login`,
        {
          email: query,
          password: password,
        }
      );
      console.log(response);
      console.log(response.data.tags);
      setMessage(response.data.tags);
      setLogin(true);
    } catch (error) {
      console.log(error);
      setMessage("Username or Password is invalid!");
    }
  };

  // makes a new user
  const registerMessage = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/register`,
        {
          email: query,
          message: message,
          password: password
        }
      );
      console.log(response);
      setMessage("Successful registration");
    } catch (error) {
      console.log(error);
      setMessage("Username or Password is use!");
    }
  };

  // deletes the user 
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/delete`,
        {data: {
          email: "beansy@codechrysalis.com"
        }}
      );
      console.log(response);
      setMessage(response.data);
    } catch (error) {
      console.log(error);
      setMessage("Username is invalid!");
    }
  };

  // changes the message on the user 
  const patchUser = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/patch`,
        {
          email: query,
          message: message,
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setMessage("Your message updated!")}
    } catch (error) {
      console.log(error);
      setMessage("Username or Password is invalid!");
    }
  };

  // adds item to store 
  const patchArray = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/store`,
        {
          email: query,
          message: message
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setMessage("Your message updated!")}
    } catch (error) {
      console.log(error);
      setMessage("Username or Password is invalid!");
    }
  };

  // deletes item in the store
  const updateStore = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/update`,
        {
          email: query,
          message: message,
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setMessage("Your message updated!")}
    } catch (error) {
      console.log(error);
      setMessage("Username or Password is invalid!");
    }
  };

  
  // adds NEW item to store 
  const newItem = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/store`,
        {
          email: query,
          message: replacement
        }
      );
      console.log(response);
      if(typeof response.data === 'string') {setMessage(response.data)}
      else {setMessage("Your message updated!")}
    } catch (error) {
      console.log(error);
      setMessage("Username or Password is invalid!");
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

  if(loggedIn === true) {
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
      <div className="Message">Your data is: {message}</div>
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
      <div>You just stored: {message}</div>
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
        <div>You just Updated: {message}</div>
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
        <div>You just deleted: {message}</div>
      </form>
      
      </div>// App end
    )
  } else {
  return (
    <div className="App">
      <h1>The Secret Box</h1>
      <div className="image"><img src={logo}></img></div>
      <h2>Loggin:</h2>
      <form onSubmit={getLogged} className="search-form">
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
      <div className="Message">{message}</div>
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
      <div>{message}</div>
    </div> // ending div
  );
 } // else
}; // app 

export default App;
