import React, { useEffect, useState } from "react";
import { DropdownDate } from 'react-dropdown-date';
import {CountryDropdown} from 'react-country-region-selector';

const Registration = () => {

    const MALE="Male";
    const FEMALE="Female";
    const OTHER="Other";

    const [selectedDate,setSelectedDate] = useState('1900-01-01');
    const [country,setCountry] = useState();

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
        alert("Registration button pressed!")
    }

    return (
        <div className="registration-page">
            <div className="registration-container">
                <div className="registration-text-container">
                    <h2 className="registration-title">Registration</h2>
                </div>
                <div className="registration-form-container">
                    <form className="registration-form" onSubmit={sendRegistrationDetails}>
                        <label htmlFor="registration-username-input" className="registration-label">Username</label>
                        <input type="text" name="registration-username-input" placeholder="Type your username" className="registration-input" autoComplete="off" required/>
                        <br></br>
                        
                        <label htmlFor="registration-password-input" className="registration-label">Password</label>
                        <input type="password" name="registration-password-input" placeholder="Type your password" className="registration-input" autoComplete="off" required/>
                        <br></br>
                        
                        <label htmlFor="registration-confirm-password-input" className="registration-label">Confirm Password</label>
                        <input type="password" name="registration-confirm-password-input" placeholder="Confirm your password" className="registration-input" autoComplete="off" required/>
                        <br></br>
                        
                        <label htmlFor="registration-email-input" className="registration-label">Email address</label>
                        <input type="email" name="registration-email-input" placeholder="Type your email address" className="registration-input" autoComplete="off" required/>
                        <br></br>
                        
                        <label htmlFor="registration-sex-input" className="registration-label">Sex</label>
                        <select>
                            <option value="Male">{MALE}</option>
                            <option value="Female">{FEMALE}</option>
                            <option value="Other">{OTHER}</option>
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
                </div>
            </div>
        </div>
    );
};

export default Registration;