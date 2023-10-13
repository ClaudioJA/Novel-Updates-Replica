import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './interfaces/User'
import { Link } from 'react-router-dom';

function HomePage(){
    const [userData, setUser] = useState<User[]>([]);

    axios.defaults.baseURL = 'http://localhost:5000';

    useEffect(() => {
        const getUser = async () => {
          try {
            const response = await axios.get('users');
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        getUser();
      }, []);

    function handleUserDeletion(target_id: string){
        try{
            axios.post('http://localhost:5000/users/delete/' + target_id);
            console.log("User Deleted");
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        
    }

    return(
        <div>
            <h1>Show User Data</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user._id}>
                            <th>{user._id}</th>
                            <th>{user.username}</th>
                            <th>{user.password}</th>
                            <th>
                                <Link to={'/user/update/' + user._id}>Edit</Link><span>     </span>
                                <button onClick={() => handleUserDeletion(user._id)}>Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table><br />
            <Link to={'/user/add'}>Add New</Link>
        </div>
    );
}

export default HomePage;