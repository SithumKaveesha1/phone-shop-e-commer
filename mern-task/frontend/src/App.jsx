import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/users';

function App() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, formData);
                setMessage('User updated successfully!');
            } else {
                await axios.post(API_URL, formData);
                setMessage('User added successfully!');
            }
            setFormData({ name: '', email: '', password: '' });
            setEditingId(null);
            fetchUsers();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving user:', error);
            setMessage('Error saving user.');
        }
    };

    const handleEdit = (user) => {
        setFormData({ name: user.name, email: user.email, password: user.password });
        setEditingId(user._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage('User deleted successfully!');
                fetchUsers();
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div className="container">
            <h1>MERN User Management</h1>
            
            {message && <div className="alert">{message}</div>}

            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                    {editingId ? 'Update User' : 'Add User'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', password: '' }); }}>
                        Cancel
                    </button>
                )}
            </form>

            <div className="user-list">
                <h2>User List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
