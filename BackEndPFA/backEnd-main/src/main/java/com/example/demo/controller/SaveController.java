package com.example.demo.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Save;
import com.example.demo.service.SaveService;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class SaveController {
	@Autowired
	SaveService saveService;

	@GetMapping("/getsaves/{idUser}")
	public List<Save> getSaves(@PathVariable("idUser") Long idUser){
		return saveService.getSaves(idUser);
	}

	@PostMapping("/addsave/{idUser}/{idOffre}")
    public Save addSave(@PathVariable("idUser") Long idUser ,@PathVariable("idOffre") Long idOffre) {
        return saveService.addSave(idUser,idOffre);
	}

	@PutMapping("/deleteSave/{idSave}")
    public boolean deleteSave( @PathVariable("idSave") Long idOffre) {
        return saveService.deleteSave(idOffre);
    }

	@GetMapping("/getUsersBySavedOffes/{idOffre}")
	public List<Save> getUsersBySavedOffes(@PathVariable("idOffre") Long idOffre){
		return saveService.getUsersBySavedOffer(idOffre);
	}
}
