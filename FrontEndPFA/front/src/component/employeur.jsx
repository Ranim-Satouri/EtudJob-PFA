import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbaremp";
import Save from '../component/img/save.png';
import babysittingImage from '../component/img/Babysitting.jpeg';
import assistanceImage from '../component/img/Assistance.jpeg';
import enseignementImage from '../component/img/Enseignement.jpeg';
import WaiterImage from '../component/img/Enseignement.jpeg';
import caissier from '../component/home/job1.jpg';
import service_de_livraison from '../component/home/job11.jpg';
import Erreur from '../component/img/erreur.jpg';
import Aucun from '../component/img/aucun.jpg';
import Service_clientImage from '../component/img/caissier.jpeg';
import styles from'./etudiant.module.css';
import description from '../component/home/description.png';
import localisation from '../component/home/localisation.png';
import email from '../component/home/email.png';
import telephone from '../component/home/fixe.png';
import personne from '../component/home/profil.png';

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
  const[categorielist]=useState(null);
  


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    console.log(userData.idUser);
    if (userData && userData.idUser) {
      setUser(userData.idUser);
      fetchOffres(userData.idUser);
      fetchCategories();
    } else {
      setMessage("Utilisateur non trouvé");
    }
  }, [lieu]);
  const fetchOffres = async (idUser) => {
    try {

      var url = `http://localhost:8090/offre/getOffresNonEnregistreesParUtilisateur/${idUser}`;
      console.log("wsilt lina");
      
     if (lieu) {
         url = `http://localhost:8090/offre/getOffrebyLocation/${lieu}`;
        console.log(lieu);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des offres");
      }
      const data = await response.json();
      setOffres(data);
      localStorage.setItem('offres', JSON.stringify(data));
      setMessage(""); 
    } catch (error) {
      console.error("Error fetching offres:", error);
      setMessage("Une erreur s'est produite lors de la récupération des offres");
    }
  };
const fetchCategories = async () => {
    try {
      const url = "http://localhost:8090/getCategories";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      const data = await response.json();
      setCategorie(data);
      localStorage.setItem('categories', JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMessage("Une erreur s'est produite lors de la récupération des catégories");
    }
  };
  const handleChangeCategorie = async(event) => {
    const selectedCat = event.target.value;
    try{
       let url = `http://localhost:8090/offre/getOffresbycategorie/${selectedCat}`;
       const response  = await fetch(url);
       if(!response.ok){
          throw new Error("");
       }
       const data = await response.json();
       setOffres(data);
       setMessage(""); // Clear ay error messages sar 9bal 
    }catch (error) {
       console.error("Error fetching offres by categorie:", error);
       setMessage("");
    }
   } 
   

  const handleChangeLieu = (event) => {
    setLieu(event.target.value);
  };
  
   
  

    const categorieImages = {
      Babysitting: babysittingImage,
      Assistance: assistanceImage,
      Enseignement: enseignementImage,
      waiter:WaiterImage,
      Service_clientele:Service_clientImage,
      caissier:caissier,
      "service de livraison":service_de_livraison,
      "Service de livraison":service_de_livraison,
      babysitting: babysittingImage,
    };


  // const [imageSrc, setImageSrc] = useState(Image1); // Initialisez l'état avec l'image initiale

  // const handleClick = (offreId, userId) => {
  //   // Logique de manipulation des données si nécessaire
  //   // Ici, nous allons simplement changer l'image lorsque nous cliquons
  //   setImageSrc(imageSrc); // Mettez à jour l'état avec la nouvelle image
  // };

  return (
    <div className={styles.body} >
      <Navbar />
      <div className={styles.home}>
        <div className={styles.dropheader} > 
       
        <div className={styles.drop}>
        <h2 className={styles.h2}>Les Offres Les plus récentes</h2>
        <div className={styles.drops}>
        <div className={styles.Catdrop} >
              <p className={styles.categorietext}>Categorie</p>
                <select className={styles.select} onChange={handleChangeCategorie}>
                  <option value="0">Tous</option>
                  {categorie && categorie.map((categorieItem) => {return(<option key={categorieItem.idcategorie} value={categorieItem.idcategorie} >{categorieItem.libelle}</option>) }
                  )}
                </select>
              
          </div>    
          <div className={styles.Lieudrop}>
            <p className={styles.lieutext}>Gouvernorat</p>
            <select className={styles.select} value={lieu} onChange={handleChangeLieu} id={styles.lieu}>
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
          {message && <p >{message}</p>}
          {showSuccessMessage && <div className={styles.success-message} style={{width:'200px',height:'30px',marginLeft:'670px'}}>Save avec succès</div>}
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          {succes && <div style={{ color: "green" }}>{succes}</div>}
          {offres ? (
          <div className={styles.box} >
            {message && <p >{message}</p>}
            
            {offres && offres.length === 0 && (
              <div  className={styles.blaketerreur} >
                <div className={styles.taswira}>
                    <p className={styles.nooffre}>Aucune offre disponible !</p>
                </div>
                {/* <img src={Aucun} alt="Aucune offre disponible" style={{ width: "500px", height: "500px", marginLeft:'40px', marginTop:'42px' }} /> */}
                
              </div>
            )}
            {message && (
              <div style={{ textAlign: "center" }}>
                <img src={Erreur} alt="Erreur" style={{ width: "500px", height: "500px", marginLeft:'40px', marginTop:'42px'}} />
                <p>{message}</p>
              </div>
            )}
            {
            offres.map((offre, index) => (
            <div key={index} className={styles.offre}>
              <div className={styles.part} >
                <h3 className={styles.titreOffre}>{offre.titre}</h3>
                <div className={styles.iconplusp}>
                  <img src={description} alt="" className={styles.iconi} />
                  <p className={styles.desc}>{offre.description}</p>
                </div>
                <div className={styles.iconplusp}>
                  <img src={localisation} alt="" className={styles.iconi} />
                  <p className={styles.lieu}><strong>{offre.lieu}</strong> </p>
                </div>
                <div className={styles.iconplusp}>
                  <img src={telephone} alt="" className={styles.iconi} />
                  <p className={styles.lieu}><strong>{offre.user.tel}</strong></p>
                </div>
                <div className={styles.iconplusp}>
                  <img src={email} alt="" className={styles.iconi} />
                  <p className={styles.lieu}><strong>{offre.user.mail}</strong></p>
                </div>
              </div>
              <div className={styles.imageCat}>
                {categorieImages[offre.categorie.libelle] ? (
                  <img src={categorieImages[offre.categorie.libelle]} alt={offre.categorie.libelle} className={styles.imageint} />
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
    </div>
        
  );
      }
  


export default Etudiant;