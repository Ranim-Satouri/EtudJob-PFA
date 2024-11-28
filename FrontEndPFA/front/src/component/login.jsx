import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loginim from "../component/img/R (1).png";
import ImageL from "../component/img/etud.png";
import login from "./login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(username)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return setTimeout(() => {
        setError("");
      }, 2000);
    }

    if (!password) {
      setError("Veuillez saisir un mot de passe.");
      return setTimeout(() => {
        setError("");
      }, 2000);
    }

    try {
      const response = await fetch("http://localhost:8090/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: username,
          pwd: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la requête.");
      }

      const data = await response.json();
      console.log("Réponse du backend:", data);

      if (data && data.mail) {
        console.log("Réponse du backend:", data);
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/home";
      } else {
        setError("Aucun utilisateur trouvé avec ces informations.");
        setTimeout(() => {
          setError(""); // Efface le message après 2 secondes
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Aucun utilisateur trouvé avec ces informations.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={login.loginbody}>
      <header className={login.header}>
        <img src={ImageL} alt="" className={login.logo1}></img>
        <ul className={login.navlist1}>
          <li className={login.navitem1}>
            <Link to="/Acceuil" className={login.link1}>
              Acceuil
            </Link>
          </li>
          <li className={login.navitem1}>
            <Link to="/inscrit" className={login.link2}>
              Inscription
            </Link>
          </li>
        </ul>
      </header>
      <div className={login.loginf}>
        <div className={login.divim}>
          <img src={Loginim} alt="" className={login.loginim}></img>
        </div>
        <form
          className={login.login_form}
          action=""
          method="post"
          onSubmit={handleSubmit}
        >
          <p className={login.p1}>EtudJob</p>
          <div style={{ color: "red", width: "110%" }}>
            {error && <div>{error}</div>}
          </div>
          <input
            type="text"
            className="input"
            id="email"
            autoComplete="off"
            placeholder="Email"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            className={login.inp}
            id="pwd"
            autoComplete="off"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <br></br>
          <input type="submit" className={login.button} value="Login" />
          <p className={login.p2}>Vous n'avez pas encore un compte?</p>
          <div className={login.ins}>
            <Link to="/inscrit" className={login.inscrivez}>
              Inscrivez-vous
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
