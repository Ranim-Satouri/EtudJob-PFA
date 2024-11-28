package com.example.demo.service;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

@AllArgsConstructor //génére automatiquement un constructeur
@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class UserServiceImpl implements UserIService {

	@Autowired
	private UserRepo uRepository;
	OffreRepo offreRepo;
	private OffreIService offreIService;
	private SaveRepo saveRepo;
	private SaveService saveService;
	@Override
	public List<User> getUsers(){	
		return uRepository.findAll();
	}

	@Override
	public ResponseEntity<User> addUser(User user) {

		Optional<User> userOptional = getUserBymail(user.getMail());
        if(userOptional.isPresent()) {
            return ResponseEntity.ok().body(null);
		}else{ 
			BcryptGenerator bcryptGenerator = new BcryptGenerator();
			String hashedPassword = bcryptGenerator.passwordEncoder(user.getPwd());
			user.setPwd(hashedPassword);
			user.setSignInDate(Timestamp.valueOf(LocalDateTime.now()));
			System.out.println(hashedPassword);
			uRepository.save(user);
			return ResponseEntity.ok().body(user);
	}
}

	@Override
	public Optional<User> getUserBymail(String mail) {
		return uRepository.findUserByMail(mail);
	}
	@Override
	public User updateUser(Long idUser,User updatedUser)
	{
		
		Optional<User> userOptional = getUserBymail(updatedUser.getMail());
		
        if(userOptional.isPresent() && userOptional.get().getIdUser() != idUser) {
            return null;
		}else{ 
			User user = uRepository.findById(idUser).orElseThrow(()->new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "+idUser));
			updatedUser.setSignInDate(user.getSignInDate());
			System.out.println(user.getSignInDate());
			updatedUser.setIdUser(idUser);
			return uRepository.save(updatedUser);
		}
	}
	@Override
	public User modifierPwd(Long idUser ,String pwd){
		
		User user = uRepository.findById(idUser).orElseThrow(()->new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "+idUser));
		BcryptGenerator bcryptGenerator = new BcryptGenerator();
		String hashedPassword = bcryptGenerator.passwordEncoder(pwd);
		user.setPwd(hashedPassword);
		return uRepository.save(user);
	}
	@Override
	public boolean verifierPwd(Long idUser ,String pwd){
		
		User user = uRepository.findById(idUser).orElseThrow(()->new EntityNotFoundException("Utilisateur non trouvé avec l'ID : "+idUser));
		BcryptGenerator bcryptGenerator = new BcryptGenerator();
		//String hashedPassword = bcryptGenerator.passwordEncoder(pwd);
		System.out.println(pwd);
		System.out.println("mot de passe encode"+user.getPwd());
		if(bcryptGenerator.passwordDecoder(pwd,user.getPwd())){
			return true;
		}
		return false;
		
	}

	// @Override
	// public void deleteUser(Long idUser)
	// {
	// 	uRepository.deleteById(idUser);
	// }

	@Override
	public void deleteUser(Long idUser) {
    // Récupérer l'utilisateur à supprimer
    User user = uRepository.findById(idUser)
                            .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'ID : " + idUser));
	
    // Récupérer toutes les offres associées à cet utilisateur
    List<Offre> offres = offreRepo.findALLByUser(user);
	System.out.println(offres);
    
    // Parcourir la liste des offres et les supprimer une par une
    for (Offre offre : offres) {
        offreIService.deleteOffre(offre.getIdOffre());
    }
	List<Save> saves = saveRepo.findALLByUser(user);

	for (Save save : saves) {
        saveService.deleteSave(save.getIdSave());
    }
    
    // Supprimer l'utilisateur lui-même
    uRepository.deleteById(idUser);
}
@Override
public int getNumberUsers()
{
	List<User> listeUsers = uRepository.findAll();
	return listeUsers.size();
}
@Override

public List<User> getUsersByRole(String role) {
    List<User> allUsers = uRepository.findAll();
    return allUsers.stream()
                   .filter(user -> role.equals(user.getRole()))
                   .collect(Collectors.toList());
}
@Override
public int getNumberOfEtudiants(){
	List<User> etudiantUsers = uRepository.findByRole("student");
	return etudiantUsers.size();
}
@Override
public int getNumberOfEmployeur() {
	List<User> etudiantUsers = uRepository.findByRole("employer");
	return etudiantUsers.size();
}



}