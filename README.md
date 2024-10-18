# Rule Engine Application

This project is a simple rule engine application that determines user eligibility based on various attributes like age, department, income, and experience. The system utilizes an Abstract Syntax Tree (AST) to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.

## Features

- Create, update, and delete rules.
- Combine multiple rules into a single rule using AST.
- Evaluate user eligibility based on selected rules.
- View the generated AST for individual rules and combined rules.
- Responsive UI built with React and styled using Tailwind CSS and Shadcn UI.

## Technologies Used

- Frontend: React, Tailwind CSS, Shadcn UI
- Backend: Node.js, Express
- Database: MongoDB
- Additional: Mongoose for MongoDB object modeling

## Installation

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v14 or later)
- MongoDB (can be run locally or in a Docker container)

### Clone the Repository

To clone the repository, use the following command:

```bash
git clone https://github.com/itssouray/RuleEngineAstApp
cd RuleEngineAstApp
```

### Install Dependencies

Navigate to both the backend and frontend directories and install the necessary dependencies:

#### Backend

```bash
cd RuleEngineAstBackend
npm install
```

#### Frontend

```bash
cd RuleEngineAstFrontend
npm install
```

## Usage

### Running the Application

1. **Start the backend server:**

   Navigate to the backend directory and run:

   ```bash
   npm run start
   ```

   The backend server will run on [http://localhost:7000](http://localhost:7000).

2. **Start the frontend application:**

   Navigate to the frontend directory and run:

   ```bash
   npm run dev
   ```

### Accessing the Application

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

## API Endpoints

- **POST** /rules/create: Create a new rule.
- **GET** /rules/get-all-rules: Fetch all rules.
- **PUT** /rules/update: Update an existing rule.
- **DELETE** /rules/delete-rule/:ruleId: Delete a specific rule by ID.
- **POST** /rules/evaluate: Evaluate a rule against user data.
- **POST** /rules/combine: Combine two rules.
- **GET** /rules/view-ast/:ruleId: View AST for a single rule.

## Building and Running the Application

You can build the frontend application for production using:

```bash
npm run build
```

This will create a build directory containing the production-ready files.

## Design Choices

- **Architecture**: The application follows a 3-tier architecture (Frontend, API, Database) to ensure separation of concerns.
- **AST Implementation**: The rules are parsed into an Abstract Syntax Tree (AST) for efficient evaluation and combination.
- **Responsive UI**: The frontend is built using Tailwind CSS for styling and Shadcn UI components for a modern look and feel.

