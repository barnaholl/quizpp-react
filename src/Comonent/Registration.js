import React, { useEffect, useState } from "react";
import { DropdownDate } from 'react-dropdown-date';
import {CountryDropdown} from 'react-country-region-selector';
import {Link,useHistory} from "react-router-dom";
import axios from 'axios';

const Registration = () => {

    const registraitonUrl='http://localhost:8762/auth/register';

    const MALE="Male";
    const FEMALE="Female";
    const OTHER="Other";

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [email,setEmail]=useState("");
    const [sex,setSex]=useState("Male");
    const [selectedDate,setSelectedDate] = useState('1900-01-01');
    const [country,setCountry] = useState();

    const [errorMessage,setErrorMessage]=useState("");
    const history = useHistory();

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        setSelectedDate([year, month, day].join('-'));
        console.log(selectedDate);
    }


    const sendRegistrationDetails = (event) => {
        event.preventDefault();
        if(password!=confirmPassword){
            setErrorMessage("Passwords are not identical");
        }
        else{
            let registrationData={"username":username, "password":password, "roles":["ROLE_PLAYER"],"emailAddress":email,"sex":sex,"birthDate":selectedDate,"country":country};
            console.log(registrationData);
            axios.post(registraitonUrl,registrationData)
            .then(res=>{checkResponse(res.data)});
        }

    }
    const checkResponse = (response) => {
        if (response.correct) {
            localStorage.setItem("token", response.token);
            redirect();
        } else {
            setErrorMessage(response.msg);
        }
    };
    
    const redirect = () => {
        history.push("/Games");
        window.location.reload();
    };

    return (
        <div style={logingGridStyle}>
            <div style={loginCardStyle}>
                <div>
                    <h2>Registration</h2>
                </div>
                <div>
                    <form onSubmit={sendRegistrationDetails}>
                        <label style={formInputLabelStyle}>Username</label>
                        <input style={formInputStyle} type="text" placeholder="Type your username"  autoComplete="off" required onChange={event => setUsername(event.target.value)}/>
                        
                        <label style={formInputLabelStyle}>Password</label>
                        <input style={formInputStyle} type="password" placeholder="Type your password"  autoComplete="off" required onChange={event => setPassword(event.target.value)}/>
                        
                        <label style={formInputLabelStyle}>Confirm Password</label>
                        <input style={formInputStyle} type="password" placeholder="Confirm your password"  autoComplete="off" required onChange={event => setConfirmPassword(event.target.value)}/>
                        
                        <label style={formInputLabelStyle}>Email address</label>
                        <input style={formInputStyle} type="email" placeholder="Type your email address" autoComplete="off" required onChange={event => setEmail(event.target.value)}/>
                        
                        <label style={formInputLabelStyle}>Sex</label>
                        <select style={formInputStyle}>
                            <option value="Male" onChange={event => setSex(event.target.value)}>{MALE}</option>
                            <option value="Female" onChange={event => setSex(event.target.value)}>{FEMALE}</option>
                            <option value="Other" onChange={event => setSex(event.target.value)}>{OTHER}</option>
                        </select>
                        
                        <label style={formInputLabelStyle}>Birth Date</label>
                        <DropdownDate style={formInputStyle} selectedDate={selectedDate}
                        onDateChange={(date) => {        
                            formatDate(date);
                          }}
                          >
                        </DropdownDate>

                        <label style={formInputLabelStyle}>Country</label>
                        <CountryDropdown style={formInputStyle} value={country} onChange={(val) => {setCountry(val)}} />                            

                        <input style={formSubmitButtonStyle} type="submit" className="registration-button" value="Register"/>
                    </form>
                        <h3>{errorMessage}</h3>
                </div>
            </div>
        </div>
    );
};

const loginCardStyle = {
    maxWidth: "40rem",
    minWidth:"1fv",
    height: "1fv",
    display: "grid",
    gridTemplateColumns: "1fv",
    gridTemplateRows: "10rem 5rem, 5rem, 5rem",
    borderRadius: "18px",
    background: "white",
    boxShadow:" 5px 5px 15px rgba(0,0,0,0.9)",
    fontFamily: "roboto",
    textAlign: "center",
    backgroundColor: "rgb(242, 242, 242)",
  
  };

  const logingGridStyle ={
    display: "grid",
    gap : "1rem",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gridTemplateColumns: "1fv",
    gridTemplateRows: "1fv"
  }

  const formInputStyle= {
    width: "100%",
    padding: "1.2rem 2rem",
    margin: "0.8rem 0",
    display: "inline-block",
    border: "0.1rem solid #ccc",
    borderRadius: "0.4rem",
    boxSizing: "border-box"
  }
  
  const formInputLabelStyle= {
    width: "100%",
    margin: "0.8rem 0",
    display: "inline-block",
    borderRadius: "4px",
    boxSizing: "border-box"
  }

  const formSubmitButtonStyle= {
    maxWidth: "6rem",
    minWidth:"1fv",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }


export default Registration;