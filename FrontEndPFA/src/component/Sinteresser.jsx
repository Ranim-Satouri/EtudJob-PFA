import React, { useState, useEffect } from "react";

const Sinteresser = ({ iduser }) => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    console.log("Fetching data for iduser:", iduser); // Add this console log

    if (iduser) {
      fetch(`http://localhost:8091/Sinteresser?userId=${iduser}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch offres");
          }
          return response.json();
        })
        .then((data) => {
          // Extracting offres from sinteresser objects
          console.log("Data fetched:", data); // Add this console log
          const offresList = data.map((sinteresser) => sinteresser.offre);
          setOffres(offresList);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching offres:", error);
          setError("Failed to fetch offres");
          setLoading(false);
        });
    }
  }, [iduser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (offres.length === 0) {
    return <div>No offres available for this user</div>;
  }

  return (
    <div>
      <h2>Offres Interessées</h2>
      <div>
        {offres.map((offre, index) => (
          <div key={index}>
            {" "}
            {/* Utilisez l'index comme clé */}
            {/* <h2>{offre.idOffre}</h2> */}
            {/* Assurez-vous que 'idOffre' est unique */}
            <h3>{offre.titre}</h3>
            <p>{offre.description}</p>
            <p>{offre.lieu}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sinteresser;
