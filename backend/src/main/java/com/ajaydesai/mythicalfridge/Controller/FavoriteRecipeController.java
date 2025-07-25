package com.ajaydesai.mythicalfridge.Controller;

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
    public ResponseEntity<Map<String, Boolean>> toggleFavorite(@RequestBody ToggleFavoriteRequest request) {
        // THE FIX: Return the new favorite status to the frontend
        boolean isFavorited = favoriteRecipeService.toggleFavorite(request.userEmail, request.recipeId);
        return ResponseEntity.ok(Map.of("isFavorited", isFavorited));
    }

    @GetMapping("/get")
    public ResponseEntity<List<Recipe>> getFavorites(@RequestParam String userEmail) {
        List<Recipe> favorites = favoriteRecipeService.getFavorites(userEmail);
        return ResponseEntity.ok(favorites);
    }
}