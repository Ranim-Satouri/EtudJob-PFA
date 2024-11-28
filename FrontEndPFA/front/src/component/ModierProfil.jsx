import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarProf from "./navbarProf";
import Modifiermdp from "./Modifiermdp";
import Me from "./modprof.module.css";
import md from "../component/img/md.png";
import Loginim from "../component/img/R (1).png";
import Navbaretud from "./navbaretud";
import Navbaremp from "./navbaremp";

function ModifierProfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [msg, setmsg] = useState(null);
  const [erreur, setError] = useState(null);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    mail: "",
    dateNaissance: "",
    genre: "",
    eduLevel: "",
    etablissement: "",
    tel: "",
    role: "", 
    description:"",
  });

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

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setFormData({
        ...formData,
        lastName: storedUserData.lastName,
        firstName: storedUserData.firstName,
        mail: storedUserData.mail,
        dateNaissance: new Date(storedUserData.dateNaissance)
          .toISOString()
          .slice(0, 10),
        genre: storedUserData.genre,
        eduLevel: storedUserData.eduLevel,
        etablissement: storedUserData.etablissement,
        tel: storedUserData.tel,
        role: storedUserData.role, 
       description:storedUserData.description,
       
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8090/updateUser/${userData.idUser}`,
       
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, idUser: userData.idUser ,pwd:userData.pwd}),
        }
      );
      if (response.ok) {
        console.log("Données utilisateur mises à jour avec succès !");
        console.log(formData);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...formData, idUser: userData.idUser,pwd:userData.pwd })
        );
        // window.location.href = '/me';
        setmsg("Modification a   réussi.");
        setTimeout(() => {
          setmsg("");
        }, 2000);
        navigate("/me", { replace: true });
      } else {
        console.error("Erreur lors de la mise à jour des données utilisateur");
        setError("La Modification a échoué.");
        return setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
    }
  };

  return (
    <div className={Me.background}>
      {choisirNavbar(user)}
    <div className={Me.loginbody}>
      
      <div   className={Me.tabcontent}>
      
        <form onSubmit={handleSubmit} className={Me.mef}>
          <p className={Me.p1inscrit}>Modifier profil</p>
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          {msg && <div style={{ color: "green" }}>{msg}</div>}
          
            <div className={Me.labelinput1}>
            <label htmlFor="nom"    className={Me.nom}>
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="lastName"
                  value={formData.lastName}
                  className={Me.inputinscrit1}
                  onChange={handleInputChange}
                />
               
             {" "}
 
             <p htmlFor="prenom" className={Me.prenom}>
                  Prénom
                </p>
                <input
                  type="text"
                  id="prenom"
                  name="firstName"
                  value={formData.firstName}
                  className={Me.inputinscrit1}
                  onChange={handleInputChange}
                />
               
              
            </div>
            <div className={Me.labelinput}>
            <label htmlFor="email" className={Me.labele}>
                  Email{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleInputChange}
                  className={Me.inputinscrit} 
                />
                
                <label htmlFor="tel"  >Numéro de tél</label>
                              <input  type="text"  id="tel" className={Me.inputinscrit}   value={formData.tel}     onChange={handleInputChange}  />
              </div>{" "}
            
              <div className={Me.labelinput}>
              <label htmlFor="dateNaissance" className={Me.labele}>
                  Date de Naissance
                </label>
                <input
                   type="date"
                  id="dateNaissance"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleInputChange}
                   readOnly className={Me.inputinscrit} 
                />
               
              </div>{" "}
            
             
              <p className={Me.pgenre}>Genre</p>
<div className={Me.labelinput4}>
<div className={Me.radioWrapper}>
  
      <input className={Me.inputinscrit4}
        type="radio" name="genre" value="male"
         checked={formData.genre === "male"}
         onChange={handleInputChange}
       />  <label className={Me.lab4}> Homme </label>
        </div>
        <div className={Me.radioWrapper}> 
    
      <input  className={Me.inputinscrit4}
        type="radio"
        name="genre"
        value="female"
        onChange={handleInputChange}
        checked={formData.genre=== "female"}
      
      /> <label className={Me.lab4}> Femme</label> 
 </div>
</div>

            {userData && userData.role === "student" && (
              <>
                 <div className={Me.labelinput5}>
                  <div className={Me.edulevel}>
                    <label htmlFor="eduLevel" className={Me.labele}>
                        Niveau d'éducation
                    </label>
                    <input
                      type="text"
                      id="eduLevel"
                      name="eduLevel"
                      value={formData.eduLevel}
                      required
                      onChange={handleInputChange}
                      className={Me.inputinscrit5}
                    />
                  </div>
                   <div className={Me.etab}>
                   <p htmlFor="etablissement" className={Me.petab}> Établissement{" "}</p>
                   <input
                      type="text"
                      id="etablissement"
                      name="etablissement"
                      value={formData.etablissement}
                      required
                      onChange={handleInputChange}
                      className={Me.inputinscrit5}
                    />
                   </div>
                  

                  </div>{" "}
                  <div className={  Me.inputinscrit6}>
                      <label htmlFor="Description" className={Me.labeled}>Description :</label>
                      <textarea type="text" id="Description" value={formData.description} onChange={handleInputChange} className={Me.inputinscrit6text} name="description" > </textarea>    
                  </div>  
                 
              </>
            )}
            <div className={Me.btnc}>
              <Link to="/Modifiermdp">
                <button type="button" className={Me.btn}>
                  Modifier mot de passe
                </button>
              </Link>
              <button type="submit" className={Me.btn2}>
                Enregistrer
              </button>
            </div>
           
        </form>{" "}
      </div>
    </div>
    </div>
  );
}

export default ModifierProfil;
