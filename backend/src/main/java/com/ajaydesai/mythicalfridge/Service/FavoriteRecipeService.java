package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.FavoriteRecipe;
import com.ajaydesai.mythicalfridge.Model.Recipe;
import com.ajaydesai.mythicalfridge.Repository.FavoriteRecipeRepository;
import com.ajaydesai.mythicalfridge.Repository.RecipeRepository;
import com.ajaydesai.mythicalfridge.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteRecipeService {

    @Autowired
    private FavoriteRecipeRepository favoriteRecipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Transactional
    public boolean toggleFavorite(String userEmail, Long recipeId) {
        UserEntity user = userRepository.findByEmail(userEmail);
        Optional<Recipe> recipeOpt = recipeRepository.findById(recipeId);

        if (recipeOpt.isEmpty()) {
            throw new IllegalStateException("Recipe not found with id: " + recipeId);
        }
        Recipe recipe = recipeOpt.get();

        Optional<FavoriteRecipe> existingFavoriteOpt = user.getFavoriteRecipes().stream()
                .filter(fav -> fav.getRecipe().getId().equals(recipeId))
                .findFirst();

        if (existingFavoriteOpt.isPresent()) {
            // THE DEFINITIVE FIX: Use the helper method to ensure data consistency before deleting
            FavoriteRecipe favoriteToRemove = existingFavoriteOpt.get();
            user.removeFavorite(favoriteToRemove);
            favoriteRecipeRepository.delete(favoriteToRemove);
            return false; // It is no longer a favorite
        } else {
            FavoriteRecipe newFavorite = new FavoriteRecipe(user, recipe);
            user.addFavorite(newFavorite);
            // We don't need to save the repository here, the transaction will persist the change to the user
            return true; // It is now a favorite
        }
    }

    public List<Recipe> getFavorites(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail);
        return user.getFavoriteRecipes().stream()
                .map(favorite -> {
                    Recipe recipe = favorite.getRecipe();
                    recipe.setFavorited(true); // Explicitly mark as favorited
                    return recipe;
                })
                .collect(Collectors.toList());
    }
}