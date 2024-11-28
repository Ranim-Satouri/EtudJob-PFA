package com.example.demo.service;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Offre;
import com.example.demo.model.Save;
import com.example.demo.model.User;
import com.example.demo.repositiry.OffreRepo;
import com.example.demo.repositiry.SaveRepo;
import com.example.demo.repositiry.UserRepo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@AllArgsConstructor 
@SuppressWarnings("null")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaveServiceImp implements SaveService {

	@Autowired
	private SaveRepo saveRepo;
	private OffreRepo offreRepo;
	private UserRepo userRepo;
	private EmailService emailService;
	
	@Override
    public boolean deleteSave(Long idSave)
    {
        saveRepo.deleteById(idSave);
		Optional<Save> save = saveRepo.findById(idSave);
		if(save.isPresent()){
			return false;
		}
        return true;
    }

	@Override
	public Save addSave(Long idUser , Long idOffre) {
		System.out.println("dkhalt lenna");
		// Récupère l'offre
		Offre offre = offreRepo.findById(idOffre).orElseThrow(()->new EntityNotFoundException("Offre non trouvée avec l'ID : "+idOffre));
		// Récupère l'utilisateur
		User user = userRepo.findById(idUser).orElseThrow(()->new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "+idUser));

		// Crée un nouvel objet Save
		Save addsave = new Save();
		addsave.setUser(user);
		addsave.setOffre(offre);
		//emailService.sendSimpleMessage(offre.getUser().getMail(),"Someone Intersted", "Bonjour cher/e "+offre.getUser().getFirstName()+" "+offre.getUser().getLastName()+" ,"+user.getFirstName()+" "+user.getLastName()+" est interreser de ton offre "+offre.getTitre());

		// Enregistre l'objet Save
		return saveRepo.save(addsave);
		
	}

	@Override
	public List<Save> getSaves(Long idUser) {
		User user = userRepo.findById(idUser).orElseThrow(()->new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "+idUser));
		return saveRepo.findALLByUser(user);
	}
   
	public List<Save> getUsersBySavedOffer(Long idOffre){
		Offre offre = offreRepo.findById(idOffre).orElseThrow(()->new EntityNotFoundException("Offre non trouvée avec l'ID : "+idOffre));
		return saveRepo.findALLByOffre(offre);

	}
}
