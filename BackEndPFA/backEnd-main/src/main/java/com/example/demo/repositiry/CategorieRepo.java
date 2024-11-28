package com.example.demo.repositiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Categorie;


@Repository
public interface CategorieRepo extends JpaRepository<Categorie,Long> {

}
