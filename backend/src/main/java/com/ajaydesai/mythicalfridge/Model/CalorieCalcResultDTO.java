package com.ajaydesai.mythicalfridge.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalorieCalcResultDTO {
    private double maintenanceCalories;
    private double mildWeightLossCalories;
    private double weightLossCalories;
    private double extremeWeightLossCalories;
    private double mildWeightGainCalories;
    private double weightGainCalories;
    private double extremeWeightGainCalories;
    private MacronutrientGoals balancedMacronutrientGoals;
    private MacronutrientGoals lowFatMacronutrientGoals;
    private MacronutrientGoals lowCarbsMacronutrientGoals;
    private MacronutrientGoals highProteinMacronutrientGoals;
}