import React, { useState, useEffect } from "react";
import AjouterOffre from "./AjouterOffre.module.css";
import Navbaretud from "./navbaretud";
import Navbaremp from "./navbaremp";
 
import Navbar from "./navbaremp.jsx";
 
 const   AjouterOffr = () => {
   
  

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [userData, setUserData] = useState(null);
  const [categorie, setcategorie] = useState([]);
  const [lieux] = useState(["Tunis", "Sousse", "Sfax"]); // Liste des lieux disponibles
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Récupération de l'utilisateur depuis le localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.idUser) {
      setUserData(userData);
    }

    // Récupération de la liste des catégories depuis l'API
    fetchCategories();
  }, []);

  // Fonction pour récupérer la liste des catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8091/getCategories");
      if (response.ok) {
        const data = await response.json();
        setcategorie(data); // Mise à jour de la liste des catégories
      } else {
        console.error("Erreur lors de la récupération des catégories");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur :", error);
    }
  };

  const handleTitreChange = (e) => {
    setTitre(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLieuChange = (e) => {
    setLieu(e.target.value);
  };

  const handleChangeCategorie = (event) => {
    setCategorieId(event.target.value);
    // Appeler la fonction avec l'ID de la catégorie choisie
    fonctionAvecCategorieId(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
    const idUser = userData.idUser;
    try {
      const response = await fetch(`http://localhost:8091/offre/addoffre/${idUser}/${categorieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "titre": titre,
          "description": description,
          "lieu": lieu,
          "lastUpdate": currentDate,
          "createdAt": currentDate,
        })
      });

      if (response.ok) {
        console.log('Offre ajoutée avec succès !');
        window.location.href = '/Mesoffres';
        setErrorMessage('');
        setTitre('');
        setDescription('');
        setLieu('');
        setCategorieId('');
      } else {
        console.error("Erreur lors de l'ajout de l'offre");
        setErrorMessage("Erreur lors de l'ajout de l'offre");
        return setTimeout(() => {
          setErrorMessage(""); 
        }, 2000);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
      setErrorMessage("Erreur verifier tous les champs");
      setSuccessMessage('');
    }
  };

  // Fonction à appeler avec l'ID de la catégorie choisie
  const fonctionAvecCategorieId = (categorieId) => {
    console.log("ID de la catégorie choisie :", categorieId);
    // Utilisez l'ID de la catégorie selon vos besoins dans tout le code
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
  

  return (
    <div className={AjouterOffre.background}>
      {choisirNavbar(user)}
      <div className={AjouterOffre.aj}>
            <div className={AjouterOffre.loginf}>
                <form onSubmit={handleSubmit}   action="" method="post" className={AjouterOffre.login_form}>
                    
                    <p className={AjouterOffre.p1}>Ajouter Offre</p>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <div className={AjouterOffre.inputGroupp}>
                <label for="titre" className={AjouterOffre.label}>Titre</label>
 
                  <input
                    className={AjouterOffre.inputinscrit1}
                      type="text"
                      
                      name="titre"
                      value={titre}
                      onChange={handleTitreChange}
                      required
                    />
                </div>

              <div className={AjouterOffre.drops}>
              <div className={AjouterOffre.Catdrop}>
                  <label htmlFor="categorie" className={AjouterOffre.categorietext} for="cat" >Catégorie </label>
                    <select    name="cat" className={AjouterOffre.select} onChange={handleChangeCategorie} required>
                        <option value="0"  aria-placeholder="categorie"> </option>
                        {categorie && categorie.map((categorieItem) => {return(<option key={categorieItem.idcategorie} value={categorieItem.idcategorie} >{categorieItem.libelle}</option>) }
                        )}
                    </select> 
              </div>

          <div className={AjouterOffre.Lieudrop}>
          
              <label for="lieu" className={AjouterOffre.lieutext}>Lieu </label> 
                <select value={lieu}  name="lieu" onChange={handleLieuChange} className={AjouterOffre.select}  >
                <option value=""></option>
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
              <div className={AjouterOffre.inputGroupp}> 
              <label for="description" className={AjouterOffre.labeldesc}>Description </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                  className={AjouterOffre.inputdesc} 
                />  
            </div>
          
        
          
            <button type="submit" className={AjouterOffre.btn}>Ajouter Offre</button>
          
            
                </form>
            </div>
      </div>
    </div>
                );
              }
 
export default AjouterOffr;