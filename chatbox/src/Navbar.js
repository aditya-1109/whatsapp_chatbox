import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/navbar.css"; // Ensure your styles are imported

const Navbar = ({ onSearch }) => {  // onSearch is passed as a prop
  const id = localStorage.getItem("id");
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const searchRef = useRef();

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/user/findme", { id });
        setUser(response.data); // Update user state
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    getMe();
  }, [id]);

  const showProfile = () => {
    navigate("/home/profile");
  };

  const search = async () => {
    const contact = searchRef.current.value;
    try {
      const response = await axios.post("http://localhost:4000/api/user/findContact", { contact , id});
      onSearch(response.data); // Pass search results to parent component via onSearch
    } catch (error) {
      console.error("Error during search", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink className="add-button" to="/home/contact">+</NavLink>
        <input className="input-contact" ref={searchRef} type="text" placeholder="Search..." />
        <button className="search-button" onClick={search}>Search</button>
        {user && (
          <button className="profile-button" onClick={showProfile}>
            <img src={user.photo} alt="Profile" className="profile-image" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
