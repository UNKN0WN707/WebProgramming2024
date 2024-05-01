/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Login page for the users.
 */

import React, { useState } from 'react';

const API_URL = 'http://localhost:8081/api/login';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const { token } = await response.json();
        localStorage.setItem('jwt', token);

        } catch (error) {
           console.error('Login failed: ', error); 
        }
    } 
    };

export default Login;