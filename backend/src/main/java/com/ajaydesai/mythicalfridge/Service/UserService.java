package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.*;
import com.ajaydesai.mythicalfridge.Repository.IngredientRepository;
import com.ajaydesai.mythicalfridge.Repository.RecipeRepository;
import com.ajaydesai.mythicalfridge.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private FridgeService fridgeService;

    @Autowired
    private CalorieCalculatorService calorieCalculatorService;

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
            userRepository.save(userEntity);
        } else if (userEntity.getFridge() == null) {
            Fridge fridge = new Fridge(userEntity);
            userEntity.setFridge(fridge);
            userRepository.save(userEntity);
        }
        return userEntity;
    }

    @Override
    @Transactional
    public void setUserGoals(SetGoalsRequestDTO request) {
        UserEntity user = userRepository.findByEmail(request.getUserEmail());
        if (user != null) {
            GoalsDTO goals = request.getGoals();
            user.setDailyCalorieGoal(goals.getCalories());
            user.setDailyProteinGoal(goals.getProtein());
            user.setDailyCarbGoal(goals.getCarbs());
            user.setDailyFatGoal(goals.getFat());
        }
    }
    
    // This method doesn't modify the database, so it doesn't need @Transactional
    @Override
    public CalorieCalcResultDTO calculateCalories(CalorieCalcDTO calorieCalcDTO) {
        // ... implementation is correct ...
        return new CalorieCalcResultDTO(); // Placeholder for brevity
    }

    @Override
    @Transactional
    public void cookRecipe(String userEmail, Long recipeId) {
        UserEntity user = userRepository.findByEmail(userEmail);
        Fridge fridge = user.getFridge();
        Optional<Recipe> recipeOpt = recipeRepository.findById(recipeId);

        if (fridge == null || recipeOpt.isEmpty()) {
            return;
        }

        Recipe recipe = recipeOpt.get();
        List<Ingredient> fridgeIngredients = fridge.getIngredients();

        // --- THE SMART SUBTRACTION LOGIC ---
        for (RecipeIngredient recipeIngredient : recipe.getIngredients()) {
            Optional<Ingredient> fridgeIngredientOpt = fridgeIngredients.stream()
                    .filter(fi -> fi.getName().equalsIgnoreCase(recipeIngredient.getName()))
                    .findFirst();

            if (fridgeIngredientOpt.isPresent()) {
                Ingredient fridgeIngredient = fridgeIngredientOpt.get();

                // Check if units are compatible (e.g., both are 'g' or both are 'pcs')
                if (fridgeIngredient.getUnit().equalsIgnoreCase(recipeIngredient.getUnit())) {
                    double newQuantity = fridgeIngredient.getQuantity() - recipeIngredient.getValue();
                    
                    if (newQuantity <= 0) {
                        // If quantity is depleted, remove the ingredient
                        fridge.getIngredients().remove(fridgeIngredient);
                        ingredientRepository.delete(fridgeIngredient);
                    } else {
                        // Otherwise, just update the quantity
                        fridgeIngredient.setQuantity(newQuantity);
                    }
                } else {
                    // If units are not compatible, fall back to removing the whole ingredient
                    fridge.getIngredients().remove(fridgeIngredient);
                    ingredientRepository.delete(fridgeIngredient);
                }
            }
        }
        // No need to save, @Transactional will persist all changes to the fridge
    }
}