package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Model.NutritionalInfo;
import com.ajaydesai.mythicalfridge.Model.RecipeIngredient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class USDAService {

    @Value("${usda.api.key:DEMO_KEY}") // Use DEMO_KEY if the property is not set
    private String usdaApiKey;

    public NutritionalInfo getNutritionalInfo(List<RecipeIngredient> ingredients) {
        RestTemplate restTemplate = new RestTemplate();
        NutritionalInfo totalNutrients = new NutritionalInfo();

        // Initialize with default values
        totalNutrients.setCalories("N/A");
        totalNutrients.setProtein("N/A");
        totalNutrients.setFat("N/A");
        totalNutrients.setCarbohydrates("N/A");
        totalNutrients.setSugar("N/A");
        totalNutrients.setVitamins(new HashMap<>());
        totalNutrients.setMinerals(new HashMap<>());
        totalNutrients.setAllergens(new ArrayList<>());

        if (ingredients == null || usdaApiKey.equals("DEMO_KEY")) {
            return totalNutrients; // Return default values if no ingredients or no API key
        }

        double totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbs = 0;
        double totalSugar = 0;

        String apiUrl = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + usdaApiKey + "&query=";

        for (RecipeIngredient ingredient : ingredients) {
            String url = apiUrl + ingredient.getName();
            try {
                String response = restTemplate.getForObject(url, String.class);
                JsonObject jsonObject = JsonParser.parseString(response).getAsJsonObject();
                if (jsonObject.has("foods") && jsonObject.get("foods").getAsJsonArray().size() > 0) {
                    JsonObject food = jsonObject.get("foods").getAsJsonArray().get(0).getAsJsonObject();
                    JsonArray nutrients = food.getAsJsonArray("foodNutrients");

                    for (int i = 0; i < nutrients.size(); i++) {
                        JsonObject nutrient = nutrients.get(i).getAsJsonObject();
                        String nutrientName = nutrient.get("nutrientName").getAsString();
                        double value = nutrient.get("value").getAsDouble();

                        switch (nutrientName) {
                            case "Energy": totalCalories += value; break;
                            case "Protein": totalProtein += value; break;
                            case "Total lipid (fat)": totalFat += value; break;
                            case "Carbohydrate, by difference": totalCarbs += value; break;
                            case "Sugars, total including NLEA": totalSugar += value; break;
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Warning: Could not fetch nutritional data for '" + ingredient.getName() + "'. Skipping.");
            }
        }

        totalNutrients.setCalories(String.format("%.0f kcal", totalCalories));
        totalNutrients.setProtein(String.format("%.1f g", totalProtein));
        totalNutrients.setFat(String.format("%.1f g", totalFat));
        totalNutrients.setCarbohydrates(String.format("%.1f g", totalCarbs));
        totalNutrients.setSugar(String.format("%.1f g", totalSugar));

        return totalNutrients;
    }
}