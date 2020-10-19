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

    const formatDate = (date) => {	// formats a JS date to 'yyyy-mm-dd'
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
            let userData={"username":username, "password":password, "roles":["ROLE_PLAYER"]};
            let personalData={"email":email,"sex":sex,"birthDate":selectedDate,"country":country}
            axios.post(registraitonUrl,userData)
            .then(res=>{checkResponse(res.data)});
        }

    }
    const checkResponse = (response) => {
        if (response.correct) {
            localStorage.setItem("token", response.token);
            redirect();
        } else {
            console.log(response.msg);
            setErrorMessage(response.msg);
        }
    };
    
    const redirect = () => {
        history.push("/");
        window.location.reload();
    };

    return (
        <div className="registration-page">
            <div className="registration-container">
                <div className="registration-text-container">
                    <h2 className="registration-title">Registration</h2>
                </div>
                <div className="registration-form-container">
                    <form className="registration-form" onSubmit={sendRegistrationDetails}>
                        <label htmlFor="registration-username-input" className="registration-label">Username</label>
                        <input type="text" name="registration-username-input" placeholder="Type your username" className="registration-input" autoComplete="off" required onChange={event => setUsername(event.target.value)}/>
                        <br></br>
                        
                        <label htmlFor="registration-password-input" className="registration-label">Password</label>
                        <input type="password" name="registration-password-input" placeholder="Type your password" className="registration-input" autoComplete="off" required onChange={event => setPassword(event.target.value)}/>
                        <br></br>
                        
                        <label htmlFor="registration-confirm-password-input" className="registration-label">Confirm Password</label>
                        <input type="password" name="registration-confirm-password-input" placeholder="Confirm your password" className="registration-input" autoComplete="off" required onChange={event => setConfirmPassword(event.target.value)}/>
                        <br></br>
                        
                        <label htmlFor="registration-email-input" className="registration-label">Email address</label>
                        <input type="email" name="registration-email-input" placeholder="Type your email address" className="registration-input" autoComplete="off" required onChange={event => setEmail(event.target.value)}/>
                        <br></br>
                        
                        <label htmlFor="registration-sex-input" className="registration-label">Sex</label>
                        <select>
                            <option value="Male" onChange={event => setSex(event.target.value)}>{MALE}</option>
                            <option value="Female" onChange={event => setSex(event.target.value)}>{FEMALE}</option>
                            <option value="Other" onChange={event => setSex(event.target.value)}>{OTHER}</option>
                        </select>
                        <br></br>
                        
                        <label htmlFor="registration-birthdate-input" className="registration-label">Birth Date</label>
                        <DropdownDate  selectedDate={selectedDate}
                        onDateChange={(date) => {        
                            formatDate(date);
                          }}
                          >
                        </DropdownDate>
                        <br></br>

                        <label htmlFor="registration-country-input" className="registration-label">Country</label>
                        <CountryDropdown value={country} onChange={(val) => {setCountry(val)}} />                            
                        <br></br>

                        <input type="submit" className="registration-button" value="Register"/>
                    </form>
                        <h3>{errorMessage}</h3>
                </div>
            </div>
        </div>
    );
};

export default Registration;