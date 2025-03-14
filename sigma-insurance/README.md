# Sigma Insurance CRM Platform

## Overview
Sigma Insurance is a modern CRM platform designed for insurance companies. It provides a comprehensive solution for managing customer relationships, analyzing data, and showcasing service offerings. The platform includes features such as user authentication, a dashboard for customer insights, and a pop-up chatbot for user assistance.

## Features
- **User Authentication**: Sign-up and login functionality for secure access.
- **Dashboard**: Displays customer details and engagement metrics.
- **Data Analysis**: Visualizations and insights related to customer interactions and service performance.
- **Service Offerings**: Showcase of various insurance services with images.
- **Chatbot**: A pop-up chatbot for real-time assistance and support.

## Project Structure
```
sigma-insurance
├── public
│   ├── index.html
│   └── styles
│       └── main.css
├── src
│   ├── components
│   │   ├── Dashboard
│   │   │   ├── CustomerDetails.tsx
│   │   │   ├── Engagements.tsx
│   │   │   └── index.tsx
│   │   ├── DataAnalysis
│   │   │   └── index.tsx
│   │   ├── Login
│   │   │   └── index.tsx
│   │   ├── ServiceOfferings
│   │   │   └── index.tsx
│   │   ├── SignUp
│   │   │   └── index.tsx
│   │   ├── Chatbot
│   │   │   └── index.tsx
│   │   └── common
│   │       └── Header.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
│       └── theme.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd sigma-insurance
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage
- Navigate to the login page to access your account.
- Use the sign-up form to create a new account.
- Explore the dashboard for customer details and engagement metrics.
- Analyze data through the data analysis component.
- View service offerings with images.
- Interact with the chatbot for assistance.

## Technologies Used
- React
- TypeScript
- CSS
- React Router
- Chatbot Library (e.g., Botpress, Dialogflow)

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.