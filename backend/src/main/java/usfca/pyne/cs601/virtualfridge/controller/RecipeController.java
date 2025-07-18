package usfca.pyne.cs601.virtualfridge.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import usfca.pyne.cs601.virtualfridge.Model.Recipe;
import usfca.pyne.cs601.virtualfridge.Service.RecipeService;

import java.util.Collections;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<Recipe>> getGeneratedRecipes(@RequestParam("email") String email) {
        List<Recipe> recipes;
        try {
            recipes = recipeService.generateRecipe(email);
        } catch (Exception ex) {
            // log anything unexpected (empty fridge, OpenAI failure, etc.)
            logger.error("Failed to generate recipes for {}: {}", email, ex.getMessage());
            recipes = Collections.emptyList();
        }
        // if service returns null, treat it as no recipes
        if (recipes == null) {
            recipes = Collections.emptyList();
        }
        return ResponseEntity.ok(recipes);
    }

    @PostMapping("/cook/{recipeId}")
    public ResponseEntity<String> cookRecipe(@RequestParam("email") String email,
                                             @PathVariable Long recipeId) {
        boolean success = recipeService.cookRecipe(email, recipeId);
        if (success) {
            return ResponseEntity.ok("Recipe cooked successfully.");
        } else {
            return ResponseEntity
                    .badRequest()
                    .body("Insufficient ingredients for this recipe.");
        }
    }
}
