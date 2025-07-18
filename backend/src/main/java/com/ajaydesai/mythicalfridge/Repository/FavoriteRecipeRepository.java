package com.ajaydesai.mythicalfridge.Repository;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.FavoriteRecipe;
import com.ajaydesai.mythicalfridge.Model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Long> {
    List<FavoriteRecipe> findByUser(UserEntity user);
    FavoriteRecipe findByUserAndRecipe(UserEntity user, Recipe recipe);
}