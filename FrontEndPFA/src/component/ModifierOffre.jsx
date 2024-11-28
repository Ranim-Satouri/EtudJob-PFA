import React, { useState, useEffect } from "react";
import AjouterOffre from "./AjouterOffre.module.css";
import Navbaretud from "./navbaretud";
import Navbaremp from "./navbaremp";
import Navbar from "./navbaremp.jsx";
function ModifierOffre() {
  const [offre, setOffre] = useState(null);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [lieu, setLieu] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [userData, setUserData] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [lieux] = useState(["Tunis", "Sousse", "Sfax"]); // Liste des lieux disponibles
  const [msg, setmsg] = useState(null);
  const [erreur, setError] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Récupération de l'utilisateur depuis le localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    if (userData && userData.idUser) {
      setUserData(userData);
    }
    // Récupération de l'offre depuis le localStorage
    const storedOffre = JSON.parse(localStorage.getItem("offreToModify"));
    console.log(storedOffre);
    if (storedOffre) {
      setOffre(storedOffre);
      setTitre(storedOffre.titre);
      setDescription(storedOffre.description);
      setLieu(storedOffre.lieu);
      setCategorieId(storedOffre.categorieId);
    }

    // Récupération de la liste des catégories depuis le localStorage
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      setCategoriesData(storedCategories);
    }
    
  }, []);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
    const idUser = userData.idUser;
    const offreToUpdate = {
      ...offre,
      titre,
      description,
      lieu,
      categorieId,
      lastUpdate: currentDate,
    };
    try {
      // Envoi de la requête pour mettre à jour l'offre
      const response = await fetch(
        `http://localhost:8091/offre/updateOffre/${offre.idOffre}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offreToUpdate),
        }
      );
      if (response.ok) {
        console.log("Offre mise à jour avec succès !");
        localStorage.setItem("offreToModify", JSON.stringify(offreToUpdate));
        window.location.href = "/Mesoffres";
      } else {
        console.error("Erreur lors de la mise à jour de l'offre");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
    }
  };

  if (!offre) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className={AjouterOffre.background}>
      {choisirNavbar(user)}
    <div className={AjouterOffre.aj}> 
      <div className={AjouterOffre.loginf}>
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className={AjouterOffre.login_form}
      >
        <p className={AjouterOffre.p1}>Modifier Offre</p>

        {msg && <div style={{ color: "green" }}>{msg}</div>}
        {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          <div className={AjouterOffre.inputGroupp}>
              <label htmlFor="titre" className={AjouterOffre.labele1}>
                Titre
              </label>
              <input
                className={AjouterOffre.inputinscrit1}
                type="text"
                id="titre"
                name="titre"
                value={titre}
                onChange={handleTitreChange}
                required
              />
          </div>
          <div className={AjouterOffre.drops}>
            <div className={AjouterOffre.Catdrop}>
             <label htmlFor="categorie" className={AjouterOffre.labele2}>
                Catégorie
              </label>
              <select
                value={categorieId}
                onChange={handleChangeCategorie}
                className={AjouterOffre.select}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categoriesData.map((categorieItem) => (
                  <option key={categorieItem.id} value={categorieItem.id}>
                    {categorieItem.libelle}
                  </option>
                ))}
              </select>
              
            </div>
          

          
            <div className={AjouterOffre.Lieudrop}>
              <label htmlFor="lieu" className={AjouterOffre.labele3}>
                Lieu
              </label>
              <select
                value={lieu}
                onChange={handleLieuChange}
                className={AjouterOffre.select}
                required
              >
                <option value="">Sélectionner un lieu</option>
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
            
            <label htmlFor="description" className={AjouterOffre.labele4}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                required
                className={AjouterOffre.inputdesc}
              />
              
            
          </div>
        
        <div className={AjouterOffre.btndiv}>
          <button type="submit" className={AjouterOffre.btn}>
            Modifier Offre
          </button>
        </div>
      </form>
    </div>  
    </div>
    </div> 
  );
}

export default ModifierOffre;
