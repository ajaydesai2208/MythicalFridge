package com.ajaydesai.mythicalfridge.Controller;

import com.ajaydesai.mythicalfridge.Model.Ingredient;
import com.ajaydesai.mythicalfridge.Model.Recipe;
import com.ajaydesai.mythicalfridge.Service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/get")
    public ResponseEntity<List<Recipe>> getRecipes(@RequestBody Map<String, Object> payload) {
        ObjectMapper mapper = new ObjectMapper();

        List<Ingredient> ingredients = mapper.convertValue(
            payload.get("ingredients"),
            mapper.getTypeFactory().constructCollectionType(List.class, Ingredient.class)
        );

        List<String> dietaryFilters = mapper.convertValue(
            payload.get("dietaryFilters"),
            mapper.getTypeFactory().constructCollectionType(List.class, String.class)
        );

        List<Recipe> recipes = recipeService.getRecipes(ingredients, dietaryFilters);
        return ResponseEntity.ok(recipes);
    }
}