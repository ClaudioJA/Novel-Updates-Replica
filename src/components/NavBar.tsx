import React, { useEffect, useState } from "react";
import './styles/NavBar-Style.css';
import { Link } from "react-router-dom";
import { DarkLightMode } from "./Modes";

function NavBar( {handleChange}: DarkLightMode ) {
    let [profileCheck, setProfile] = useState(false);
    let [darkMode, setDarkMode] = useState(false);
    let [isDark, setDark] = useState(false);
    let [isLight, setLight] = useState(false);
    
    useEffect (() => {
        let isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);

        if(darkMode === true){
            setDark(true);
            setLight(false);
        }
        else if(darkMode === false){
            setDark(false);
            setLight(true);
        }
        // console.log("Dark");
        // console.log(isDark);
        // console.log("Light");
        // console.log(isLight);
    })

    const handleDarkMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentMode = event.target.value;
        // console.log(currentMode);
        
        if(currentMode === 'dark'){
            localStorage.setItem('darkMode', 'true');
            setDarkMode(true);
        }
        else if(currentMode === 'light'){
            localStorage.setItem('darkMode', 'false');
            setDarkMode(false);
        }
        // console.log(darkMode);
        handleChange(!darkMode);
    }

    const handleProfileBtn = () => {
        if(profileCheck == true){
            setProfile(false);
        }
        else{
            setProfile(true);
        }
    }

    return(
        <div className="navbar">
            <div className="navbar-fill">
                <div className="navbar-fill-logo">
                    <Link to="/">Novel Updates</Link>
                </div>
                <div className="navbar-fill-feature">
                    <div className="NavBar-Btn">
                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                        {profileCheck ? <div className="profile-dropdown">
                            <div className="profile-dropdown-item">
                                Theme
                                <select name="mode" id="mode" onChange={handleDarkMode}>
                                    <option value="light" selected={isLight}>Light</option>
                                    <option value="dark" selected={isDark}>Dark</option>
                                </select>
                            </div>
                        </div> : ''}
                        
                    </div>
                    
                    <div className="NavBar-Btn">
                        <Link to="/login">
                            <button>Login</button>
                            {/* <div className="profile-dropdown">
                                <div className="profile-dropdown-item">
                                    Theme
                                </div>
                            </div> */}
                        </Link>
                    </div>

                    <div className="NavBar-Btn">
                        <button onClick={handleProfileBtn}>
                            Profile
                        </button>
                        
                    </div>
                    
                    

                    <div className="NavBar-Btn">
                        <Link to="">
                            <button>S</button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default NavBar;