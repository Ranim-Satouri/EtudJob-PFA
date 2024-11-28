import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import Me from "./Me.module.css";
import Navbaretud from "./navbaretud";
import Navbaremp from "./navbaremp";
import NavbarProf from "./navbarProf";
import Loginim from '../component/img/R (1).png';
import md from '../component/img/md.png';
import styles from "./inscrit.module.css";
 function Profil() {
  const [userData, setUserData] = useState(null);
  const [showModifierProfile, setShowModifierProfile] = useState(false);
  const [msg, setmsg] = useState(null);
  const [erreur, setError] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis le localStorage
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      const date = new Date(storedUserData.dateNaissance);
      const dateString = date.toLocaleDateString();
      storedUserData.dateNaissance = dateString;
      setUserData(storedUserData);
    }
  }, []);
  const handleModifierClick = () => {
    setShowModifierProfile(true);
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

  
  const renderUserDataForm = () => {
    return (
    <div  className={Me.background}>   
      {choisirNavbar(user)}
    <div  className={Me.loginbody}> 
        
     {/* <div className={Me.loginf}>
        <div className={Me.divim}>
          <img src={Loginim} alt="" className={Me.loginim}></img>
    </div>*/}
      <div   className={Me.tabcontent}> 
        <form className={Me.mef}>
            <p className={Me.p1inscrit}>Votre profil</p>
      
        <div className={Me.labelinput1}>
          <label htmlFor="user_name" className={Me.nom}>Nom</label>
          <input type="text"  id="user_name" value={userData.lastName} className={Me.inputinscrit1} readOnly />
        
        
        
          <p htmlFor="prenom" className={Me.prenom}>Prénom</p>
          <input type="text" id="prenom" value={userData.firstName} className={Me.inputinscrit1} readOnly />
        </div>
        
          
        <div className={Me.labelinput}>
        <label htmlFor="email"  >Email</label>
          <input  type="email"  id="user_email" className={Me.inputinscrit}   value={userData.mail} readOnly  />
          
          <label htmlFor="tel"  >Numéro de tél</label>
          <input  type="text"  id="tel" className={Me.inputinscrit}   value={userData.tel} readOnly  />
        </div>



        <div className={Me.labelinput}>
        <label htmlFor="dateNaissance" className={Me.labele}>Date de Naissance</label>
            <input type="text" id="dateNaissance" value={userData.dateNaissance} readOnly className={Me.inputinscrit} />
          
        </div>  


    <p className={Me.pgenre}>Genre</p>
    <div className={Me.labelinput4}>
    <div className={Me.radioWrapper}>
  
      <input className={Me.inputinscrit4}
        type="radio" name="genre" value="male"
         checked={userData.genre === "male"}
       />  <label className={Me.lab4}> Homme </label>
        </div>
        <div className={Me.radioWrapper}> 
    
      <input  className={Me.inputinscrit4}
        type="radio"
        name="genre"
        value="female"
       
        checked={userData.genre=== "female"}
      
      /> <label className={Me.lab4}> Femme</label> 
 </div>
</div>

    {userData.role  === "student" && (
<>

    <div className={Me.labelinput5}>
    <label htmlFor="eduLevel" >Niveau </label>
     
      <input type="text" id="eduLevel" value={userData.eduLevel} readOnly className={Me.inputinscrit5} />
    
     
      <p htmlFor="etablissement" className={Me.petab}>Établissement </p>
      <input type="text" id="etablissement" value={userData.etablissement} readOnly    className={Me.inputinscrit5} />
      
    </div> 
    
    <div className={  Me.inputinscrit6}>
        <label htmlFor="Description" className={Me.labeled}>Description</label>
        <textarea type="text" id="Description" value={userData.description} readOnly  className={Me.inputinscrit6text}  > </textarea>                        
    </div>  
    </>)}
{showModifierProfile ? (
  <>
    <Link to="/ModierProfil">
    <button type="button" onClick={handleModifierClick} className={Me.bottom1}>
      Modifier
    </button>
    </Link>
   
  </>
) : (
  <button type="button" onClick={handleModifierClick} className={Me.bottom1}>
    Modifier
  </button>
)}      

  
   
        </form> 
      </div>
    </div> 
  </div> 
  );
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Profil">
      {renderUserDataForm()}
    </div>
  );
}

export default Profil;
