import React, { useState, useEffect } from "react";
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
import savestyle from "./savepage.module.css";
import Navbar from "./navbaretud";
import Save from "../component/img/insaved.png";
import description from "../component/home/description.png";
import localisation from "../component/home/localisation.png";
import email from "../component/home/email.png";
import telephone from "../component/home/fixe.png";

function SavePage() {
  const [savedOffers, setSavedOffers] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [msg, setmsg] = useState(null);
  const [erreur, setError] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.idUser) {
      setIdUser(userData.idUser);
    } else {
      console.error("ID utilisateur non trouvé dans le localStorage");
    }
  }, []);

  useEffect(() => {
    const fetchSavedOffers = async () => {
      try {
        if (idUser) {
          const response = await fetch(
            `http://localhost:8091/getsaves/${idUser}`
          );
          console.log("lina");
          console.log(response.idSave);
          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des offres sauvegardées"
            );
          }
          const data = await response.json();
          setSavedOffers(data);
          console.log(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Une erreur est survenue lors de la récupération des offres sauvegardées:",
          error
        );
      }
    };

    fetchSavedOffers();
  }, [idUser]);

  const handleClick = async (offreId, userId, idSave) => {
    console.log("Offre ID:", offreId);
    console.log("User ID:", userId);
    console.log("idsave:", idSave);
    try {
      const response = await fetch(
        `http://localhost:8091/deleteSave/${idSave}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      const responseData = await response.json();
      console.log(responseData);
      if (response.bodyUsed === true) {
        console.log("La suppression a réussi");        
        window.location.reload();
      } else {
        console.log("La suppression a échoué");
        setError("La suppression a échoué.");
        return setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur:", error.message);
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
    <div className={savestyle.body}>
      <Navbar />
      <div className={savestyle.home}>
        <div className={savestyle.dropheader}>
          <div className={savestyle.drop}>
            <h2 className={savestyle.h2}>Offres Sauvegardées</h2>
          </div>
          {erreur && <div style={{ color: "red" }}>{erreur}</div>}
          {msg && <div style={{ color: "green" }}>{msg}</div>}
          {loading ? (
            <p>Chargement...</p>
          ) : savedOffers.length > 0 ? (
            <div className={savestyle.box}>
              {savedOffers.map(({ idSave, offre }) => (
                <div key={idSave} className={savestyle.offre}>
                  <div className={savestyle.part}>
                    <img
                      src={Save}
                      alt=""
                      className={savestyle.saveb}
                      onClick={() => handleClick(offre.idOffre, idUser, idSave)}
                    />
                    <h3 className={savestyle.titreOffre}>{offre.titre}</h3>
                    <div className={savestyle.iconplusp}>
                      <img
                        src={description}
                        alt=""
                        className={savestyle.iconi}
                      />
                      <p className={savestyle.desc}>{offre.description}</p>
                    </div>
                    <div className={savestyle.iconplusp}>
                      <img
                        src={localisation}
                        alt=""
                        className={savestyle.iconi}
                      />
                      <p className={savestyle.lieu}>
                        <strong>{offre.lieu}</strong>{" "}
                      </p>
                    </div>
                    <div className={savestyle.iconplusp}>
                      <img src={telephone} alt="" className={savestyle.iconi} />
                      <p className={savestyle.lieu}>
                        <strong>{offre.user.tel}</strong>
                      </p>
                    </div>
                    <div className={savestyle.iconplusp}>
                      <img src={email} alt="" className={savestyle.iconi} />
                      <p className={savestyle.lieu}>
                        <strong>{offre.user.mail}</strong>
                      </p>
                    </div>
                  </div>
                  <div className={savestyle.imageCat}>
                    {categorieImages[offre.categorie.libelle] ? (
                      <img
                        src={categorieImages[offre.categorie.libelle]}
                        alt={offre.categorie.libelle}
                        className={savestyle.imageint}
                      />
                    ) : (
                      <p className={savestyle.noOffre}>
                        Pas d'image disponible
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucune offre sauvegardée</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavePage;
