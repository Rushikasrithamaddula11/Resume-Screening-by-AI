import React, { useState } from 'react';  
import axios from 'axios';  

const Signup = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [email, setEmail] = useState('');  

  const handleSignup = async () => {  
    try {  
      const response = await axios.post('http://127.0.0.1:8000/signup', {  
        username,  
        password,  
        email,  
      });  
      console.log(response.data);  
      alert('Signup successful');  
    } catch (error) {  
      console.error('Signup error:', error);  
      alert('Signup failed');  
    }  
  };  

  return (  
    <div className="form-container">  
      <h2>Signup</h2>  
      <input  
        type="text"  
        placeholder="Username"  
        value={username}  
        onChange={(e) => setUsername(e.target.value)}  
        required  
      />  
      <input  
        type="email"  
        placeholder="Email"  
        value={email}  
        onChange={(e) => setEmail(e.target.value)}  
        required  
      />  
      <input  
        type="password"  
        placeholder="Password"  
        value={password}  
        onChange={(e) => setPassword(e.target.value)}  
        required  
      />  
      <button onClick={handleSignup}>Signup</button>  
    </div>  
  );  
};  

export default Signup;