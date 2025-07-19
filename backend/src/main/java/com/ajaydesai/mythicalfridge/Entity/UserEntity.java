package com.ajaydesai.mythicalfridge.Entity;

import com.ajaydesai.mythicalfridge.Model.FavoriteRecipe;
import com.ajaydesai.mythicalfridge.Model.Fridge;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = {"email"}))
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String firstName;
    private String lastName;

    @Column(nullable = false)
    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Fridge fridge;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FavoriteRecipe> favoriteRecipes = new ArrayList<>();

    private Double dailyCalorieGoal = 0.0;
    private Double dailyProteinGoal = 0.0;
    private Double dailyCarbGoal = 0.0;
    private Double dailyFatGoal = 0.0;

    private Double currentCalories = 0.0;
    private Double currentProtein = 0.0;
    private Double currentCarbs = 0.0;
    private Double currentFat = 0.0;

    // --- HELPER METHODS FOR DATA CONSISTENCY ---
    public void addFavorite(FavoriteRecipe favorite) {
        favoriteRecipes.add(favorite);
        favorite.setUser(this);
    }

    public void removeFavorite(FavoriteRecipe favorite) {
        favoriteRecipes.remove(favorite);
        favorite.setUser(null);
    }
    // --- END HELPER METHODS ---

    public UserEntity() {}
}