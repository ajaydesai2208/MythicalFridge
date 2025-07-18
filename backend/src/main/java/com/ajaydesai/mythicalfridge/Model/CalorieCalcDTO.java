package com.ajaydesai.mythicalfridge.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalorieCalcDTO {
    private String age;
    private String gender;
    private String height;
    private String weight;
    private String activity;
}