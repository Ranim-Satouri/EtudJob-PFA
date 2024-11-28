import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbaremp from "./navbaremp"; // Import de la navbar utilisateur
import Navbaretud from "./navbaretud"; // Import de la navbar employeur
import mesoffres from "./Mesoffres.module.css";
import email from "../component/home/email.png";
import telephone from "../component/home/fixe.png";
import description from "../component/home/description.png";
import localisation from "../component/home/localisation.png";
import caissier from "../component/home/job1.jpg";
import service_de_livraison from "../component/home/job11.jpg";
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
        const response = await fetch("http://localhost:8090/getusers");
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
        `http://localhost:8090/deleteUser/${idUtilisateur}`,
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
      <div className={mesoffres.home}>
        <div className={mesoffres.dropheader}>
          <div className={mesoffres.drop}>
            <h2 className={mesoffres.h2}>Vos Utilisateurs</h2>
          </div>
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          {erreurRecuperation ? (
            <p>{erreurRecuperation}</p>
          ) : (
            <div className={mesoffres.lesoffres}>
              {utilisateurs.length === 0 ? (
                <p>Pas d'utilisateurs disponibles pour le moment.</p>
              ) : (
                <div className={mesoffres.box}>
                  {utilisateurs.map((utilisateur) => (
                    <div key={utilisateur.idUser} className={mesoffres.offre}>
                      <div className={mesoffres.part}>
                        <div className={mesoffres.iconplusp}>
                          <p className={mesoffres.lieu}>
                            Nom :<strong>{utilisateur.firstName}</strong>
                          </p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <p className={mesoffres.lieu}>
                            Prenom :<strong>{utilisateur.lastName}</strong>
                          </p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <p className={mesoffres.mail}>
                            mail :<strong>{utilisateur.mail}</strong>{" "}
                          </p>
                        </div>
                        <div className={utilisateur.iconplusp}>
                          <p className={mesoffres.lieu}>
                            tel:
                            <strong>{utilisateur.tel}</strong>
                          </p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <p className={mesoffres.desc}>
                            description :
                            <strong>{utilisateur.description}</strong>
                          </p>
                        </div>
                        <div className={utilisateur.iconplusp}>
                          <p className={mesoffres.lieu}>
                            tel:
                            <strong>{utilisateur.tel}</strong>
                          </p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <p className={mesoffres.lieu}>
                            Date de naissance :{" "}
                            <strong>
                              {new Date(
                                utilisateur.dateNaissance
                              ).toLocaleDateString("fr-FR")}
                            </strong>
                          </p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <p className={mesoffres.lieu}>
                            <div className={utilisateur.iconplusp}>
                              <p className={mesoffres.role}>
                                Role: <strong>{utilisateur.role}</strong>
                              </p>
                            </div>
                            {utilisateur.genre === "femme" ? (
                              <img
                                src={femme}
                                style={{ width: "100px", height: "100px" }}
                              />
                            ) : (
                              <img
                                src={homme}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginLeft: "-150px",
                                  marginTop: "-800px",
                                }}
                              />
                            )}
                            {utilisateur.role === "student" && (
                              <>
                                <p>
                                  Niveau d'éducation :{" "}
                                  <strong>{utilisateur.eduLevel}</strong>
                                </p>
                                <p>
                                  Établissement :{" "}
                                  <strong>{utilisateur.etablissement}</strong>
                                </p>
                              </>
                            )}
                          </p>
                        </div>

                        <div className={mesoffres.bouttons}>
                          <button
                            onClick={() =>
                              handleSupprimerUtilisateur(utilisateur.idUser)
                            }
                            className={mesoffres.deleteoffre}
                          >
                            Supprimer l'utilisateur
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
