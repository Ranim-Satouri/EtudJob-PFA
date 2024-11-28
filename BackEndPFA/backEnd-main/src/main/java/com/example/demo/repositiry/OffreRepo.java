package com.example.demo.repositiry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Categorie;
//import com.example.demo.model.Categorie;
import com.example.demo.model.Offre;
import com.example.demo.model.User;

@Repository //Cette annotation indique à Spring que cette interface est un repository
public interface OffreRepo extends JpaRepository<Offre, Long> {
    public List<Offre> findALLByUser(User user);
    public List<Offre> findOffreByCategorieAndLieu(Categorie categorie ,String lieu);
    @Query("SELECT o FROM Offre o WHERE o.idOffre NOT IN (SELECT s.offre.idOffre FROM Save s WHERE s.user.idUser = :userId)")
    List<Offre> findOffresNonEnregistreesParUtilisateur(Long userId);
    //public List<Offre> findALLByCategorie(Categorie cat);
    // Cette interface étend JpaRepository, qui fournit des méthodes pour interagir avec la base de données
}
