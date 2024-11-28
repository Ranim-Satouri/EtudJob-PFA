package com.example.demo.repositiry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Offre;
import com.example.demo.model.Save;
import com.example.demo.model.User;

@Repository
public interface SaveRepo extends JpaRepository<Save,Long> {
    public List<Save> findALLByUser(User user);
    public List<Save> findALLByOffre(Offre offre);
    
}
