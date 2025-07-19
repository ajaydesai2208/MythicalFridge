package com.ajaydesai.mythicalfridge.Config;

import com.ajaydesai.mythicalfridge.Service.RecipeAssistant;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.service.AiServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static dev.langchain4j.model.openai.OpenAiChatModelName.GPT_4_O;

@Configuration
public class OpenAIConfig {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    @Bean
    public RecipeAssistant recipeAssistant() {
        return AiServices.builder(RecipeAssistant.class)
                .chatLanguageModel(OpenAiChatModel.builder().apiKey(openAiApiKey).modelName(GPT_4_O).build())
                .chatMemory(MessageWindowChatMemory.withMaxMessages(10))
                .build();
    }
}