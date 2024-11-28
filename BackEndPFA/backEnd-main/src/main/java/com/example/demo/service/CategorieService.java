package com.example.demo.service;

import java.util.List;
import com.example.demo.model.Categorie;



public interface CategorieService {
    public Categorie addCategorie(Categorie categorie);
    public List<Categorie> getCategories();
    
    public void deleteCategorie(Long idCategorie);
}
