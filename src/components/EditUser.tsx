import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { User } from './interfaces/User';

function EditUser(){
    axios.defaults.baseURL = 'http://localhost:5000';
    const current_id_unpro = useParams();
    const current_id = current_id_unpro.id;
    // console.log(current_id);
    const [usernameBox, setUsername] = useState('');
    const [passwordBox, setPassword] = useState('');

    const [user, setUser] = useState<User>({ _id: '', username: '', password: '', role: '' });
    useEffect(() => {
        const getCurrent = async () => {
            try {
                // const { current_id } = useParams();
                const response = await axios.get('users/find/' + current_id);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getCurrent();
    }, [current_id]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        setUser((prevUser) => ({ ...prevUser, username: newUsername }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPass = e.target.value;
        setPassword(newPass);
        setUser((prevPass) => ({ ...prevPass, password: newPass }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser = {
            _id: current_id,
            username: usernameBox,
            password: passwordBox,
        };

        console.log(current_id);

        try{
            axios.put('http://localhost:5000/users/update/' + current_id, newUser);
            setUsername('');
            setPassword('');
            console.log("User Updated");
            window.location.href = '/';
        } catch(error){
            console.error('Error updating user:', error);
        }
        
    }
    

    return(
        <div>
            <h1>Update User : {user._id}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username : </label>
                    <input type="text" value={user.username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password : </label>
                    <input type="text" value={user.password} onChange={handlePasswordChange} />
                </div>
                <button type='submit'>Update</button>
            </form>
            
            
        </div>
    );
}

export default EditUser;