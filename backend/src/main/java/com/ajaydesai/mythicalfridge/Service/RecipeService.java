package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.*;
import com.ajaydesai.mythicalfridge.Repository.RecipeRepository;
import com.ajaydesai.mythicalfridge.Repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    @Autowired
    private RecipeAssistant recipeAssistant;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private USDAService usdaService;

    @Transactional
    public List<Recipe> getRecipes(String userEmail, List<Ingredient> ingredients, List<String> dietaryFilters) {
        UserEntity user = userRepository.findByEmail(userEmail);
        List<Long> favoriteRecipeIds = user.getFavoriteRecipes().stream()
                .map(fav -> fav.getRecipe().getId())
                .collect(Collectors.toList());

        String ingredientList = ingredients.stream()
                .sorted(Comparator.comparing(Ingredient::getExpirationDate, Comparator.nullsLast(Comparator.naturalOrder())))
                .map(Ingredient::getName)
                .collect(Collectors.joining(", "));

        String filters = dietaryFilters == null || dietaryFilters.isEmpty()
            ? "none"
            : String.join(", ", dietaryFilters);

        try {
            String rawResponse = recipeAssistant.chat(ingredientList, filters);
            String cleanedJson = rawResponse.trim().replace("```json", "").replace("```", "");

            Gson gson = new Gson();
            Type recipeDtoListType = new TypeToken<List<RecipeDTO>>(){}.getType();
            List<RecipeDTO> recipeDtos = gson.fromJson(cleanedJson, recipeDtoListType);

            if (recipeDtos == null) {
                return Collections.emptyList();
            }
            
            List<Recipe> finalRecipes = new ArrayList<>();
            for (RecipeDTO dto : recipeDtos) {
                Recipe recipe = new Recipe();
                recipe.setTitle(dto.getTitle());
                recipe.setDescription(dto.getDescription());

                List<Instruction> instructionEntities = dto.getInstructions().stream()
                        .map(Instruction::new)
                        .collect(Collectors.toList());
                recipe.setInstructions(instructionEntities);
                
                // --- THE FIX IS HERE: Correctly map all fields from the DTO ---
                List<RecipeIngredient> ingredientEntities = new ArrayList<>();
                for (RecipeIngredientDTO ingredientDto : dto.getIngredients()) {
                    RecipeIngredient ingredient = new RecipeIngredient();
                    ingredient.setName(ingredientDto.getName());
                    ingredient.setQuantity(ingredientDto.getQuantity());
                    ingredient.setValue(ingredientDto.getValue());
                    ingredient.setUnit(ingredientDto.getUnit());
                    ingredientEntities.add(ingredient);
                }
                recipe.setIngredients(ingredientEntities);
                // --- END FIX ---

                for (Instruction instruction : recipe.getInstructions()) {
                    instruction.setRecipe(recipe);
                }
                for (RecipeIngredient ingredient : recipe.getIngredients()) {
                    ingredient.setRecipe(recipe);
                }

                NutritionalInfo nutritionalInfo = usdaService.getNutritionalInfo(recipe.getIngredients());
                recipe.setNutritionalInfo(nutritionalInfo);

                Recipe savedRecipe = recipeRepository.save(recipe);

                if (favoriteRecipeIds.contains(savedRecipe.getId())) {
                    savedRecipe.setFavorited(true);
                }
                finalRecipes.add(savedRecipe);
            }
            return finalRecipes;

        } catch (Exception e) {
            System.err.println("An unexpected error occurred in getRecipes.");
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }
}