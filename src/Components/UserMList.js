import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserMList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_USERS_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const saveUser = async () => {
    try {
      const userData = { name, email, role };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, userData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, userData);
      }

      setName('');
      setEmail('');
      setRole('');
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user) => {
    setEditingId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  return (
    <div>
      <h2>User List</h2>
      <input 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        placeholder="Email" 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        placeholder="Role" 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
      />
      <button onClick={saveUser}>
        {editingId ? "Update User" : "Add User"}
      </button>
      
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - Email: {user.email}, Role: {user.role}
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserMList;
