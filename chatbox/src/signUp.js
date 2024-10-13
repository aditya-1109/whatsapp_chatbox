import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/auth.css"; // Importing the CSS file for styling

const SignUp = () => {
    const nameRef = useRef();
    const numberRef = useRef();
    const photoRef = useRef();
    const navigate = useNavigate();

    const signUpUser = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const number = numberRef.current.value;
        const photo = photoRef.current.value;

        try {
            const response = await axios.post("http://localhost:4000/api/user/signUp", { name, number, photo });
            alert(response.data);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Error during signup");
        }
        nameRef.current.value = "";
        numberRef.current.value = "";
        photoRef.current.value = "";
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form className="auth-form" onSubmit={signUpUser}>
                <input type="text" placeholder="Name..." ref={nameRef} required />
                <input type="number" placeholder="Number..." ref={numberRef} required />
                <input type="text" placeholder="Profile URL..." ref={photoRef} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
