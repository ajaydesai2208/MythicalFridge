package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.CalorieCalcDTO;
import com.ajaydesai.mythicalfridge.Model.CalorieCalcResultDTO;
import com.ajaydesai.mythicalfridge.Model.User;

public interface UserServiceInterface {
    UserEntity findOrCreateUser(User user);
    CalorieCalcResultDTO calculateCalories(CalorieCalcDTO calorieCalcDTO);
    void setUserGoals(String userEmail, double calories, double protein, double carbs, double fat);
    void cookRecipe(String userEmail, Long recipeId);
}