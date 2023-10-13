import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Novel } from './interfaces/Novel'
import { Link } from 'react-router-dom';
import { Chapter } from './interfaces/Chapter';
import './styles/Universal-Style.css';
import './styles/HomePage-Style.css';
import { User } from './interfaces/User';
import UserRoleValidation from './UserRoleValidation';

function UserManagement(){
    const [userList, setUser] = useState<User[]>([]);
    let [darkMode, setDarkMode] = useState(false);

    const [editableData, setEditableData] = useState<User[]>([]);

    axios.defaults.baseURL = 'http://localhost:5000';

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
      const updatedData = [...editableData];
      updatedData[index].role = e.target.value;
      setEditableData(updatedData);
    };

    const handleSave = () => {
      const updatedUsers = editableData.map(user => {
        return {
          _id: user._id, 
          username: user.username,
          password: user.password,
          role: user.role,
        };
      });

      console.log(updatedUsers);
      
      updatedUsers.forEach(user => {
        axios.put('users/update/' + user._id, user)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error updating user data:', error);
          });
      });

      console.log(updatedUsers);
      window.location.reload();
    };

    useEffect (() => {
      let isDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(isDarkMode);
    })

    useEffect(() => {
        const getUserList = async () => {
          try {
            const response = await axios.get('users');
            setUser(response.data);
            setEditableData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        getUserList();
      }, []);


    return(
        <div className='mainPage'>
          <UserRoleValidation />
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index) => (
                        <tr key={user._id} className={index % 2 == 0 ? 'even-row': 'odd-row'}>
                            <th>{user._id}</th>
                            <th>{user.username}</th>
                            <th>{user.password}</th>
                            <th>
                              <select value={user.role} onChange={(e) => handleRoleChange(e, index)}>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                              </select>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <br /> */}<br />
            <button onClick={handleSave}>Save</button>
            <br /><br />

            {/* <div className='newNovelBtn'>
              <Link to={'/novel/add'}>Add New</Link>
            </div> */}
            
        </div>
    );
}

export default UserManagement;