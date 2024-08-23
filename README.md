# Travlr Getaways Full Stack Web Application

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Test Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
  - [Frontend Development Comparison](#frontend-development-comparison)
  - [Why Use NoSQL MongoDB?](#why-use-nosql-mongodb)
- [Functionality](#functionality)
  - [JSON vs. JavaScript](#json-vs-javascript)
  - [Refactoring and Reusable UI Components](#refactoring-and-reusable-ui-components)
- [Testing](#testing)
  - [Methods and Challenges](#methods-and-challenges)
- [Reflection](#reflection)
- [License](#license)
- [Contact](#contact)

## Overview

Travlr Getaways is a full stack travel booking application developed using the MEAN stack. The application allows users to search for travel packages, book reservations, and manage itineraries. Administrators can manage customer data, travel packages, and pricing. The application includes a secure login system for both customers and admins.

## Architecture

### Frontend Development Comparison

1. **Express HTML and JavaScript**:
   - **Description**: Initially, static HTML pages with JavaScript were used for the customer-facing website. This approach involved server-side rendering, where HTML pages were generated on the server and sent to the client.
   - **Limitations**: This method required full page reloads for each interaction, which could lead to slower and less dynamic user experiences.

2. **Single-Page Application (SPA) with Angular**:
   - **Description**: The transition to Angular SPA allowed for a more dynamic user experience. Angular’s component-based architecture and two-way data binding enable real-time updates without full page reloads.
   - **Advantages**: The SPA provides a smoother, more interactive user experience. It also supports asynchronous data fetching and updates, leading to faster and more responsive applications.

### Why Use NoSQL MongoDB?

- **Schema Flexibility**: MongoDB's schema-less design allows for flexible data structures, which is ideal for the dynamic nature of travel packages and user information.
- **Scalability**: MongoDB's horizontal scalability accommodates large volumes of data and high traffic efficiently.
- **Performance**: It supports efficient indexing and querying, enhancing data retrieval speeds and overall performance of the web application.

## Functionality

### JSON vs. JavaScript

- **JSON (JavaScript Object Notation)**: JSON is a lightweight format used for data interchange between the server and client. It structures data as key-value pairs, making it easy to parse and generate. JSON is language-agnostic and widely used for transmitting data across different platforms.
  
- **JavaScript**: JavaScript is a programming language used to manipulate web content, handle user interactions, and execute client-side logic.

  **Integration**: JSON serves as the data interchange format between the frontend (Angular) and backend (Express). It ensures that data can be seamlessly sent and received across the client-server boundary, enabling dynamic content updates and interactions.

### Refactoring and Reusable UI Components

- **Refactoring**: Code refactoring was applied to enhance the modularity and efficiency of the application. For example, Angular components were refactored to be reusable, reducing redundancy and improving maintainability.
- **Benefits**: Reusable UI components streamline development, ensure consistency, and facilitate easier updates and testing. For instance, a reusable form component for user authentication was implemented across different parts of the application.

## Testing

### Methods and Challenges

- **Testing Methods**: Various methods were employed to test API endpoints, including unit tests, integration tests, and end-to-end tests. Tools like Postman were used for manual API testing, while automated testing frameworks handled regression testing.
  
- **Endpoints**: API endpoints were tested for correctness in data retrieval and handling of different request types. Security testing involved ensuring that authentication and authorization mechanisms were robust and reliable.

- **Security**: Additional security layers included JWT for user authentication. Testing ensured that tokens were generated, validated, and protected against unauthorized access, securing sensitive data and interactions.

## Reflection

### Professional Development

This course has significantly advanced my professional skills and career readiness:

- **Full Stack Development**: Gained comprehensive experience in integrating frontend and backend technologies, building scalable and dynamic web applications.
- **SPA Development**: Mastered the use of Angular for creating interactive, client-side applications.
- **Database Management**: Developed proficiency in MongoDB, managing and querying NoSQL databases effectively.
- **API Integration and Security**: Enhanced skills in developing and testing RESTful APIs, implementing secure authentication practices.

These skills have prepared me to tackle complex web development projects and improve my marketability as a software developer. The project has provided valuable experience in creating functional, secure, and user-centric applications.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact me at [laynietierney@gmail.com](mailto:laynietierney@gmail.com).

For more details and code, visit the [project repository](https://github.com/lvtierne/cs465-fullstack).
