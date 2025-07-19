package com.ajaydesai.mythicalfridge.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Instruction> instructions;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<RecipeIngredient> ingredients;

    @Embedded
    private NutritionalInfo nutritionalInfo;

    @Transient
    private boolean isFavorited;

    // THE DEFINITIVE FIX: This annotation forces the JSON response to include the 'isFavorited' field.
    @JsonProperty("isFavorited")
    public boolean isFavorited() {
        return isFavorited;
    }
}