import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/auth.css"; // Importing the CSS file for styling

const Login = () => {
    const nameRef = useRef();
    const numberRef = useRef();
    const navigate = useNavigate();

    const getLogin = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const number = numberRef.current.value;

        try {
            const response = await axios.post("http://localhost:4000/api/user/postLogin", { name, number });
            if (response.data) {
                alert("Login successful");
                localStorage.setItem("id", response.data.id);
                navigate("/home");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error(error);
            alert("Error during login");
        }
    };

    const signup = () => {
        navigate("/signup");
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={getLogin}>
                <input type="text" placeholder="Name..." ref={nameRef} required />
                <input type="number" placeholder="Number..." ref={numberRef} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <button onClick={signup} className="link">Sign Up</button></p>
        </div>
    );
};

export default Login;
