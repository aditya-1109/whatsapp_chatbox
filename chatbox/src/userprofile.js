import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles/profile.css";


const UserProfile=()=>{
    const {id}= useParams();
    const [user, setUser]= useState();
    const navigate= useNavigate();

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

      return(
        <>
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
      </div>
        </>
      )

};

export default UserProfile;