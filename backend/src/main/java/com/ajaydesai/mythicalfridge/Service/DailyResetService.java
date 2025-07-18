package com.ajaydesai.mythicalfridge.Service;

import com.ajaydesai.mythicalfridge.Entity.UserEntity;
import com.ajaydesai.mythicalfridge.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyResetService {

    @Autowired
    private UserRepository userRepository;

    @Scheduled(cron = "0 0 0 * * ?") //This will run at midnight every day
    public void resetDailyConsumption() {
        List<UserEntity> users = userRepository.findAll();
        for (UserEntity user : users) {
            user.setCurrentCalories(0.0);
            user.setCurrentProtein(0.0);
            user.setCurrentCarbs(0.0);
            user.setCurrentFat(0.0);
            userRepository.save(user);
        }
    }
}