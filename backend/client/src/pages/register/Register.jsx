import { Link, Navigate, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from 'axios';

export const Register = () => {
    const [inputs,setInputs] = useState({
        username:"",
        email:"",
        password:"",
        name:"",
    })
    const [err,setErr] = useState(null)
    const navigate  = useNavigate();
    const handleChange = e =>
    {
        setInputs(prev=>({ ...prev,[e.target.name]: e.target.value}));
    }

  // console.log(inputs);
  const handleClick = async e=>
  {
    e.preventDefault()

    try{
    await axios.post("http://localhost:4000/api/auth/register",inputs)
    navigate("/login");
    }
    catch(err)
    {
      setErr(err.response.data)
    }
  }
  return (
    <div className="register">
        <div className="card">
            <div className="left">
                <h1>Lama Social.</h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt mollitia optio quibusdam eveniet expedita ipsum adipisci deleniti praesentium quae debitis!
                </p>
                <span> Do Have An Account?</span>
                <Link to='/login'>
                <button>Login</button>
                </Link>
            </div>
            <div className="right">
                <h1>
                    Register
                </h1>
                <form>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                    {err && err}
                    <button onClick={handleClick}>Register</button>

                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Register