import React, { useState, useEffect } from "react";
import cat from "./cat.module.css";
import mesoffres from "./Mesoffres.module.css";

function Categorie() {
  const [categories, setCategories] = useState([]);
  const [erreurRecuperation, setErreurRecuperation] = useState(null);
  const [suppressionReussie, setSuppressionReussie] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Nouvel état pour contrôler l'affichage du formulaire

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8091/getCategories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setErreurRecuperation("Erreur de récupération des catégories.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        setErreurRecuperation("Erreur de récupération des catégories.");
      }
    };

    fetchCategories();
  }, []);

  const handleSupprimerCategorie = async (idCategorie) => {
    try {
      const response = await fetch(
        `http://localhost:8091/deleteCategorie/${idCategorie}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCategories(
          categories.filter((categorie) => categorie.id !== idCategorie)
        );
        window.location.reload();
      } else {
        console.error("Erreur lors de la suppression de la catégorie.");
        setErreur("Problème de suppression de la catégorie.");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
      setErreur("Problème de suppression de la catégorie.");
    } finally {
      setTimeout(() => {
        setSuppressionReussie(false);
      }, 3000);
    }
  };

  // Fonction pour gérer l'envoi du formulaire d'ajout de catégorie
  const handleAddCategorie = async (e) => {
    e.preventDefault();
    const libelle = e.target.elements.libelle.value;

    try {
      const response = await fetch("http://localhost:8091/addCategorie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ libelle }),
      });
      if (response.ok) {
        const newCategorie = await response.json();
        setCategories([...categories, newCategorie]);
        setShowAddForm(false); // Masquer le formulaire après l'ajout de la catégorie
        window.location.reload();

      } else {
        console.error("Erreur lors de l'ajout de la catégorie.");
        setErreur("Problème d'ajout de la catégorie.");
        setErreur("Problème lors de l'ajout de la catégorie.");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
      setErreur("Problème d'ajout de la catégorie.");
      setErreur("Problème lors de l'ajout de la catégorie.");
    }
  };

  return (
    <div className={mesoffres.bodycat}>
      <div className={mesoffres.homecat}>
        <div className={mesoffres.dropheader}>
          <div className={mesoffres.drop}>
            <h2 className={mesoffres.h2cat}>Les Catégories disponibles</h2>
            {/* Affichage du formulaire lors du clic sur le bouton */}
            <button
              className={mesoffres.addCategoryButton}
              onClick={() => setShowAddForm(true)}
            >
              Ajouter Catégorie
            </button>
          </div>
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          {erreurRecuperation ? (
            <p>{erreurRecuperation}</p>
          ) : (
            <div className={mesoffres.lesoffres}>
              {categories.length === 0 ? (
                <p>Pas de catégories disponibles pour le moment.</p>
              ) : (
                <table className={cat.tabcat}>
                  <thead>
                    <tr>
                      <th className={cat.th}>Libellé</th>
                      <th className={cat.th}> Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((categorie) => (
                      <tr key={categorie.id}>
                        <td className={cat.td}>{categorie.libelle}</td>
                        <td className={cat.td}>
                          <button
                            onClick={() =>
                              handleSupprimerCategorie(categorie.idcategorie)
                            }
                            className={mesoffres.deleteoffre1}
                          >
                            Supprimer la catégorie
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {suppressionReussie && <p>Suppression réussie.</p>}
        </div>
      </div>

      {/* hedi imte3 popup raka7a kima it7ib */}
      {showAddForm && (
       <div className={cat.popup} >
       <form className={cat.addCategoryForm} onSubmit={handleAddCategorie}>
         <p className={cat.pcat}>Ajouter une catégorie</p>
         <input className={cat.inpcat}
           type="text"
           name="libelle"
           placeholder="Libellé de la catégorie"
           required
         /><br/>
         <button type="submit" className={cat.ajoutbut}>Ajouter</button>
         <button onClick={() => setShowAddForm(false)} className={cat.annulbut}>Annuler</button>
       </form>
     </div>
      )}
    </div>
  );
}

export default Categorie;
