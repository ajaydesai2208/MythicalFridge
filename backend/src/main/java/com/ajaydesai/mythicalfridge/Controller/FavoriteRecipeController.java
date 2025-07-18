package com.ajaydesai.mythicalfridge.Controller;

import com.ajaydesai.mythicalfridge.Model.FavoriteRecipe;
import com.ajaydesai.mythicalfridge.Model.Recipe;
import com.ajaydesai.mythicalfridge.Service.FavoriteRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteRecipeController {

    @Autowired
    private FavoriteRecipeService favoriteRecipeService;

    @PostMapping("/toggle")
    public ResponseEntity<FavoriteRecipe> toggleFavorite(@RequestBody Map<String, Object> payload) {
        String userEmail = (String) payload.get("userEmail");
        // The frontend will send the recipe as a map, which needs to be handled.
        // For now, this is a placeholder for that logic.
        Recipe recipe = new Recipe(); // You'll need to map the payload to a Recipe object
        FavoriteRecipe favoriteRecipe = favoriteRecipeService.toggleFavorite(userEmail, recipe);
        return ResponseEntity.ok(favoriteRecipe);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Recipe>> getFavorites(@RequestParam String userEmail) {
        List<Recipe> favorites = favoriteRecipeService.getFavorites(userEmail);
        return ResponseEntity.ok(favorites);
    }
}