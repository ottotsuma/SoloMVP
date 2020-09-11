import React, {useState} from 'react'
import logo from "./Group1.png";
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ChangePassForm from './components/ChangePassForm'
import RetrieveData from './components/RetrieveData'
import StoreData from './components/StoreData'
import UpdateData from './components/UpdateData'
import DeleteData from './components/DeleteData'
import "./App.css";
require("dotenv").config();
let url = 'https://stagesolo.herokuapp.com/'

if(process.env.NODE_ENV === 'development') {
  console.log('Running locally')
  url = 'http://localhost:3000/'
}


const App = () => {
  const [dataUser, setDataUser] = useState('')
  const [loggedIn, setLogin] = useState(false);
  const [forgot, setForgot] = useState(false);


  const handleLogin = (status) => {
    setLogin(status)
  }

  const handleForgotPass = (status) => {
    setForgot(false)
  }

  const changeDataUser = (data) => {
    setDataUser(data)
  }

  // const delU = (e) => {
  //   e.preventDefault();
  //   deleteUser();
  // };
  //
  // const deleteUser = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `${url}api/user/delete`,
  //       {data: {
  //         email: "beansy@codechrysalis.com"
  //       }}
  //     );
  //     console.log(response);
  //     setMessage(response.data);
  //   } catch (error) {
  //     console.log(error);
  //     setFeedback("Username is invalid!");
  //   }
  // };
  //
  // const patchUser = async () => {
  //   try {
  //     const response = await axios.patch(
  //       `${url}api/user/patch`,
  //       {
  //         email: query,
  //         message: message,
  //       }
  //     );
  //     console.log(response);
  //     if(typeof response.data === 'string') {setMessage(response.data)}
  //     else {setFeedback("Your message updated!")}
  //   } catch (error) {
  //     console.log(error);
  //     setFeedback("Username or Password is invalid!");
  //   }
  // };
  //
  // const upUser = (e) => {
  //   e.preventDefault();
  //   if(query === '') {console.log("poo")}
  //   else if(password === '') {console.log("poo")}
  //   else if(message === '') {console.log("poo")}
  //   else {patchUser(e)}
  // };

  return (
    <div className="App">
    <h1>The Secret Box</h1>
    <div className="image"><img src={logo}></img></div>

    {forgot && <ChangePassForm onChange={(status) => {handleForgotPass(status)}}/>}

    {loggedIn && (
      <div>
      <RetrieveData userData={dataUser}/>
      <StoreData userData={dataUser}/>
      <UpdateData userData={dataUser}/>
      <DeleteData userData={dataUser}/>
      </div>
    )}

    {
      !forgot && !loggedIn && (
        <div>
        <LoginForm onChange={(status) => handleLogin(status)} handleDataUser={(data) => changeDataUser(data)}/>
        <RegisterForm />
        <div className="Buffer"> </div>
        <button className="search-button" onClick={function() {setForgot(true)}}>Forgot Password</button>
        </div>
      )
    }
    </div>
  )

};

export default App;
