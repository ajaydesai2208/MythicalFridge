package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.*;
import com.ajaydesai.mythicalfridge.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FridgeService fridgeService;

    @Autowired
    private CalorieCalculatorService calorieCalculatorService;

    @Autowired
    private RecipeService recipeService;

    @Override
    @Transactional
    public UserEntity findOrCreateUser(User user) {
        UserEntity userEntity = userRepository.findByEmail(user.getEmail());
        if (userEntity == null) {
            userEntity = new UserEntity();
            userEntity.setEmail(user.getEmail());
            userEntity.setUsername(user.getName());

            Fridge fridge = new Fridge(userEntity);
            userEntity.setFridge(fridge);
            fridgeService.saveFridge(fridge);

            userRepository.save(userEntity);
        }
        return userEntity;
    }

    @Override
    public CalorieCalcResultDTO calculateCalories(CalorieCalcDTO calorieCalcDTO) {
        double bmr = calorieCalculatorService.calculateBMR(
                calorieCalcDTO.getGender(),
                Double.parseDouble(calorieCalcDTO.getWeight()),
                Double.parseDouble(calorieCalcDTO.getHeight()),
                Integer.parseInt(calorieCalcDTO.getAge())
        );
        double maintenanceCalories = calorieCalculatorService.calculateMaintenanceCalories(bmr, calorieCalcDTO.getActivity());

        CalorieCalcResultDTO result = new CalorieCalcResultDTO();
        result.setMaintenanceCalories(maintenanceCalories);
        result.setMildWeightLossCalories(maintenanceCalories - 250);
        result.setWeightLossCalories(maintenanceCalories - 500);
        result.setExtremeWeightLossCalories(maintenanceCalories - 1000);
        result.setMildWeightGainCalories(maintenanceCalories + 250);
        result.setWeightGainCalories(maintenanceCalories + 500);
        result.setExtremeWeightGainCalories(maintenanceCalories + 1000);

        // Calculate macronutrients for maintenance
        result.setBalancedMacronutrientGoals(calculateMacronutrients(maintenanceCalories, 0.3, 0.4, 0.3));
        result.setLowFatMacronutrientGoals(calculateMacronutrients(maintenanceCalories, 0.2, 0.5, 0.3));
        result.setLowCarbsMacronutrientGoals(calculateMacronutrients(maintenanceCalories, 0.4, 0.2, 0.4));
        result.setHighProteinMacronutrientGoals(calculateMacronutrients(maintenanceCalories, 0.5, 0.3, 0.2));

        return result;
    }

    private MacronutrientGoals calculateMacronutrients(double calories, double proteinRatio, double carbRatio, double fatRatio) {
        double protein = (calories * proteinRatio) / 4;
        double carbs = (calories * carbRatio) / 4;
        double fat = (calories * fatRatio) / 9;
        return new MacronutrientGoals(protein, fat, carbs);
    }

    @Override
    @Transactional
    public void setUserGoals(String userEmail, double calories, double protein, double carbs, double fat) {
        UserEntity user = userRepository.findByEmail(userEmail);
        user.setDailyCalorieGoal(calories);
        user.setDailyProteinGoal(protein);
        user.setDailyCarbGoal(carbs);
        user.setDailyFatGoal(fat);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void cookRecipe(String userEmail, Long recipeId) {
        UserEntity user = userRepository.findByEmail(userEmail);
        Recipe recipe = recipeService.getRecipeById(recipeId);
        NutritionalInfo nutritionalInfo = recipe.getNutritionalInfo();

        user.setCurrentCalories(user.getCurrentCalories() + Double.parseDouble(nutritionalInfo.getCalories().split(" ")[0]));
        user.setCurrentProtein(user.getCurrentProtein() + Double.parseDouble(nutritionalInfo.getProtein().split(" ")[0]));
        user.setCurrentCarbs(user.getCurrentCarbs() + Double.parseDouble(nutritionalInfo.getCarbohydrates().split(" ")[0]));
        user.setCurrentFat(user.getCurrentFat() + Double.parseDouble(nutritionalInfo.getFat().split(" ")[0]));

        userRepository.save(user);
    }
}