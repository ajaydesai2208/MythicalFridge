# Mythical Fridge

**Mythical Fridge** is a full-stack web application designed to help you discover creative recipes based on the ingredients you already have. Simply list the items in your fridge, and our AI-powered service will generate a variety of magical recipes for you to try, helping you reduce food waste and explore new culinary ideas.

---

## 🌟 Core Features

-   **AI-Powered Recipe Generation**: Leverages the OpenAI API (GPT-4o) to generate unique and relevant recipes.
-   **Dynamic Virtual Fridge**: Easily add, update, and remove ingredients. The system intelligently tracks quantities and expiration dates.
-   **Advanced Filtering**: Tailor recipe suggestions to your dietary needs, such as vegetarian, vegan, or gluten-free.
-   **Save Your Favorites**: Keep a personal collection of the recipes you love most.
-   **Modern, Responsive UI**: A sleek, user-friendly interface built with Next.js and Tailwind CSS, featuring a beautiful dark mode.

---

## 💻 Technology Stack

This project is a monorepo containing a separate backend and frontend.

### Backend (Java / Spring Boot)

-   **Framework**: Spring Boot 3
-   **Language**: Java 17
-   **Database**: MySQL
-   **AI Integration**: Langchain4j with OpenAI API
-   **Build Tool**: Maven

### Frontend (Next.js / React)

-   **Framework**: Next.js 14
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Shadcn/UI
-   **Authentication**: NextAuth.js

---

## 🚀 Getting Started

To run the complete application locally, you will need to run both the backend and frontend servers simultaneously in separate terminals.

### 1. Prerequisites

-   Java 17+
-   Node.js 18+
-   MySQL Server
-   An OpenAI API Key
-   Google OAuth Credentials (for NextAuth.js)

### 2. Backend Setup

First, set up your environment variables for the backend. You can do this in your system environment or in an `application.properties` file.

```properties
-   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
-   spring.datasource.username=your_mysql_user
-   spring.datasource.password=your_mysql_password
-   OPENAI_API_KEY=your_openai_key
-   USDA_API_KEY=your_usda_key_if_applicable
```

Then, from the backend directory, run:

```bash
# Clean and build the project
./mvnw clean install

# Run the Spring Boot application
./mvnw spring-boot:run
```

The backend server will start on [http://localhost:8080](http://localhost:8080).

### 3. Frontend Setup

In a separate terminal, set up the frontend. Create a .env.local file in the frontend directory:

``` Credentials for Google Sign-In
-   GOOGLE_CLIENT_ID=your_google_client_id
-   GOOGLE_CLIENT_SECRET=your_google_client_secret
```

``` A long, random string for session encryption
-   NEXTAUTH_SECRET=generate_a_random_secret_here
```

``` The base URL for your backend API
-   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Then, from the `frontend` directory:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.