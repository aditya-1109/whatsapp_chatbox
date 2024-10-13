import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/contact.css"; // Import the CSS file

function Contact() {
    const nameRef = useRef();
    const numberRef = useRef();
    const id = localStorage.getItem("id");
    const navigate = useNavigate();

    const AddContact = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const number = numberRef.current.value;
        const response = await axios.post("http://localhost:4000/api/user/addContact", { number, id });
        nameRef.current.value = "";
        numberRef.current.value = "";
        if (response) {
            alert(response.data);
            navigate("/home");
        }
    };

    return (
        <div className="contact-form-container">
            <form className="contact-form" onSubmit={AddContact}>
                <h2 className="form-header">Add New Contact</h2>

                <label htmlFor="name" className="form-label">Enter the Name</label>
                <input ref={nameRef} id="name" name="name" type="text" className="form-input" placeholder="John Doe" required />

                <label htmlFor="number" className="form-label">Enter the Contact Number</label>
                <input ref={numberRef} id="number" name="number" type="number" className="form-input" placeholder="123-456-7890" required />

                <button className="form-button" type="submit">Add Contact</button>
            </form>
        </div>
    );
}

export default Contact;
