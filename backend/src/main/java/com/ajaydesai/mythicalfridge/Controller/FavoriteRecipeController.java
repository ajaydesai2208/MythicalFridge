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

    // This DTO class can be defined here or in its own file
    public static class ToggleFavoriteRequest {
        public String userEmail;
        public Long recipeId;
    }

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleFavorite(@RequestBody ToggleFavoriteRequest request) {
        favoriteRecipeService.toggleFavorite(request.userEmail, request.recipeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<Recipe>> getFavorites(@RequestParam String userEmail) {
        List<Recipe> favorites = favoriteRecipeService.getFavorites(userEmail);
        return ResponseEntity.ok(favorites);
    }
}