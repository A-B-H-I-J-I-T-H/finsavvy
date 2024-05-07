// Login.js

import React from 'react';
import { Link } from "react-router-dom";
import '../styles/style.css'; // Import your CSS files
// Import your CSS files

const Login = () => {
    return (
        <div className="rrr">
            <div className="box">
                <span className="borderLine"></span>
                <form>
                    <h1>Sign in</h1>
                    <div className="inputbox">
                        <input type="text" required />
                        <span>Username</span>
                        <p></p>
                    </div>
                    <div className="inputbox">
                        <input type="password" required />
                        <p></p>
                        <span>Password</span>
                    </div>
                    <div className="links">
                        <a href="#">Forgot password</a>
                    </div>
                    <Link to="App"><input type="submit" value="Log in" /></Link>
                    <div className="acc">
                        <p>Don't have an account yet?&nbsp;&nbsp;</p>
                        <Link to="SignUpPage">Sign up</Link>
                    </div>
                </form>
            </div>
            <div className="ph">
                <img src="src\assets\stock.png" width="400" height="400" alt="stock" />
            </div>
            <div className="caption">
                <p>Keep your day-to-day transactions with Finsavvy</p>
            </div>
        </div>
    );
}

export default Login;
