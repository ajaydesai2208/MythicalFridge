package com.ajaydesai.mythicalfridge.Model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Embeddable
public class NutritionalInfo {
    private String calories;
    private String protein;
    private String fat;
    private String carbohydrates;
    private String sugar;

    @ElementCollection
    private Map<String, String> vitamins;

    @ElementCollection
    private Map<String, String> minerals;

    @ElementCollection
    private List<String> allergens;
}