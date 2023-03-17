import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// css file
import '../style/login.css';


const Login = () => {

    const [credentials, setCredentials] = useState({ department: '', email: '', password: '' });
    const navigate = useNavigate();

    const onChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { department, email, password } = credentials;

        if (department === "") {
            alert('Please Select Department');
        }

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ department, email, password })
            })

            const info = await response.json();
            
            if (info.authtoken === undefined) {
                setCredentials({ email: '', password: '' });
                return alert('Invalid Credentials');
            }

            localStorage.setItem('token', info.authtoken);
            localStorage.setItem('department', department);

            navigate('/home');


        } catch (error) {
            setCredentials({ department: '', email: '', password: '' });
            alert('Invalid Credentials');
        }

    }

    return (
        <>
            <div className='loginpage'>

                <div className="login-box">
                    <h3>USER LOGIN</h3>

                    <form onSubmit={handleSubmit}>
                        <select className="form-select mb-3" name='department' onChange={onChange} >
                            <option value="">--Select Department--</option>
                            <option value="Administrative">--Administrative</option>
                            <option value="Production">--Production</option>
                            <option value="Quality">--Quality</option>
                        </select>
                        <div className="user-box">
                            <input type="text" required name='email' onChange={onChange} value={credentials.email}/>
                            <label >Username*</label>
                        </div>
                        <div className="user-box">
                            <input type="password" required name='password' onChange={onChange} value={credentials.password} />
                            <label >Password*</label>
                        </div>

                        <button type="submit">LogIn</button>
                    </form>

                </div>
            </div>

        </>
    )
}

export default Login