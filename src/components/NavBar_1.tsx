import React, { useEffect, useState } from "react";
import './styles/NavBar-Style.css';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { DarkLightMode } from "./Modes";

function NavBar_1( {handleChange}: DarkLightMode ){
    let [profileCheck, setProfile] = useState(false);
    const [userName, setUsername] = useState('');
    const [userRole, setRole] = useState<string | undefined>(undefined);

    let [darkMode, setDarkMode] = useState(false);
    let [isDark, setDark] = useState(false);
    let [isLight, setLight] = useState(false);

    useEffect(() => {
        const getUsername = async () => {
            try{
                const userId = Cookies.get('userId');

                const response = await axios.get('users/find/' + userId);
                const name = response.data;

                setUsername(name.username);

            }
            catch (error) {
                console.error('Error fetching novel data:', error);
            }
        }

        getUsername();
    })

    useEffect (() => {
        let isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);

       setRole(Cookies.get("userRole"));

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

    const handleLogout = () => {
        Cookies.remove('userRole');
        Cookies.remove('userId');
        window.location.href = '/';
    }

    return(
        <div className="navbar">
            <div className="navbar-fill">
                <div className="navbar-fill-logo">
                    <Link to="/">Novel Updates</Link>
                </div>
                <div className="navbar-fill-feature">
                    <div className="NavBar-Btn">
                        <button onClick={handleProfileBtn}>
                            {userName}
                        </button>
                        {profileCheck ? <div className="profile-dropdown">
                            <div className="profile-dropdown-item">
                                Account Setting
                            </div>

                            <div className="profile-dropdown-item">
                                User Profile
                            </div>

                            <div className="profile-dropdown-item">
                                Following
                            </div>

                            <div className="profile-dropdown-item">
                                Theme
                                <select name="mode" id="mode" onChange={handleDarkMode}>
                                    <option value="light" selected={isLight}>Light</option>
                                    <option value="dark" selected={isDark}>Dark</option>
                                </select>
                            </div>

                            <div className="profile-dropdown-item" onClick={handleLogout}>
                                Log Out
                            </div>
                        </div> : ''}
                    </div>
                    
                    {userRole == '1' ? 
                        <div className="NavBar-Btn">
                        <Link to="/userlist">
                            <button>User List</button>
                        </Link>
                        
                        
                    </div>
                    : ""}

                    <div className="NavBar-Btn">
                        <Link to="/userlist">
                            <button>M</button>
                        </Link>
                        
                        
                    </div>
                    
                    <div className="NavBar-Btn">
                        <Link to="">
                            <button>N</button>
                            {/* <div className="profile-dropdown">
                                <div className="profile-dropdown-item">
                                    Theme
                                </div>
                            </div> */}
                        </Link>
                    </div>

                    <div className="NavBar-Btn">
                        <Link to="">
                            <button>M</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar_1;