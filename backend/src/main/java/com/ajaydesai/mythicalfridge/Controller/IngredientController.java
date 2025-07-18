package com.ajaydesai.mythicalfridge.Controller;

import com.ajaydesai.mythicalfridge.Model.Ingredient;
import com.ajaydesai.mythicalfridge.Service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "http://localhost:3000")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/add")
    public ResponseEntity<Ingredient> addIngredient(@RequestBody Map<String, Object> payload) {
        String userEmail = (String) payload.get("userEmail");
        // Assuming ingredient data is nested in the payload
        Map<String, Object> ingredientData = (Map<String, Object>) payload.get("ingredient");
        Ingredient ingredient = new Ingredient(); // Map ingredientData to Ingredient object
        Ingredient savedIngredient = ingredientService.addOrUpdateIngredient(userEmail, ingredient);
        return ResponseEntity.ok(savedIngredient);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteIngredient(@PathVariable Long id) {
        ingredientService.deleteIngredient(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<Ingredient>> getIngredients(@RequestParam String userEmail) {
        List<Ingredient> ingredients = ingredientService.getIngredients(userEmail);
        return ResponseEntity.ok(ingredients);
    }
}