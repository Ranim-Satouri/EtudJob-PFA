import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbaretud";
import Save from "../component/img/save.png";
import babysittingImage from "../component/img/Babysitting.jpeg";
import AssistanceImage from "../component/img/Assistance.jpeg";
import EnseignementImage from "../component/img/Enseignement.jpeg";
import WaiterImage from "../component/img/serveur.jpeg";
import CaissierImage from "../component/home/Caissier.jpg";
import service_de_livraisonImage from "../component/home/Service_de_livraison.jpg";
import Service_clientImage from "../component/home/Service_client.jpg";
import NettoyageImage from "../component/home/Nettoyage.png";
import InformatiqueImage from "../component/home/Informatique.png";
import Gestion_des_médias_sociauxImage from "../component/home/Gestion_des_médias_sociaux.png";
import Soins_aux_animauxImage from "../component/home/Soins_aux_animaux.jpg";
import BricolageImage from "../component/home/Bricolage.jpg";
import styles from "./etudiant.module.css";
import description from "../component/home/description.png";
import localisation from "../component/home/localisation.png";
import email from "../component/home/email.png";
import telephone from "../component/home/fixe.png";
import personne from "../component/home/profil.png";
import Erreur from "../component/img/erreur.jpg";

function Etudiant() {
  const navigate = useNavigate();

  // Récupérer l'ID utilisateur depuis localStorage
  const [idUser, setUser] = useState(null);
  const [offres, setOffres] = useState(null);
  const [categorie, setCategorie] = useState([]);
  const [lieu, setLieu] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [erreur, setErreur] = useState("");
  const [succes, setsucces] = useState("");
  const [categorielist] = useState(null);
  const [mailerreur, setMailErreur] = useState("");

  // Nouveaux états pour la pop-up et le sujet du courriel
  const [showPopup, setShowPopup] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailText, setEmailText] = useState("");
  const [selectedOffreId, setSelectedOffreId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    console.log(userData.idUser);
    if (userData && userData.idUser) {
      setUser(userData.idUser);
      fetchOffres(userData.idUser);
      fetchCategories();
    } else {
      setMessage("Utilisateur non trouvé");
    }
  }, [lieu]);

  // Fonction pour récupérer les offres
  const fetchOffres = async (idUser) => {
    try {
      var url = `http://localhost:8091/offre/getOffresNonEnregistreesParUtilisateur/${idUser}`;
      if (lieu) {
        url = `http://localhost:8091/offre/getOffrebyLocation/${lieu}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des offres");
      }
      const data = await response.json();
      setOffres(data);
      localStorage.setItem("offres", JSON.stringify(data));
      setMessage("");
    } catch (error) {
      console.error("Error fetching offres:", error);
      setMessage(
        "Une erreur s'est produite lors de la récupération des offres"
      );
    }
  };

  // Fonction pour récupérer les catégories
  const fetchCategories = async () => {
    try {
      const url = "http://localhost:8091/getCategories";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      const data = await response.json();
      setCategorie(data);
      localStorage.setItem("categories", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMessage(
        "Une erreur s'est produite lors de la récupération des catégories"
      );
    }
  };

  // Fonction pour gérer le changement de catégorie
  const handleChangeCategorie = async (event) => {
    const selectedCat = event.target.value;
    try {
      let url = `http://localhost:8091/offre/getOffresbycategorie/${selectedCat}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("");
      }
      const data = await response.json();
      setOffres(data);
      setMessage(""); // Clear any error messages
    } catch (error) {
      console.error("Error fetching offres by categorie:", error);
      setMessage("");
    }
  };

  // Fonction pour gérer le changement de lieu
  const handleChangeLieu = (event) => {
    setLieu(event.target.value);
  };
  const handleClick = async (offreId, userId) => {
    console.log("Offre ID:", offreId);
    console.log("User ID:", userId);
    try {
      const response = await fetch(
        `http://localhost:8091/addsave/${userId}/${offreId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la requête.");
      } else {
        console.log("jawna behi");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  // Fonction pour postuler à une offre
  const handlePostuler = async (offre) => {
    setSelectedOffreId(offre.idOffre);
    setShowPopup(true);
  };

  // Fonction pour envoyer un email
  const handleSendEmail = async () => {
    try {
      if (!emailSubject || !emailText) {
        throw new Error("Veuillez remplir objet et texte.");
      }
      const selectedOffre = offres.find(
        (offre) => offre.idOffre === selectedOffreId
      );
      if (!selectedOffre) {
        throw new Error("Offre non trouvée.");
      }

      const emailss = selectedOffre.user.mail;

      const userData = JSON.parse(localStorage.getItem("user"));
      const userEmail = userData.mail;
      const offreTitle = selectedOffre.titre;

      // Construire le texte du mail avec l'adresse e-mail de l'utilisateur et le titre de l'offre
      const mailText = `Adresse e-mail de l'utilisateur : ${userEmail}\n\n  Souhaite postuler pour l'offre : "${offreTitle}".\n\n${emailText}`;
      console.log(mailText);
      console.log(userData);
      const response = await fetch(
        `http://localhost:8091/sendEmail?to=${emailss}&subject=${emailSubject}&text=${mailText}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new mailerreur("Erreur lors de la requête.");
      } else {
        console.log("Postulation avec succès");
        handleClosePopup();
        setsucces("Mail envoyé avec succès.");
        setTimeout(() => {
          setsucces("");
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur:", error.message);
      setMailErreur(error.message);
      setTimeout(() => {
        setMailErreur("");
      }, 2000);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedOffreId(null);
    setEmailSubject("");
    setEmailText("");
  };

  const handleEmailSubjectChange = (event) => {
    setEmailSubject(event.target.value);
  };

  const handleEmailTextChange = (event) => {
    setEmailText(event.target.value);
  };

  // Tableau d'images pour les catégories
  const categorieImages = {
    Babysitting: babysittingImage,
    Assistance: AssistanceImage,
    Enseignement: EnseignementImage,
    Waiter: WaiterImage,
    Service_clientele: Service_clientImage,
    Caissier: CaissierImage,
    Service_de_livraison: service_de_livraisonImage,
    Bricolage: BricolageImage,
    Gestion_des_médias_sociaux:Gestion_des_médias_sociauxImage,
    Nettoyage: NettoyageImage,
    Soins_aux_animaux: Soins_aux_animauxImage,
    Informatique: InformatiqueImage,
  };

  // Affichage du composant
  return (
    <div className={styles.body}>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.dropheader}>
          <div className={styles.drop}>
            <h2 className={styles.h2}>Les Offres Les plus récentes</h2>
            <div className={styles.drops}>
              <div className={styles.Catdrop}>
                <p className={styles.categorietext}>Categorie</p>
                <select
                  className={styles.select}
                  onChange={handleChangeCategorie}
                >
                  <option value="0">Tous</option>
                  {categorie &&
                    categorie.map((categorieItem) => {
                      return (
                        <option
                          key={categorieItem.idcategorie}
                          value={categorieItem.idcategorie}
                        >
                          {categorieItem.libelle}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={styles.Lieudrop}>
                <p className={styles.lieutext}>Gouvernorat</p>
                <select
                  className={styles.select}
                  value={lieu}
                  onChange={handleChangeLieu}
                  id={styles.lieu}
                >
                  <option value="">Tous</option>
                  <option value="">Tous</option>
                  <option value="En Ligne">En Ligne</option>
                  <option value="Manouba">Manouba</option>
                  <option value="Tunis">Tunis</option>
                  <option value="Ben Arous">Ben Arous</option>
                  <option value="Béja">Béja</option>
                  <option value="Bizerte">Bizerte</option>
                  <option value="Gabès">Gabès</option>
                  <option value="Gafsa">Gafsa</option>
                  <option value="Jendouba">Jendouba</option>
                  <option value="Kairouan">Kairouan</option>
                  <option value="Kasserine">Kasserine</option>
                  <option value="Kébili">Kébili</option>
                  <option value="Kef">Kef</option>
                  <option value="Mahdia">Mahdia</option>
                  <option value="Médenine">Médenine</option>
                  <option value="Monastir">Monastir</option>
                  <option value="Nabeul">Nabeul</option>
                  <option value="Sfax">Sfax</option>
                  <option value="Sidi Bouzid">Sidi Bouzid</option>
                  <option value="Siliana">Siliana</option>
                  <option value="Sousse">Sousse</option>
                  <option value="Tataouine">Tataouine</option>
                  <option value="Tozeur">Tozeur</option>
                  <option value="Zaghouan">Zaghouan</option>
                  <option value="Online">Zaghouan</option>
                </select>
              </div>
            </div>
          </div>
          {message && <p>{message}</p>}
          {showSuccessMessage && (
            <div
              className={styles.success - message}
              style={{ width: "200px", height: "30px", marginLeft: "670px" }}
            >
              Save avec succès
            </div>
          )}
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}

          {offres ? (
            <div className={styles.box}>
              {message && <p>{message}</p>}
              {offres && offres.length === 0 && (
                <div className={styles.blaketerreur}>
                  <div className={styles.taswira}>
                    <p className={styles.nooffre}>Aucune offre disponible !</p>
                  </div>
                </div>
              )}
              {message && (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={Erreur}
                    alt="Erreur"
                    style={{
                      width: "500px",
                      height: "500px",
                      marginLeft: "40px",
                      marginTop: "42px",
                    }}
                  />
                  <p>{message}</p>
                </div>
              )}
              {offres.map((offre, index) => (
                <div key={index} className={styles.offre}>
                  <div className={styles.part}>
                    <img
                      src={Save}
                      alt=""
                      className={styles.saveb}
                      onClick={() => handleClick(offre.idOffre, idUser)}
                    />
                    <h3 className={styles.titreOffre}>{offre.titre}</h3>
                    <div className={styles.iconplusp}>
                      <img src={description} alt="" className={styles.iconi} />
                      <p className={styles.desc}>{offre.description}</p>
                    </div>
                    <div className={styles.iconplusp}>
                      <img src={localisation} alt="" className={styles.iconi} />
                      <p className={styles.lieu}>
                        <strong>{offre.lieu}</strong>{" "}
                      </p>
                    </div>
                    <div className={styles.iconplusp}>
                      <img src={telephone} alt="" className={styles.iconi} />
                      <p className={styles.lieu}>
                        <strong>{offre.user.tel}</strong>
                      </p>
                    </div>
                    <div className={styles.iconplusp}>
                      <img src={email} alt="" className={styles.iconi} />
                      <p className={styles.lieu}>
                        <strong>{offre.user.mail}</strong>
                      </p>
                    </div>
                    <div className={styles.bouttons}>
                      <button
                        className={styles.postulerButton}
                        onClick={() => handlePostuler(offre)}
                      >
                        Postuler
                      </button>
                    </div>
                  </div>
                  <div className={styles.imageCat}>
                    {categorieImages[offre.categorie.libelle] ? (
                      <img
                        src={categorieImages[offre.categorie.libelle]}
                        alt={offre.categorie.libelle}
                        className={styles.imageint}
                      />
                    ) : (
                      <p className={styles.noOffre}>Pas d'image disponible</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !message && <p>Chargement des offres...</p>
          )}
        </div>
      </div>
      {showPopup && (
        <div className={`${styles.popup} ${styles.popupInner}`}>
          <h2>Envoyer un email</h2>
          {mailerreur && <div style={{ color: "red" }}>{mailerreur}</div>}

          <label htmlFor="emailSubject" className={styles.objet}>
            Objet{" "}
          </label>

          <input
            type="text"
            id="emailSubject"
            value={emailSubject}
            onChange={handleEmailSubjectChange}
            className={styles.objet1}
          />
          <br />
          <br />
          <textarea
            required
            id="emailText"
            value={emailText}
            onChange={handleEmailTextChange}
            className={styles.text1}
            placeholder="description..."
          />
          <br />
          <br />

          <button onClick={handleSendEmail} className={styles.postuler2}>
            Envoyer
          </button>
          <button onClick={handleClosePopup} className={styles.postuler1}>
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default Etudiant;
