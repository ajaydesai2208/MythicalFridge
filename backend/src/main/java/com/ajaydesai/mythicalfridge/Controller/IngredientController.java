package com.ajaydesai.mythicalfridge.Controller;

import com.ajaydesai.mythicalfridge.Model.Ingredient;
import com.ajaydesai.mythicalfridge.Service.IngredientService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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

    // ObjectMapper to convert the incoming map to an Ingredient object
    private final ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @PostMapping("/add")
    public ResponseEntity<Ingredient> addIngredient(@RequestBody Map<String, Object> payload) {
        String userEmail = (String) payload.get("userEmail");
        
        // Correctly convert the ingredient data from the payload into an Ingredient object
        Ingredient ingredient = mapper.convertValue(payload.get("ingredient"), Ingredient.class);

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