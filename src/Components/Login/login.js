import React, { useState } from "react";
import ReactDOM from "react-dom";
import Payment from '../payment/Payment';
import LoadingMask from "react-loadingmask";
import UserDetails from '../userProfile/UserDetails';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Login.css'

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cutsomerId, setCustomerId] = useState('');
  const navigate = useNavigate();

  const navigateHome =() =>{
    navigate('/');
  };
  // User Login info
  const database = [
    {
      username: "testCustomer123",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    setCustomerId(uname);

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        //navigate('/useprofile');
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="login-form">
      <div className="title">Sign In</div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>customerId </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <br />
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <br />
        <br />
        <br />
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      </div>
    </div>
  );

  return (
    
    <div>
      <div style={{ 
        backgroundImage: `url("/Images/pexels-mikhail-nilov-6969809.jpg")`
        }}>

      </div>
      <div className="header2">
      <a onClick={navigateHome} class="logo">NPE BANK</a>
      </div>
      {isSubmitted ? 
        <div>
          <LoadingMask loading={isLoading} text={"loading..."}>
            <Payment setIsLoading={setIsLoading} />
            {/* <UserDetails name={cutsomerId && cutsomerId.value} /> */}
          </LoadingMask>
          
        </div> : <div className="app">{renderForm} </div>
    }

    </div>
    
  );
}

export default Login;