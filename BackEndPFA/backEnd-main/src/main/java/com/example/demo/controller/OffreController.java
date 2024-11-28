package com.example.demo.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Offre;
import com.example.demo.service.OffreIService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RequestParam;


@RestController // hethy bsh tdol eli l class mteena controller
@AllArgsConstructor //tebaa l constructeur 
@FieldDefaults(level = AccessLevel.PRIVATE) //tous les champs de la classe sont définis comme private
@RequestMapping("/offre")


public class OffreController {
	@Autowired
	OffreIService offreIService; 

	
    @PostMapping("/addoffre/{idUser}/{idCategorie}")
	    public ResponseEntity<Offre> addOffre(@RequestBody Offre offre , @PathVariable("idUser") Long idUser, @PathVariable("idCategorie") Long idCategorie) {
	        return offreIService.addOffre(offre,idUser,idCategorie);
    }
    
    @GetMapping("/GetListOffre")

    public List<Offre> getListOffres() {
        List <Offre> offreList = offreIService.ListOffre();
        return offreList;
    }
    @GetMapping("/GetListOffreById/{id}")
    public Offre ListOffreById(@PathVariable("id") Long idOffre) {

        return offreIService.ListOffreById(idOffre);
    }
    @PutMapping("/updateOffre/{idOffre}")
    public Offre updateOffre(@PathVariable Long idOffre, @RequestBody Offre updatedOffre) {
        return offreIService.updateOffre(idOffre, updatedOffre);
    }

    
	@GetMapping("/getOffresBYUser/{idUser}")
	public List<Offre> getOffreByUser(@PathVariable("idUser") Long idUser){
		return offreIService.getOffreByUser(idUser);
	}

    @DeleteMapping("/deleteOffre/{idOffre}")
    public boolean deleteOffre( @PathVariable("idOffre") Long idOffre) {
        return offreIService.deleteOffre(idOffre);
    }


    @GetMapping("/getOffresbycategorie/{idcategorie}")
    public List<Offre> getOffrebyCategorie(@PathVariable("idcategorie") Long idcategorie) {
        return offreIService.getOffrebyCategorie(idcategorie);
    }
    @GetMapping("/getOffrebyLocation/{lieu}")
    public List<Offre> getOffrebylocation(@PathVariable("lieu") String lieu)
    {
        return offreIService.getOffrebylocation(lieu);
    }

    @GetMapping("/getOffrebyCategorieAndLocation/{idcategorie}/{lieu}")
    public List<Offre> getOffrebyCategorieAndLocation(@PathVariable("idcategorie") Long idcategorie,@PathVariable("lieu") String lieu)
    {
        return offreIService.getOffrebyCategorieAndLocation(idcategorie,lieu);
    }

    @GetMapping("/getOffresNonEnregistreesParUtilisateur/{idUser}")
    public List<Offre> getOffresNonEnregistreesParUtilisateur( @PathVariable("idUser")  Long idUser){
        return offreIService.getOffresNonEnregistreesParUtilisateur(idUser);
    }
    @GetMapping("/Offresnumber")
    public int getNumberOfOffers()
    {
        return offreIService.getNumberOfOffers();
    }
}
