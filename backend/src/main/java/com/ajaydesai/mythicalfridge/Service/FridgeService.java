package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Model.Fridge;
import com.ajaydesai.mythicalfridge.Repository.FridgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FridgeService {

    @Autowired
    private FridgeRepository fridgeRepository;

    public Fridge saveFridge(Fridge fridge) {
        return fridgeRepository.save(fridge);
    }
}