import { getElementError } from "@testing-library/react";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Imageins from '../component/img/etud.png';
import styles from "./inscrit.module.css";

function Inscrit() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTelephone] = useState("");
  const [mail, setCourriel] = useState("");
  const [pwd, setMotDePasse] = useState("");
  const [confirmPwd, setConfirmationMotDePasse] = useState("");
  const [role, setTypeUtilisateur] = useState("");
  const [genre, setgenre] = useState("");
  const [niveau, setNiveau] = useState("");
  const [etab, setEtablissement] = useState("");
  const [description, setDescription] = useState("");
  const [datenai, setDateNaissance] = useState(""); // Changement ici
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();

  const verifNum = (input) => {
    return /^\d{8}$/.test(input);
  };

  const verifAlpha = (input) => {
    return /^[A-Za-z]+$/.test(input);
  };

  const handleChangeNom = (event) => {
    const valeurInput = event.target.value;
    setNom(valeurInput);
    setErreur("");
  };

  const handleChangePrenom = (event) => {
    const valeurInput = event.target.value;
    setPrenom(valeurInput);
    setErreur("");
  };

  const handleChangeTelephone = (event) => {
    const valeurInput = event.target.value;
    setTelephone(valeurInput);
    setErreur("");
  };

  const handleChangeCourriel = (event) => {
    const valeurInput = event.target.value;
    setCourriel(valeurInput);
    setErreur("");
  };

  const handleChangeMotDePasse = (event) => {
    setMotDePasse(event.target.value);
    setErreur("");
  };

  const handleChangeConfirmationMotDePasse = (event) => {
    setConfirmationMotDePasse(event.target.value);
    setErreur("");
  };

  const handleChangeTypeUtilisateur = (event) => {
    setTypeUtilisateur(event.target.value);
    setErreur("");
  };
  const handleChangegenre = (event) => {
    setgenre(event.target.value);
    setErreur("");
  };

  const handleChangeNiveau = (event) => {
    const valeurInput = event.target.value;
    setNiveau(valeurInput);
    setErreur("");
  };

  const handleChangeEtablissement = (event) => {
    const valeurInput = event.target.value;
    setEtablissement(valeurInput);
    setErreur("");
  };

  const handleChangeDescription = (event) => {
    const valeurInput = event.target.value;
    setDescription(valeurInput);
    setErreur("");
  };

  const handleChangeDateNaissance = (event) => {
    const valeurInput = event.target.value;
    setDateNaissance(valeurInput);
    setErreur("");
  };

  const validerFormulaire = () => {
    if (!nom.trim() || !prenom.trim() || !tel.trim() || !mail.trim() || !pwd.trim() || !confirmPwd.trim() || !role.trim()|| !genre.trim()) {
      setErreur("Veuillez remplir tous les champs.");
      return false;
    }

    if (!verifAlpha(nom)) {
      setErreur("Le nom ne doit contenir que des lettres.");
      return false;
    }

    if (!verifAlpha(prenom)) {
      setErreur("Le prénom ne doit contenir que des lettres.");
      return false;
    }

    if (!verifNum(tel)) {
      setErreur("Le numéro de téléphone doit contenir exactement 8 chiffres.");
      return false;
    }

    if (pwd.length < 6) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }

    if (pwd !== confirmPwd) {
      setErreur("Le mot de passe et la confirmation ne correspondent pas.");
      return false;
    }

    if (role === "student" && (!niveau.trim() || !etab.trim() || !description.trim())) {
      setErreur("Veuillez remplir tous les champs pour un étudiant.");
      return false;
    }

    

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validerFormulaire()) {
      return;
    }
    try {
      const reponse = await fetch("http://localhost:8090/inscri-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: nom,
          lastName: prenom,
          tel: tel,
          mail: mail,
          pwd: pwd,
          role: role,
          eduLevel: niveau,
          etablissement: etab,
          description: description,
          dateNaissance: datenai,
          signInDate: null,
          genre: genre,
        }),
      });
  
      if (!reponse.ok) {
        throw new Error("Erreur lors de la requête d'inscription.");
      }
  
      const donnees = await reponse.json();
      console.log("Réponse du backend:", donnees);
  
      if (role === "student" || role === "employer") {
        navigate("/login");
      }
    } catch (erreur) {
      console.error("Erreur lors de la requête d'inscription:", erreur);
      setErreur("utilisateur deja existe.");
      return setTimeout(() => {
        setErreur(""); 
      }, 2000);
    }
  };
  return (
    <div className={styles.inscritbody}>
         <header className={styles.insheader}>
      <img src={Imageins} alt='' className={styles.inslogo}></img>
      <ul className={styles.insnavlist}>
        <li className={styles.insnavitem}><Link to="/acceuil" className={styles.link1}>Acceuil</Link></li>
        <li className={styles.insnavitem}><Link to="/login" className={styles.link2}>Login</Link></li>
      </ul>
          </header> 
    <div id={styles.inscrit} className={styles.tabcontent}>
      <form className={styles.registration_form} action="" method="post" onSubmit={handleSubmit}>
      <p className={styles.p1inscrit}>Créer votre compte</p>
        {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          <div className={styles.labelinput1}>
            <label htmlFor="user_name">Nom</label>
              <input  type="text"  id="user_name"  className={styles.inputinscrit1}  autoComplete="off"  placeholder="entrer votre nom" value={nom}
                onChange={handleChangeNom}    />
                <p className={styles.prenom}>Prénom</p>
                {/* <label htmlFor="user_family_name">Prénom</label>*/}
               <input  type="text"  id="user_family_name" className={styles.inputinscrit1}  autoComplete="off"
                placeholder="entrer votre prénom"
                value={prenom} onChange={handleChangePrenom}  />
            </div>


          <div id="inp" className={styles.labelinput}>
              <label htmlFor="user_email">Email</label>            
              <input type="email"  id="user_email" className={styles.inputinscrit}   
              autoComplete="off" placeholder="entrer votre e-mail" value={mail}
                onChange={handleChangeCourriel} />
               <label htmlFor="tel">Numéro de tél</label>
               <input  type="text"  id="tel"
                className={styles.inputinscrit}   autoComplete="off"
                placeholder="entrer votre numéro de tél"  value={tel}  onChange={handleChangeTelephone} />
          </div>
          <div id="inp" className={styles.labelinput}>
             <label htmlFor="user_pass">Mot de passe</label>
              <input type="password" id="user_pass" className={styles.inputinscrit}
                autoComplete="off"
                placeholder="entrer votre mot de passe " value={pwd} onChange={handleChangeMotDePasse} /> 
          </div>

          <div id="inp" className={styles.labelinput}>
              <label htmlFor="user_confirm_pass">Confirmer mot de passe</label>
              <input type="password" id="user_confirm_pass"
                className={styles.inputinscrit} autoComplete="off"
                placeholder="confirmer votre mot de passe" value={confirmPwd} onChange={handleChangeConfirmationMotDePasse}/>
          </div>
           
          <div id="inp" className={styles.labelinput}> 
            <label htmlFor="datenai">Date de naissance</label>
              <input type="date"  id="datenai"  className={styles.inputinscrit} autoComplete="off"  placeholder="" 
                value={datenai} onChange={handleChangeDateNaissance} /> 
          </div>

          <p className={styles.pgenre}>Genre</p>
<div className={styles.labelinput4}>
    <label>
      <input
        type="radio" name="genre" value="male"
        className={styles.inputinscrit4} checked={genre === "male"}
        onChange={handleChangegenre}/> Homme </label>
    <label>
      <input
        type="radio"
        name="genre"
        value="female"
        className={styles.inputinscrit4}
        checked={genre === "female"}
        onChange={handleChangegenre} 
      />  Femme</label> 

</div>

  <p className={styles.prole}>Choisir un rôle</p>   
  <div className={styles.labelinput3}>
        <label>
          <input
            type="radio"
            className={styles.inputinscrit3}
            name="role"
            value="student"
            checked={role === "student"}
            onChange={handleChangeTypeUtilisateur}
          />Étudiant </label>
        <label>
          <input type="radio"  name="role" value="employer"
            className={styles.inputinscrit3}
            checked={role === "employer"}onChange={handleChangeTypeUtilisateur}/> 
            Employeur </label>
      </div>
     
          {role === "student" && (
            <>
            <div  className={styles.labelinput5}>
             <label htmlFor="niveau">Niveau</label>
                  <input type="text"
                    id="niveau" className={styles.inputinscrit5}  autoComplete="off"  placeholder="Niveau"
                    value={niveau}
                    onChange={handleChangeNiveau} />
              
              <p htmlFor="etab"  className={styles.petab} >Établissement</p>
                
                  <input  type="text" id="etab"
                    className={styles.inputinscrit5}
                    autoComplete="off"
                    placeholder="Établissement"
                    value={etab}
                    onChange={handleChangeEtablissement}  />
            </div>
            <div className={styles.inputinscrit6}>
                <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    className={styles.inputinscrit6text}
                    placeholder="Description"
                    value={description}
                    onChange={handleChangeDescription} > </textarea> 
           </div>
            </> )}
           
              <input type="submit" id={styles.but} className={styles.bottom1} value="S'inscrire"  />
                   
            </form>
          </div>
      </div>
  );
}

export default Inscrit;