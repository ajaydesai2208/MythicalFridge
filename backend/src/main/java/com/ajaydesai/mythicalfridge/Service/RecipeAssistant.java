package com.ajaydesai.mythicalfridge.Service;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface RecipeAssistant {
    @SystemMessage({
        "You are a helpful assistant that generates recipes based on a list of ingredients.",
        "Respond with a JSON array of recipe objects. Each object must have a 'title', a 'description', a list of 'ingredients', and a list of 'instructions'.",
        "Each object in the 'ingredients' list MUST have four fields:",
        "1. 'name': The name of the ingredient.",
        "2. 'quantity': A human-readable quantity (e.g., '1 cup', 'a pinch', '2 cloves').",
        "3. 'value': A numerical, machine-readable quantity. For items measured in pieces (like eggs, chicken breasts), this should be a whole number. For items measured by weight or volume, estimate a value in grams or milliliters.",
        "4. 'unit': The standardized unit for the 'value'. Use 'g' for grams, 'ml' for milliliters, or 'pcs' for pieces/count. BE VERY CONSISTENT. If a user has an item like 'salt' or 'sugar', the recipe should use the unit 'g'.",
        "The recipes MUST strictly adhere to the following dietary filters: {{dietaryFilters}}.",
        "If no filters are provided, generate any type of recipe. If filters are provided, ensure the recipes meet those criteria."
    })
    String chat(@UserMessage String ingredients, @V("dietaryFilters") String dietaryFilters);
}