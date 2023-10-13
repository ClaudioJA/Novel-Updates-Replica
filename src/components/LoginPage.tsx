import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link } from 'react-router-dom';
import { Chapter } from './interfaces/Chapter';
import './styles/Universal-Style.css';
import './styles/HomePage-Style.css';
import Cookies from 'js-cookie';

function LoginPage(){
    const [usernameBox, setUsername] = useState('');
    const [passwordBox, setPassword] = useState('');
    const [userId, setUser] = useState('');
    const [error, setError] = useState('');

    axios.defaults.baseURL = 'http://localhost:5000';

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        axios.get('users/login/' + usernameBox + '/' + passwordBox)
          .then(response => {
            const responseData = response.data;
            const ID = responseData._id;
            const role = responseData.role;
            
            setUser(ID);
      
            if (responseData === null) {
              setError('Invalid username or password');
            }
            else{
              Cookies.set('userId', ID);

              if(role == "Admin"){
                Cookies.set('userRole', '1');
              }
              else{
                Cookies.set('userRole', '0');
              }

              
              window.location.href = '/';
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    return(
        <form onSubmit={handleLogin}>
            <label htmlFor="">Username</label>
            <input type="text" value={usernameBox} onChange={(e) => setUsername(e.target.value)}/> <br />

            <label htmlFor="">Password</label>
            <input type="text" value={passwordBox} onChange={(e) => setPassword(e.target.value)}/> <br />

            <button type="submit">Login</button><br />

            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default LoginPage;