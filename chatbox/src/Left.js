import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/left.css";
import axios from "axios";

function Left({ searchResults }) {  // Accept searchResults as a prop
    const id = localStorage.getItem("id");
    const [user, setUser] = useState([]);
    const [noContact, setNoContact] = useState(true);

    useEffect(() => {
        const getContacts = async () => {
            const contacts = await axios.get(`http://localhost:4000/api/user/getContact/${id}`);
            if (contacts.data.length !== 0) {
                setUser(contacts.data);
                setNoContact(false);
            }
        };
        getContacts();
    }, [id]);

    return (
        <div className="left-container">
            <h2 className="contacts-header">Contacts</h2>
            {noContact && searchResults.length === 0 ? (
                <p className="no-contact-message">No contacts available</p>
            ) : (
                <ul className="contact-list">
                    {(searchResults.length > 0 ? searchResults : user).map((us, index) => (
                        <NavLink style={{ textDecoration: "none" }} to={`/home/Right/${us._id}`} key={index}>
                            <li className="list-item">
                                <img className="profile-pic" src={us.photo} alt="DP" />
                                <p className="name">{us.name}</p>
                            </li>
                        </NavLink>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Left;
