package com.ajaydesai.mythicalfridge.Repository;

import com.ajaydesai.mythicalfridge.Model.Fridge;
import com.ajaydesai.mythicalfridge.Model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    Optional<Ingredient> findByNameAndFridge(String name, Fridge fridge);
}