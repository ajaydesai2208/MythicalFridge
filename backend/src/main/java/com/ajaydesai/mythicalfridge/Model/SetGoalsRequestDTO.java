package com.ajaydesai.mythicalfridge.Model;

import lombok.Data;

@Data
public class SetGoalsRequestDTO {
    private String userEmail;
    private GoalsDTO goals;
}