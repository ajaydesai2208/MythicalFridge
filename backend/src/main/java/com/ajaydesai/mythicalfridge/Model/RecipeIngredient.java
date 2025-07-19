package com.ajaydesai.mythicalfridge.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    // This is the human-readable quantity, e.g., "1 cup"
    private String quantity;

    // --- NEW FIELDS FOR SMART INVENTORY ---
    // This is the numerical value, e.g., 200
    private double value; 
    // This is the standardized unit, e.g., "g", "ml", "pcs"
    private String unit;
    // --- END NEW FIELDS ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    @JsonBackReference
    private Recipe recipe;
}