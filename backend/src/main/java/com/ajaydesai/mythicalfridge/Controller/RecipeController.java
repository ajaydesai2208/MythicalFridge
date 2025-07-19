package com.ajaydesai.mythicalfridge.Controller;

import com.ajaydesai.mythicalfridge.Model.Ingredient;
import com.ajaydesai.mythicalfridge.Model.Recipe;
import com.ajaydesai.mythicalfridge.Service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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

    private final ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @PostMapping("/get")
    public ResponseEntity<List<Recipe>> getRecipes(@RequestBody Map<String, Object> payload) {
        // THE FIX: Extract the userEmail from the payload
        String userEmail = (String) payload.get("userEmail");

        List<Ingredient> ingredients = mapper.convertValue(
            payload.get("ingredients"),
            mapper.getTypeFactory().constructCollectionType(List.class, Ingredient.class)
        );

        List<String> dietaryFilters = mapper.convertValue(
            payload.get("dietaryFilters"),
            mapper.getTypeFactory().constructCollectionType(List.class, String.class)
        );

        // Pass the userEmail to the service
        List<Recipe> recipes = recipeService.getRecipes(userEmail, ingredients, dietaryFilters);
        return ResponseEntity.ok(recipes);
    }
}