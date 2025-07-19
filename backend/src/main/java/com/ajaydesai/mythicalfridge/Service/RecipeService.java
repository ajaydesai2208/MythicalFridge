package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Model.Ingredient;
import com.ajaydesai.mythicalfridge.Model.NutritionalInfo;
import com.ajaydesai.mythicalfridge.Model.Recipe;
import com.ajaydesai.mythicalfridge.Repository.RecipeRepository;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
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

    public List<Recipe> getRecipes(List<Ingredient> ingredients, List<String> dietaryFilters) {
        String ingredientList = ingredients.stream()
                .sorted(Comparator.comparing(Ingredient::getExpirationDate, Comparator.nullsLast(Comparator.naturalOrder())))
                .map(Ingredient::getName)
                .collect(Collectors.joining(", "));

        String filters = dietaryFilters == null || dietaryFilters.isEmpty()
            ? "none"
            : String.join(", ", dietaryFilters);

        try {
            String jsonResponse = recipeAssistant.chat(ingredientList, filters);
            Gson gson = new Gson();
            Type recipeListType = new TypeToken<List<Recipe>>(){}.getType();
            List<Recipe> recipes = gson.fromJson(jsonResponse, recipeListType);

            if (recipes != null) {
                for (Recipe recipe : recipes) {
                    NutritionalInfo nutritionalInfo = usdaService.getNutritionalInfo(recipe.getIngredients());
                    recipe.setNutritionalInfo(nutritionalInfo);
                    recipeRepository.save(recipe);
                }
            }
            return recipes;

        } catch (JsonSyntaxException e) {
            System.err.println("Error: Failed to parse JSON response from OpenAI.");
            e.printStackTrace();
            return Collections.emptyList(); // Return an empty list instead of crashing
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