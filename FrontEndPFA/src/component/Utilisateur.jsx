import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mesoffres from "./Utilisateurs.module.css";
import femme from "../component/img/femme.png";
import homme from "../component/img/homme.png";

function Utilisateur() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [erreurRecuperation, setErreurRecuperation] = useState(null);
  const [suppressionReussie, setSuppressionReussie] = useState(false);
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch("http://localhost:8091/getusers");
        if (response.ok) {
          const data = await response.json();
          setUtilisateurs(data);
        } else {
          setErreurRecuperation("Erreur de récupération des utilisateurs.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        setErreurRecuperation("Erreur de récupération des utilisateurs.");
      }
    };

    fetchUtilisateurs();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleSupprimerUtilisateur = async (idUtilisateur) => {
    try {
      const response = await fetch(
        `http://localhost:8091/deleteUser/${idUtilisateur}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setSuppressionReussie(true);
        window.location.reload();
        setUtilisateurs(
          utilisateurs.filter((user) => user.id !== idUtilisateur)
        );
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur.");
        setErreur("Problème de suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
      setErreur("Problème de suppression.");
    } finally {
      setTimeout(() => {
        setSuppressionReussie(false);
      }, 3000);
    }
  };

  return (
    <div className={mesoffres.body}>
      <div className={mesoffres.home1}>
        <div className={mesoffres.dropheader}>
          <div className={mesoffres.drop}>
            <h2 className={mesoffres.h2user}>Vos Utilisateurs</h2>
            <br />
          </div>
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          {erreurRecuperation ? (
            <p>{erreurRecuperation}</p>
          ) : (
            <div className={mesoffres.lesoffres}>
              {utilisateurs.length === 0 ? (
                <p>Pas d'utilisateurs disponibles pour le moment.</p>
              ) : (
                <div className={mesoffres.tableContainer}>
                  <table className={mesoffres.table1} border={{}}>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Mail</th>
                        <th>Téléphone</th>
                        <th>Description</th>
                        <th>Date de naissance</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {utilisateurs.map((utilisateur) => (
                        <tr key={utilisateur.idUser}>
                          <td>{utilisateur.firstName}</td>
                          <td>{utilisateur.lastName}</td>
                          <td>{utilisateur.mail}</td>
                          <td>{utilisateur.tel}</td>
                          <td>{utilisateur.description}</td>
                          <td>
                            {new Date(
                              utilisateur.dateNaissance
                            ).toLocaleDateString("fr-FR")}
                          </td>
                          <td>{utilisateur.role}</td>
                          <td>
                            <Link
                              to={`/UtilisateursOffre?id=${utilisateur.idUser}`}
                            >
                              <button type="button" className={mesoffres.buttoff}>Offre</button>
                            </Link>
                            <button
                              onClick={() =>
                                handleSupprimerUtilisateur(utilisateur.idUser)
                              }
                              className={mesoffres.deleteoffre}
                            >
                              Supprimer l'utilisateur
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {suppressionReussie && <p>Suppression réussie.</p>}
        </div>
      </div>
    </div>
  );
}

export default Utilisateur;
