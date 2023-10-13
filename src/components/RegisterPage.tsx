import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link } from 'react-router-dom';
import { Chapter } from './interfaces/Chapter';
import './styles/Universal-Style.css';
import './styles/HomePage-Style.css';
import Cookies from 'js-cookie';

function HomePage(){
    const [usernameBox, setUsername] = useState('');
    const [passwordBox, setPassword] = useState('');
    const [cPasswordBox, setCPassword] = useState('');
    const [error, setError] = useState('');

    axios.defaults.baseURL = 'http://localhost:5000';

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        axios.get('users/find/username/' + usernameBox)
          .then(response => {
            const responseData = response.data;

            // console.log(responseData.username);
      
            if(passwordBox !== cPasswordBox){
                setError('Password doesnt match!');
            }
            else if (responseData === null) {
                axios.post('users/register', {
                    username: usernameBox,
                    password: passwordBox,
                });
                // window.location.href = '/login';
            }
            else{
                setError('Username already existed!');
            //   window.location.href = '/';
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    return(
        <form onSubmit={handleRegister}>
            <label htmlFor="">Username</label>
            <input type="text" value={usernameBox} onChange={(e) => setUsername(e.target.value)}/> <br />

            <label htmlFor="">Password</label>
            <input type="text" value={passwordBox} onChange={(e) => setPassword(e.target.value)}/> <br />
            
            <label htmlFor="">Confirm Password</label>
            <input type="text" value={cPasswordBox} onChange={(e) => setCPassword(e.target.value)}/> <br />

            <button type="submit">Register</button><br />

            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default HomePage;