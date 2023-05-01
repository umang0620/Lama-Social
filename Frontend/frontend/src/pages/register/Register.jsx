import { Link } from "react-router-dom";
import "./register.scss";

export const Register = () => {
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
                    <input type="text" placeholder="Username"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="text" placeholder="Name"/>

                    <button>Register</button>

                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Register