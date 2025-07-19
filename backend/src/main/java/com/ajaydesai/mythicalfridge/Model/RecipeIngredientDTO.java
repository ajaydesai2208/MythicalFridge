package com.ajaydesai.mythicalfridge.Model;

import lombok.Data;

@Data
public class RecipeIngredientDTO {
    private String name;
    private String quantity;
    private double value;
    private String unit;
}