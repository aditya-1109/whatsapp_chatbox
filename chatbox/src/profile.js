import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/profile.css"; // Import CSS file

const Profile = () => {
  const id = localStorage.getItem("id");
  const [user, setUser] = useState(null); // Initialize as null to handle initial state
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const photoRef = useRef();

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
  }, [id]); // Add dependency array to only run once

  const changeDp = () => {
    setChange(true); // Toggle to show input field for DP change
  };

  const changephoto = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const photo = photoRef.current.value;
    try {
      const response = await axios.post("http://localhost:4000/api/user/changeDp", { id, photo });
      alert(response.data);
      setChange(false); // Reset the form after submission
    } catch (error) {
      console.error("Error changing DP", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("id");
    navigate("/"); // Navigate to the login page after logout
  };

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={() => navigate("/home")}>Back</button>
      {user ? (
        <>
          <div className="profile-info">
            <img className="profile-picture" src={user.photo} alt="Profile DP" />
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-number">{user.number}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      {change ? (
        <form className="dp-form" onSubmit={changephoto}>
          <input className="dp-input" type="text" placeholder="Enter Image URL..." ref={photoRef} />
          <input className="dp-submit" type="submit" value="Change DP" />
        </form>
      ) : (
        <button className="change-dp-btn" onClick={changeDp}>Change DP</button>
      )}

      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
