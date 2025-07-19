package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Model.*;
import com.ajaydesai.mythicalfridge.Repository.RecipeRepository;
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
    private USDAService usdaService;

    @Transactional
    public List<Recipe> getRecipes(List<Ingredient> ingredients, List<String> dietaryFilters) {
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
                        .map(step -> new Instruction(step))
                        .collect(Collectors.toList());
                recipe.setInstructions(instructionEntities);
                
                recipe.setIngredients(dto.getIngredients());

                // Set back-references for both collections
                for (Instruction instruction : recipe.getInstructions()) {
                    instruction.setRecipe(recipe);
                }
                for (RecipeIngredient ingredient : recipe.getIngredients()) {
                    ingredient.setRecipe(recipe);
                }

                NutritionalInfo nutritionalInfo = usdaService.getNutritionalInfo(recipe.getIngredients());
                recipe.setNutritionalInfo(nutritionalInfo);

                finalRecipes.add(recipeRepository.save(recipe));
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