package com.example.demo.service;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;
import com.example.demo.model.Categorie;
import com.example.demo.model.Offre;
import com.example.demo.model.Save;
import com.example.demo.model.User;
import com.example.demo.repositiry.CategorieRepo;
import com.example.demo.repositiry.OffreRepo;
import com.example.demo.repositiry.SaveRepo;
import com.example.demo.repositiry.UserRepo;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
//cette classe implemente l'interface OffreIService
//@Slf4j
 //c une bonne pratique qui facilite le suivi des erreurs, le débogage et la compréhension du comportement de  l'application 
@AllArgsConstructor //génére automatiquement un constructeur
@FieldDefaults(level = AccessLevel.PRIVATE) //tous les champs de la classe sont définis comme private
 //k tetlalek hamra ctrl+escpace


 @Service
public class OffreServiceImpl implements OffreIService   {
    @Autowired //taml injection des dependences
    OffreRepo offreRepo;
    UserRepo userRepo;
    CategorieRepo categorieRepo;
    SaveRepo saveRepo;
    //chtekhdm l body mta fonction yali f serviceInterface
   @Override
    public ResponseEntity<Offre> addOffre(Offre offre,Long idUser,Long idCategorie)
    {
 
        User user = userRepo.findById(idUser).orElseThrow(()->new EntityNotFoundException("idUser non trouvée"));
        Categorie categorie = categorieRepo.findById(idCategorie).orElseThrow(()->new EntityNotFoundException("idUser non trouvée"));
        offre.setUser(user);
        offre.setCategorie(categorie);
        offre.setLastUpdate(Timestamp.valueOf(LocalDateTime.now()));
        offre.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        offreRepo.save(offre);  
        return ResponseEntity.ok().body(offre);
    }
    @Override
        public List<Offre> ListOffre()
    {
    return (List<Offre>) offreRepo.findAll();
    }
    @Override
    public Offre ListOffreById(Long idOffre)
    {
        return offreRepo.findById(idOffre).get();
    }

    public List<Offre> getOffresNonEnregistreesParUtilisateur(Long userId) {
        System.out.println("hani lennnnnaaa");
        return offreRepo.findOffresNonEnregistreesParUtilisateur(userId);
    }

	@Override
	public List<Offre> getOffreByUser(Long idUser) {
		User user = userRepo.findById(idUser).orElseThrow(()->new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "+idUser));
		return offreRepo.findALLByUser(user);
	}
     
   @Override
    public Offre updateOffre(Long idOffre, Offre updatedOffre) {
        updatedOffre.setIdOffre(idOffre);
        updatedOffre.setLastUpdate(Timestamp.valueOf(LocalDateTime.now()));
        // Met à jour la date de dernière modification
        // Récupère l'utilisateur associé à l'offre
        Offre offre = offreRepo.findById(idOffre)
        .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "));
        //User user = userRepo.findById(idUser)
        //.orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'ID : " + idUser));
        System.out.println(offre);
        updatedOffre.setUser(offre.getUser());
        updatedOffre.setCreatedAt(offre.getCreatedAt());
        //updatedOffre.setUser(user);
        return offreRepo.save(updatedOffre);
    }

    @Override
    public boolean deleteOffre(Long idOffre)
    {
        Offre offre = offreRepo.findById(idOffre)
        .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "));
        List<Save> save=saveRepo.findALLByOffre(offre);
        // Supprimer chaque save
        for (Save s : save) {
            saveRepo.delete(s);
        }
        offreRepo.deleteById(idOffre);
        Optional<Offre> offre2 = offreRepo.findById(idOffre);
        if(offre2.isPresent()){
            return false;
        }
        return true;
    }
    // @Override
    // public boolean deleteOffre(Long idOffre) {
    // Optional<Offre> offreOptional = offreRepo.findById(idOffre);
    // if (offreOptional.isPresent()) {
    //     Offre offre = offreOptional.get();
    //     offre.getSaves().clear(); // Supprimer toutes les saves associées
    //     offreRepo.delete(offre); // Supprimer l'offre
    //     return true;
    // } else {
    //     return false; // L'offre n'existe pas
    // }
    @Override
    public List<Offre> getOffrebyCategorie(Long idcategorie)
    { 
        @SuppressWarnings("unused")
        Categorie categorie = categorieRepo.findById(idcategorie)
                                    .orElseThrow(() -> new EntityNotFoundException("Categorie non trouvée avec l'ID : " + idcategorie));
        // Get offres for the given category
        List<Offre> offres = offreRepo.findAll();
        
        // Filter offres b idcategorie
        List<Offre> offresByCategory = offres.stream()
                                            .filter(offre -> offre.getCategorie() != null && offre.getCategorie().getIdcategorie().equals(idcategorie))
                                            .collect(Collectors.toList());

        return offresByCategory;
}   //filtrage en utilisant liste java 
    @Override
    public List<Offre>getOffrebylocation(String lieu)
    {
    List<Offre> allOffres= offreRepo.findAll();
    List<Offre> Offrebylocation = allOffres.stream().filter(offre -> lieu.equals(offre.getLieu())).collect(Collectors.toList());
    return Offrebylocation;                                    
    }

    public List<Offre> getOffrebyCategorieAndLocation(@PathVariable("idcategorie") Long idcategorie,@PathVariable("lieu") String lieu){
        Categorie categorie = categorieRepo.findById(idcategorie)
                                    .orElseThrow(() -> new EntityNotFoundException("Categorie non trouvée avec l'ID : " + idcategorie));
        return offreRepo.findOffreByCategorieAndLieu(categorie,lieu);
    }
    @Override
    public int getNumberOfOffers() {
        List<Offre> offreList = offreRepo.findAll();
        return offreList.size();
    }
    
    }
