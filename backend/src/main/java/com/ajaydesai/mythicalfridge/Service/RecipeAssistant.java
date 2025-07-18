package com.ajaydesai.mythicalfridge.Service;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface RecipeAssistant {
    @SystemMessage({
        "You are a helpful assistant that generates recipes based on a list of ingredients.",
        "Respond with a JSON array of recipe objects. Each recipe object should have a title, a description (under 30 words), a list of recipe ingredients with name and quantity, and detailed instructions.",
        "The recipes MUST strictly adhere to the following dietary filters: {{dietaryFilters}}.",
        "If no filters are provided, generate any type of recipe. If filters are provided, ensure the recipes meet those criteria."
    })
    String chat(@UserMessage String ingredients, @V("dietaryFilters") String dietaryFilters);
}