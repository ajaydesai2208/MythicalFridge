package com.ajaydesai.mythicalfridge.Model;

import lombok.Data;
import java.util.List;

@Data
public class RecipeDTO {
    private String title;
    private String description;
    private List<String> instructions;
    private List<RecipeIngredientDTO> ingredients;
}