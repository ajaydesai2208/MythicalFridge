package com.ajaydesai.mythicalfridge.Service;

import org.springframework.stereotype.Service;

@Service
public class CalorieCalculatorService {

    public double calculateBMR(String gender, double weight, double height, int age) {
        if (gender.equalsIgnoreCase("male")) {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        }
    }

    public double calculateMaintenanceCalories(double bmr, String activityLevel) {
        double activityFactor;
        switch (activityLevel) {
            case "sedentary":
                activityFactor = 1.2;
                break;
            case "light":
                activityFactor = 1.375;
                break;
            case "moderate":
                activityFactor = 1.55;
                break;
            case "active":
                activityFactor = 1.725;
                break;
            case "very_active":
                activityFactor = 1.9;
                break;
            default:
                activityFactor = 1.2; // Default to sedentary
        }
        return bmr * activityFactor;
    }
}