import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // --- untuk akun adminnya di dashboard (bisa di ganti ) ---
        const adminUser = "reyrim"; // --- bisa di ganti "" nya jangan ilang) ---
        const adminPass = "wakwaw"; 

        if (username === adminUser && password === adminPass) {
            
            localStorage.setItem('isAdmin', 'true');
            alert("Login Berhasil!");
            navigate('/dashboard'); 
        } else {
            alert("Username atau Password salah!");
        }
    };

    return (
        <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', background:'#f0f2f5'}}>
            <form onSubmit={handleLogin} style={{background:'white', padding:'40px', borderRadius:'10px', boxShadow:'0 4px 10px rgba(0,0,0,0.1)', width:'300px'}}>
                <h2 style={{textAlign:'center', marginBottom:'20px'}}>Admin Login</h2>
                
                <div style={{marginBottom:'15px'}}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{width:'100%', padding:'10px', border:'1px solid #ddd', borderRadius:'5px'}}
                    />
                </div>
                
                <div style={{marginBottom:'20px'}}>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{width:'100%', padding:'10px', border:'1px solid #ddd', borderRadius:'5px'}}
                    />
                </div>

                <button type="submit" style={{width:'100%', padding:'12px', background:'#3498db', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontWeight:'bold'}}>
                    MASUK
                </button>
            </form>
        </div>
    );
};

export default Login;