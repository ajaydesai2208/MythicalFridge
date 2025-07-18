package com.ajaydesai.mythicalfridge.Repository;

import com.ajaydesai.mythicalfridge.Model.Fridge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FridgeRepository extends JpaRepository<Fridge, Long> {
}