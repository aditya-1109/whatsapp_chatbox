import Navbar from "./Navbar";
import Left from "./Left";
import { Outlet } from "react-router-dom"; 
import "./styles/Home.css";
import { useState } from "react";

function Home() {

    const [searchResults, setSearchResults] = useState([]);  // State to store search results

  // Handler to update search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
    return (
        <>
            
            <div className="home-layout">
                <div className="left-section">
                <Navbar onSearch={handleSearchResults} />
                <Left searchResults={searchResults} />
                </div>
                <div className="right-section">
                    <Outlet /> 
                </div>
            </div>
        </>
    );
}

export default Home;
