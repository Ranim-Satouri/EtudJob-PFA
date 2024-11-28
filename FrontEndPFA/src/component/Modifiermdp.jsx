import React, { useState , useEffect} from "react";
import Me from "./Modifiermdp.module.css";
import NavbarProf from "./navbarProf";
import Navbaretud from "./navbaretud";
import Navbaremp from "./navbaremp";

function Modifiermdp() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  console.log(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //navbar ----------------------------------------------
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    choisirNavbar(userData);
  }, []);
  const choisirNavbar = (userData) => {
    if (!userData) return null; // Add this line to ensure userData is not null/undefined

    if (userData.role === "student") {
      return <Navbaretud />;
    } else if (userData.role === "employer") {
      return <Navbaremp />;
    } else if (userData.role === "admin") {
      return null;
    } else {
      return null;
    }
  };

  //------------------------------------------------
  
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(userData.idUser);
      console.log(formData.oldPassword);
      const verifyResponse = await fetch(
        `http://localhost:8091/verifierPwd/${userData.idUser}/${formData.oldPassword}`
      );
      console.log(verifyResponse, "verifyResponse");
      if (verifyResponse.ok) {
        const isPasswordCorrect = await verifyResponse.json();
        console.log(isPasswordCorrect);
        setIsPasswordCorrect(isPasswordCorrect);
        if (isPasswordCorrect) {
          const updateResponse = await fetch(
            `http://localhost:8091/modifierMotdePasse/${userData.idUser}/${formData.newPassword}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ oldPassword: formData.oldPassword }),
            }
          );
          
          if (updateResponse.ok) {
            console.log("Mot de passe modifié avec succès !");
            window.location.href = '/me';
          } else {
            console.error("Erreur lors de la modification du mot de passe");
          }
        } else {
          setPasswordCheckError("Mot de passe incorrect. Veuillez réessayer.");
        }
      } else {
        console.error("Erreur lors de la vérification du mot de passe");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
    }
  };

  return (
    <div className={Me.background}>
      {choisirNavbar(user)}
    
    <div className={Me.Modifiermdpbody}>
      <div className={Me.tabcontent}>
        <form onSubmit={handlePasswordUpdate} className={Me.mef}>
          <p className={Me.p1inscrit}>Modifier votre mot de passe</p>
          
          
              <div className={Me.labelinput} >
                <label htmlFor="oldPassword" >
                  Ancien Mot de Passe{" "}
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  required
                  className={Me.inputinscrit} 
                />
             
            </div>
           
              <div className={Me.labelinput} >
              <label htmlFor="newPassword" className={Me.lab}>
                  Nouveau Mot de Passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  className={Me.inputinscrit} 
                />
               
             
            </div>
            <div className={Me.labelinput}>
               
              <label htmlFor="confirmPassword" className={Me.lab}>
                  Confirmer le Nouveau Mot de Passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={Me.inputinscrit} 
                />
               
              </div> 
            {passwordCheckError && (
              <div style={{ color: "red" }}>{passwordCheckError}</div>
            )}
            <button type="submit" className={Me.bottom1}>
              Modifier Mot de Passe
            </button>
         </form>{" "}
      </div>
    </div>
    </div>
  );
}

export default Modifiermdp;
