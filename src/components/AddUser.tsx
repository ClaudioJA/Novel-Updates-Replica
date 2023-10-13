import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddUser(){
    axios.defaults.baseURL = 'http://localhost:5000';

    const [usernameBox, setUsername] = useState('');
    const [passwordBox, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser = {
            username: usernameBox,
            password: passwordBox,
        };

        axios.post('http://localhost:5000/users/add', newUser);

        setUsername('');
        setPassword('');

        window.location.href = '/';
    }
    

    return(
        <div>
            <h1>Add New User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={usernameBox} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" value={passwordBox} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Add User</button>
            </form>
            
            
        </div>
    );
}

export default AddUser;