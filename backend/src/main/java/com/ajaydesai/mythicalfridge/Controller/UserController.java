package com.ajaydesai.mythicalfridge.Controller;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Model.CalorieCalcDTO;
import com.ajaydesai.mythicalfridge.Model.CalorieCalcResultDTO;
import com.ajaydesai.mythicalfridge.Model.SetGoalsRequestDTO;
import com.ajaydesai.mythicalfridge.Model.User;
import com.ajaydesai.mythicalfridge.Service.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserServiceInterface userService;

    // This DTO can be defined here for simplicity
    public static class CookRecipeRequest {
        public String userEmail;
        public Long recipeId;
    }

    @PostMapping("/findOrCreate")
    public ResponseEntity<UserEntity> findOrCreateUser(@RequestBody User user) {
        UserEntity userEntity = userService.findOrCreateUser(user);
        return ResponseEntity.ok(userEntity);
    }

    @PostMapping("/calculateCalories")
    public ResponseEntity<CalorieCalcResultDTO> calculateCalories(@RequestBody CalorieCalcDTO calorieCalcDTO) {
        CalorieCalcResultDTO result = userService.calculateCalories(calorieCalcDTO);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/setGoals")
    public ResponseEntity<?> setGoals(@RequestBody SetGoalsRequestDTO request) {
        userService.setUserGoals(request);
        return ResponseEntity.ok().build();
    }

    // THE NEW ENDPOINT IS ADDED HERE
    @PostMapping("/cookRecipe")
    public ResponseEntity<?> cookRecipe(@RequestBody CookRecipeRequest request) {
        userService.cookRecipe(request.userEmail, request.recipeId);
        return ResponseEntity.ok().build();
    }
}