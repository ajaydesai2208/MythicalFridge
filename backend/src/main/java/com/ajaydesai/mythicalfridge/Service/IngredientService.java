package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.Fridge;
import com.ajaydesai.mythicalfridge.Model.Ingredient;
import com.ajaydesai.mythicalfridge.Repository.IngredientRepository;
import com.ajaydesai.mythicalfridge.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Ingredient addOrUpdateIngredient(String userEmail, Ingredient ingredient) {
        UserEntity user = userRepository.findByEmail(userEmail);
        Fridge fridge = user.getFridge();

        // Defensive check: If user somehow has no fridge, create one.
        if (fridge == null) {
            fridge = new Fridge(user);
            user.setFridge(fridge);
            user = userRepository.save(user);
            fridge = user.getFridge();
        }

        Optional<Ingredient> existingIngredient = ingredientRepository.findByNameAndFridge(ingredient.getName(), fridge);

        if (existingIngredient.isPresent()) {
            Ingredient foundIngredient = existingIngredient.get();
            foundIngredient.setQuantity(foundIngredient.getQuantity() + ingredient.getQuantity());
            return ingredientRepository.save(foundIngredient);
        } else {
            ingredient.setFridge(fridge);
            return ingredientRepository.save(ingredient);
        }
    }

    public void deleteIngredient(Long ingredientId) {
        ingredientRepository.deleteById(ingredientId);
    }

    @Transactional // Ensure changes are persisted
    public List<Ingredient> getIngredients(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail);
        Fridge fridge = user.getFridge();

        // THE ROBUST FIX: If the user has no fridge, create one.
        if (fridge == null) {
            fridge = new Fridge(user);
            user.setFridge(fridge);
            userRepository.save(user);
            // The new fridge will have no ingredients, so we return its empty list.
            return user.getFridge().getIngredients();
        }

        // If the fridge exists, return its ingredients.
        return fridge.getIngredients();
    }
}