package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.model.Offre;


public interface OffreIService {
    public ResponseEntity<Offre> addOffre(Offre offre,Long idUser,Long idCategroie);
    public List<Offre> ListOffre();
    public int getNumberOfOffers();
    public Offre ListOffreById(Long idOffre);   
    public Offre updateOffre(Long idOffre, Offre updatedOffre);
    public boolean deleteOffre(Long idOffre);  
    public List<Offre> getOffreByUser(Long idUser);
    public List<Offre> getOffrebyCategorie(Long idcategorie);
    public List<Offre> getOffrebylocation(String lieu);
    public List<Offre> getOffrebyCategorieAndLocation(Long idcategorie,String lieu);
    public List<Offre> getOffresNonEnregistreesParUtilisateur(Long userId);
}
