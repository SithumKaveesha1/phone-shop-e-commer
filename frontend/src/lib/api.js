const BASE_URL = 'http://localhost:8005/api/users';

export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }
    return data;
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }
    return data;
};

export const getProfile = async (userId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/all-user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
};

export const createProduct = async (formData) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:8005/api/products`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to create product');
    }
    return data;
};

export const updateProductById = async (productId, formData) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:8005/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to update product');
    }
    return data;
};


import axios from 'axios';

export const deleteProductById = async (productId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(`http://localhost:8005/api/products/${productId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
