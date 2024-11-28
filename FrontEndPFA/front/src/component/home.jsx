import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import home from "./home.module.css";

function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    redirectUser(userData);
  }, []);
  const redirectUser = (userData) => {
    if (userData) {
      console.log();
      switch (userData.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "employer":
          navigate("/employeur");
          break;
        case "student":
          navigate("/etudiant");
          break;
        default:
          console.error("Type d'utilisateur non reconnu");
      }
    }
  };

  return (
    <div>
      <p>Redirection en cours...</p>
    </div>
  );
}

export default HomePage;
