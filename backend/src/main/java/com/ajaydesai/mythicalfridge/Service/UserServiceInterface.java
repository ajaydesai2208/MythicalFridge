package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.CalorieCalcDTO;
import com.ajaydesai.mythicalfridge.Model.CalorieCalcResultDTO;
import com.ajaydesai.mythicalfridge.Model.SetGoalsRequestDTO;
import com.ajaydesai.mythicalfridge.Model.User;

public interface UserServiceInterface {
    UserEntity findOrCreateUser(User user);
    CalorieCalcResultDTO calculateCalories(CalorieCalcDTO calorieCalcDTO);
    void setUserGoals(SetGoalsRequestDTO request);
    void cookRecipe(String userEmail, Long recipeId);
}