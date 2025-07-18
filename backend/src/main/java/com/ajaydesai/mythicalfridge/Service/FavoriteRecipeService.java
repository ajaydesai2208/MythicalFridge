package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.FavoriteRecipe;
import com.ajaydesai.mythicalfridge.Model.Recipe;
import com.ajaydesai.mythicalfridge.Repository.FavoriteRecipeRepository;
import com.ajaydesai.mythicalfridge.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteRecipeService {

    @Autowired
    private FavoriteRecipeRepository favoriteRecipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public FavoriteRecipe toggleFavorite(String userEmail, Recipe recipe) {
        UserEntity user = userRepository.findByEmail(userEmail);
        FavoriteRecipe existingFavorite = favoriteRecipeRepository.findByUserAndRecipe(user, recipe);

        if (existingFavorite != null) {
            favoriteRecipeRepository.delete(existingFavorite);
            return null; // Indicate unfavorited
        } else {
            FavoriteRecipe newFavorite = new FavoriteRecipe(user, recipe);
            return favoriteRecipeRepository.save(newFavorite);
        }
    }

    public List<Recipe> getFavorites(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail);
        return favoriteRecipeRepository.findByUser(user).stream()
                .map(FavoriteRecipe::getRecipe)
                .collect(Collectors.toList());
    }
}