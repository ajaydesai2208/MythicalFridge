package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Model.NutritionalInfo;
import com.ajaydesai.mythicalfridge.Model.RecipeIngredient;
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

    private final String API_KEY = System.getenv("USDA_API_KEY");
    private final String API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY + "&query=";

    public NutritionalInfo getNutritionalInfo(List<RecipeIngredient> ingredients) {
        RestTemplate restTemplate = new RestTemplate();
        NutritionalInfo totalNutrients = new NutritionalInfo();
        totalNutrients.setVitamins(new HashMap<>());
        totalNutrients.setMinerals(new HashMap<>());
        totalNutrients.setAllergens(new ArrayList<>());

        double totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbs = 0;
        double totalSugar = 0;

        for (RecipeIngredient ingredient : ingredients) {
            String url = API_URL + ingredient.getName();
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
                            case "Energy":
                                totalCalories += value;
                                break;
                            case "Protein":
                                totalProtein += value;
                                break;
                            case "Total lipid (fat)":
                                totalFat += value;
                                break;
                            case "Carbohydrate, by difference":
                                totalCarbs += value;
                                break;
                            case "Sugars, total including NLEA":
                                totalSugar += value;
                                break;
                        }
                    }
                }
            } catch (Exception e) {
                // Handle exceptions for network errors or parsing errors
                System.err.println("Error fetching nutritional data for " + ingredient.getName() + ": " + e.getMessage());
            }
        }

        totalNutrients.setCalories(String.format("%.2f kcal", totalCalories));
        totalNutrients.setProtein(String.format("%.2f g", totalProtein));
        totalNutrients.setFat(String.format("%.2f g", totalFat));
        totalNutrients.setCarbohydrates(String.format("%.2f g", totalCarbs));
        totalNutrients.setSugar(String.format("%.2f g", totalSugar));

        return totalNutrients;
    }
}