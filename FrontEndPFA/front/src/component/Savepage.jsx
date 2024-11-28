import React, { useState, useEffect } from "react";
import babysittingImage from "../component/img/Babysitting.jpeg";
import assistanceImage from "../component/img/Assistance.jpeg";
import enseignementImage from "../component/img/Enseignement.jpeg";
import WaiterImage from "../component/img/Enseignement.jpeg";
import Service_clientImage from "../component/img/caissier.jpeg";
import savestyle from "./savepage.module.css";
import Navbar from "./navbaretud";
import Save from "../component/img/insaved.png";
import description from "../component/home/description.png";
import localisation from "../component/home/localisation.png";
import email from "../component/home/email.png";
import telephone from "../component/home/fixe.png";

import caissier from "../component/home/job1.jpg";
import service_de_livraison from "../component/home/job11.jpg";

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
            `http://localhost:8090/getsaves/${idUser}`
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
        `http://localhost:8090/deleteSave/${idSave}`,
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
        setmsg("La suppression a reussi.");
        
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
    Assistance: assistanceImage,
    Enseignement: enseignementImage,
    waiter: WaiterImage,
    Service_clientele: Service_clientImage,
    caissier: caissier,
    "service de livraison": service_de_livraison,
    "Service de livraison": service_de_livraison,
    babysitting: babysittingImage,
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
