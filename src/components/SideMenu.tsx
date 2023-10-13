import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link } from 'react-router-dom';
import { Chapter } from './interfaces/Chapter';
import './styles/Universal-Style.css';
import Cookies from 'js-cookie';

function SideMenu(){
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
            
            setUser(ID);
      
            if (responseData === null) {
              setError('Invalid username or password');
            }
            else{
              Cookies.set('userId', ID);
              Cookies.set('userRole', '1');
              window.location.href = '/';
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    return(
        <div>
            <h3>Novel Updates</h3>
            <Link to="" className='sideMenuLink'>
                Forum
            </Link><br />
            
            <Link to="" className='sideMenuLink'>
                Random Novel
            </Link><br />

            <Link to="" className='sideMenuLink'>
                Series Finder
            </Link><br />


            <Link to="" className='sideMenuLink'>
                Series Listing
            </Link><br />
    
            <Link to="" className='sideMenuLink'>
                Series Ranking
            </Link><br />

            <Link to="" className='sideMenuLink'>
                Latest Series
            </Link><br />

            <Link to="" className='sideMenuLink'>
                Rec Lists
            </Link><br /><br /><br />


            <h3>User Tools</h3>
            <Link to="/readingList/0" className='sideMenuLink'>
                Reading List
            </Link><br />
            
            <Link to="" className='sideMenuLink'>
                Release Filtering
            </Link><br />

            <Link to="" className='sideMenuLink'>
                Series Filtering
            </Link><br />
    
        </div>
    );
}

export default SideMenu;