import React, { useState } from 'react';  
import axios from 'axios';  

const Login = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  

  const handleLogin = async () => {  
    try {  
      const response = await axios.post('http://127.0.0.1:8000/token', new URLSearchParams({  
        username,  
        password,  
      }), {  
        headers: {  
          'Content-Type': 'application/x-www-form-urlencoded',  
        },  
      });  
      console.log(response.data);  
      alert('Login successful');  
    } catch (error) {  
      console.error('Login error:', error);  
      alert('Login failed');  
    }  
  };  

  return (  
    <div className="form-container">  
      <h2>Login</h2>  
      <input  
        type="text"  
        placeholder="Username"  
        value={username}  
        onChange={(e) => setUsername(e.target.value)}  
        required  
      />  
      <input  
        type="password"  
        placeholder="Password"  
        value={password}  
        onChange={(e) => setPassword(e.target.value)}  
        required  
      />  
      <button onClick={handleLogin}>Login</button>  
    </div>  
  );  
};  

export default Login;