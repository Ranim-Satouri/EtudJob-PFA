package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Categorie;
import com.example.demo.model.Offre;
import com.example.demo.repositiry.CategorieRepo;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor //génére automatiquement un constructeur
@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class CategorieServiceImp implements CategorieService {

    @Autowired 
    CategorieRepo categorieRepo;
    OffreIService offreService; 
    
    public Categorie addCategorie(Categorie categorie){
        return categorieRepo.save(categorie);
    }
    public List<Categorie> getCategories(){
        return categorieRepo.findAll();
    }

    public void deleteCategorie(Long idCategorie){
        List<Offre> offres = offreService.getOffrebyCategorie(idCategorie);
        for (Offre offre : offres) {
            offreService.deleteOffre(offre.getIdOffre());
        }
        categorieRepo.deleteById(idCategorie);
    }

}
