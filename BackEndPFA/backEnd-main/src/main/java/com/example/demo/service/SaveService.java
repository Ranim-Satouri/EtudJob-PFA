package com.example.demo.service;
import java.util.List;


import com.example.demo.model.Save;


public interface SaveService {
	public Save addSave(Long idUser,Long idOffre);
	public boolean deleteSave( Long idOffre);
	public List<Save> getSaves(Long idUser);
	public List<Save> getUsersBySavedOffer(Long idOffre);
}
