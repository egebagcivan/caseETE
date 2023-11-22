# ETE

This React application is a basic company and product management system, showcasing CRUD operations, user authentication, and dynamic data display.

## Features

- User Authentication: Login and registration functionality with JWT token-based authentication.
- Dynamic Home Page: Displays statistical reports about companies and products in the system.
- Company Management: Allows adding, editing, and deleting companies. Displays company data in a table format with fields like Company Name, Legal Number, Country, and Website.
- Product Management: Enables adding, editing, and removing products. Shows product data in a table, including Product Name, Category, Amount, Unit, and associated Company.
- UI: Built with Ant Design components for a modern and responsive user interface.
- RESTful API: endpoints for operations.

## Technologies Used

- React: For building the user interface.
- Ant Design: UI framework for React components.
- Node.js and Express: For backend server implementation.
- MongoDB: No-SQL database for storing companies and products data.
- JWT: For user authentication and token management.
- TypeScript: For type-safe coding in React.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- TypeScript

### Installation

Follow these steps to set up the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/egebagcivan/caseETE.git
2. Install NPM packages(in both server and client directories):
   ```bash
   npm install
3. Configure your MongoDB database as per the project requirements. Add your DB credentials to .env files.
4. Run the server:
   ```bash
   cd server
   npm start
5. Run the frontend:
   ```bash
   cd frontend
   npm run dev

## Usage

You can sign up and start using the app.

![image](https://github.com/egebagcivan/caseETE/assets/75989509/42b04c73-71f2-4ef8-879c-8fb205b444c6)
![image](https://github.com/egebagcivan/caseETE/assets/75989509/898e1144-30c5-4a0e-9c4b-c038f900beac)
![image](https://github.com/egebagcivan/caseETE/assets/75989509/d65977fe-b8cd-4dfa-9e6e-185106515e54)
![image](https://github.com/egebagcivan/caseETE/assets/75989509/1c9bc26b-dbbf-4942-89eb-84348596997c)
![image](https://github.com/egebagcivan/caseETE/assets/75989509/c7f3eacb-b5c9-4561-915d-c2caa8441f8a)
![image](https://github.com/egebagcivan/caseETE/assets/75989509/3f78677d-f804-43bd-a4b6-b8fcea32669a)
