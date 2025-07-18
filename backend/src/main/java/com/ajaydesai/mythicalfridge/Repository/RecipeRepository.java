package com.ajaydesai.mythicalfridge.Repository;

import com.ajaydesai.mythicalfridge.Model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}