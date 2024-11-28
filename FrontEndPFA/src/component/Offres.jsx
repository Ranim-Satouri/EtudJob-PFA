import React from "react";
import imagePath from '../component/img/interes.png';
import { Link } from "react-router-dom/cjs/react-router-dom";
import   { useState, useEffect } from "react";
const Offres = ( {Offres , title,iduser}) => {
    const [alreadyInterested, setAlreadyInterested] = useState(false); // État local pour suivre si l'utilisateur a déjà cliqué sur l'offre
    // Fetch data from backend
    const handleClick = (offre,iduser) => {
      
         
            // I
        fetch("http://localhost:8091/Sinteresser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({offre, iduser }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to send data to the backend");
            }
            // Handle success if needed
            console.log("Data sent successfully to the backend");
          })
          .catch((error) => {
            console.error("Error sending data to the backend:", error);
          });
      };
      
    return ( 
        
<div className="offres">
    <h2> {title}</h2>
                {Offres.map(offre => (
                    <div className="offre_preview" key={offre.idOffre} >
                        <h2 id="titre">{offre.titre}</h2>
                        <p id="para">{offre.description}</p>
                        <p id="para">{offre.titre}</p>
                        <p id="para">{offre.lieu}</p>
                        
                                                
                           
                              
                                 
                             <div className="img-container">
            
              <img
                src={imagePath}
                onClick={() => handleClick(offre,iduser)} // Ajoutez l'événement onClick ici
                style={{ width: "30px", height: "30px" }}
              />
            
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 </div>

                                 
                            </div>       
                     
                ))}
            </div>
        
     );

                 }
                  export default Offres;










 
                  
                   
                    
                  
                    