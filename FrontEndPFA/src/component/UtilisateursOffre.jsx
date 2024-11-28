import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import mesoffres from "./Mesoffres.module.css";
import babysittingImage from "../component/img/Babysitting.jpeg";
import AssistanceImage from "../component/img/Assistance.jpeg";
import EnseignementImage from "../component/img/Enseignement.jpeg";
import WaiterImage from "../component/img/Enseignement.jpeg";
import CaissierImage from "../component/home/Caissier.jpg";
import service_de_livraisonImage from "../component/home/Service_de_livraison.jpg";
import Service_clientImage from "../component/home/Service_client.jpg";
import NettoyageImage from "../component/home/Nettoyage.png";
import InformatiqueImage from "../component/home/Informatique.png";
import Gestion_des_médias_sociauxImage from "../component/home/Gestion_des_médias_sociaux.png";
import Soins_aux_animauxImage from "../component/home/Soins_aux_animaux.jpg";
import BricolageImage from "../component/home/Bricolage.jpg";
import Erreur from "../component/img/erreur.jpg";
import Aucun from "../component/img/aucun.jpg";
import description from "../component/home/description.png";
import localisation from "../component/home/localisation.png";
import email from "../component/home/email.png";
import telephone from "../component/home/fixe.png";
import personne from "../component/home/profil.png";

function Mesoffres() {
  const [offres, setOffres] = useState([]);
  const [erreurRecuperation, setErreurRecuperation] = useState(null);
  const [offreASupprimer, setOffreASupprimer] = useState(null);
  const [personnesInteressees, setPersonnesInteressees] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [suppressionReussie, setSuppressionReussie] = useState(false);
  const [msg, setmsg] = useState(null);
  const [erreur, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    setIdUser(userId);
    console.log(userId);

    const fetchOffres = async () => {
      try {
        const response = await fetch(
          `http://localhost:8091/offre/getOffresBYUser/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setOffres(data);
        } else {
          setErreurRecuperation("Erreur de récupération des offres.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des offres :", error);
        setErreurRecuperation("Erreur de récupération des offres.");
      }
    };

    fetchOffres();
  }, [location.search]);

  const handleSupprimerOffre = async (idOffre) => {
    try {
      console.log(idOffre);
      const response = await fetch(
        `http://localhost:8091/offre/deleteOffre/${idOffre}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result === true) {
          console.log("tfasa5");
          setSuppressionReussie(true);
          window.location.reload();
          setOffres(offres.filter((offre) => offre.id !== offreASupprimer));
          setmsg("La suppression a réussi.");
          window.location.reload();
        } else {
          console.error("Erreur lors de la suppression de l'offre.");
          setError("probleme de suppression.");
        }
      } else {
        console.error("Erreur lors de la suppression de l'offre.");
        setError("probleme de suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
    } finally {
      setOffreASupprimer(null);
      setTimeout(() => {
        setSuppressionReussie(false);
      }, 3000);
    }
  };

  const categorieImages = {
    Babysitting: babysittingImage,
    Assistance: AssistanceImage,
    Enseignement: EnseignementImage,
    Waiter: WaiterImage,
    Service_clientele: Service_clientImage,
    Caissier: CaissierImage,
    Service_de_livraison: service_de_livraisonImage,
    Bricolage: BricolageImage,
    Gestion_des_médias_sociaux: Gestion_des_médias_sociauxImage,
    Nettoyage: NettoyageImage,
    Soins_aux_animaux: Soins_aux_animauxImage,
    Informatique: InformatiqueImage,
  };

  return (
    <div className={mesoffres.body}>
      <div className={mesoffres.home}>
        <div className={mesoffres.dropheader}>
          <div className={mesoffres.drop}>
            <h2 className={mesoffres.h2}>Vos Offres publiées </h2>
          </div>
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}

          {erreurRecuperation ? (
            <p>{erreurRecuperation}</p>
          ) : (
            <div className={mesoffres.lesoffres}>
              {offres.length === 0 ? (
                <p>Pas d'offres disponibles pour le moment.</p>
              ) : (
                <div className={mesoffres.box}>
                  {offres.map((offre) => (
                    <div key={offre.idOffre} className={mesoffres.offre}>
                      <div className={mesoffres.part}>
                        <h3 className={mesoffres.titreOffre}>{offre.titre}</h3>
                        <div className={mesoffres.iconplusp}>
                          <img
                            src={description}
                            alt=""
                            className={mesoffres.iconi}
                          />
                          <p className={mesoffres.desc}>{offre.description}</p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <img
                            src={localisation}
                            alt=""
                            className={mesoffres.iconi}
                          />
                          <p className={mesoffres.lieu}>
                            <strong>{offre.lieu}</strong>{" "}
                          </p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <img
                            src={telephone}
                            alt=""
                            className={mesoffres.iconi}
                          />
                          <p className={mesoffres.lieu}>
                            <strong>{offre.user.tel}</strong>
                          </p>
                        </div>
                        <div className={mesoffres.iconplusp}>
                          <img src={email} alt="" className={mesoffres.iconi} />
                          <p className={mesoffres.lieu}>
                            <strong>{offre.user.mail}</strong>
                          </p>
                        </div>
                        <div className={mesoffres.bouttons}>
                          <button
                            onClick={() => handleSupprimerOffre(offre.idOffre)}
                            className={mesoffres.deleteoffre}
                          >
                            Supprimer l'offre
                          </button>
                        </div>
                      </div>
                      <div className={mesoffres.imageCat}>
                        {categorieImages[offre.categorie.libelle] ? (
                          <img
                            src={categorieImages[offre.categorie.libelle]}
                            alt={offre.categorie.libelle}
                            className={mesoffres.imageint}
                          />
                        ) : (
                          <p className={mesoffres.noOffre}>
                            Pas d'image disponible
                          </p>
                        )}
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

export default Mesoffres;
