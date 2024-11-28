package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Categorie;
import com.example.demo.service.CategorieService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class CategorieController {
    @Autowired 
    CategorieService categorieService;


    @PostMapping("/addCategorie")
	    public Categorie addCategorie(@RequestBody Categorie categorie) {
	        return categorieService.addCategorie(categorie);
    }

    @GetMapping("/getCategories")
	public List<Categorie> getCategories() {
		return categorieService.getCategories();
	}

    @DeleteMapping("/deleteCategorie/{idCategorie}")
    public void deleteCategorie( @PathVariable("idCategorie") Long idCategorie) {
        categorieService.deleteCategorie(idCategorie);
        
    }



}
